//routes related to the user's dashboard and resources accessed from the dashboard.

const router = require('express').Router();
const sequelize = require('../config/connection');
const {Character, User, CharacterPerk} = require('../models/');
const {perkLookup, getAvailablePerks, calculateDerivedStats} = require('../utilities/data-manipulation');
const PDFDocument = require('pdfkit');

//get and render the /dashboard
router.get('/', (req, res) => {
    //find all of the user's characters for display on the dashboard.
    Character.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'name',
            'level',
            'description'
        ]
    })
        .then(dbCharacterData => {
            const characters = dbCharacterData.map(character => character.get({plain: true}));
            res.render('dashboard', {characters, loggedIn: true, username: req.session.username});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//display a single character on character-view.handlebars
router.get('/character/:id', (req, res) => {
    Character.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'level',
            'description',
            'strength',
            'perception',
            'endurance',
            'charisma',
            'intelligence',
            'agility',
            'luck'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: CharacterPerk,
                as: 'character_perks'
            }
        ],
        order:[
            [
                CharacterPerk, 'level_taken'
            ]
        ]
    })
        .then(dbCharacterData => {
            if (!dbCharacterData) {
                res.status(404).json({message: 'No character found with this id'});
                return;
            }
            let character = dbCharacterData.get({plain: true});

            //calls the function to calculate the character's derived stats, (health, action points, carry weight, and the resistances)
            character = calculateDerivedStats(character);
            
            //calls the function to generate the available perks that this character qualifies for based on their SPECIAL stats and existing perks.
            getAvailablePerks(character).then(perks_list => {
                
                //append the list of available perks to the character object so it can be more easily manipulated and placed on the front end.
                character.available_perks = perks_list;

                //calls the function that looks up the perks the character has (obtained from the through table), from the full perk table so we can get the full data
                //about the perk.
                perkLookup(character.character_perks).then(perkArray => {
                    
                    res.render('character-view', {character, loggedIn: req.session.loggedIn});
                });

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route for rendering the new character creation form.
router.get('/new', (req, res) => {
    res.render('new-character', {loggedIn: req.session.loggedIn});
});

//edit route for rendering the character edit form
router.get('/edit/:id', (req, res) => {
    Character.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'level',
            'description',
            'strength',
            'perception',
            'endurance',
            'charisma',
            'intelligence',
            'agility',
            'luck'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: CharacterPerk,
                as: 'character_perks'
            }
        ],
        order:[
            [
                CharacterPerk, 'level_taken'
            ]
        ]
    })
        .then(dbCharacterData => {
            if (!dbCharacterData) {
                res.status(404).json({message: 'No character found with this id'});
                return;
            }

            let character = dbCharacterData.get({plain: true});
            //calculate the derived stats
            character = calculateDerivedStats(character);

            //lookup the character perks that the character already owns and get the full perk info from the perk table.
            perkLookup(character.character_perks).then(perkArray => {
                
                //generate the list of available perks.
                getAvailablePerks(character).then(availablePerks => {
                    character.available_perks = availablePerks;
                    res.render('character-edit', {character, loggedIn: req.session.loggedIn});

                })
                
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET a character PDF /api/dashboard/character/pdf/:id
router.get('/character/pdf/:id', (req, res) => {
    Character.findOne({
        where: {
            id: req.params.id
        },
        attributes: {exclude: ['user_id']},
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: CharacterPerk,
                as: 'character_perks'
            }
        ]
    })
        .then(dbCharacterData => {
            if(!dbCharacterData) {
                res.status(404).json({message: 'No character found with this id'});
                return;
            }
            let character = dbCharacterData.get({plain: true});
            character = calculateDerivedStats(character);

            perkLookup(character.character_perks).then(perkArray => {

                const doc = new PDFDocument;

                //send the PDF as an HTML response
                doc.pipe(res);

                //content and formatting for the PDF document
                doc.image('public/images/logo.png', 150, 10, {width: 300, height: 100});

                doc.fontSize(30);
                doc.text("Character Manager", 50, 125, {
                    align: 'center'
                });

                doc.fontSize(12);
                doc.text(`${character.name}`, 50, 160, {
                    align: 'center'
                });
                doc.text(`Level - ${character.level}`, 50, 175, {
                    align: 'center'
                });
                doc.text(`${character.description}`, 50, 190, {
                    align: 'center'
                });
                doc.moveDown();

                const stats = `
                Health: ${character.health}
                Action Points: ${character.actionPoints}
                Carry Weight: ${character.carryWeight}
                Damage Resistance: ${character.damageResist}%
                Energy Resistance: ${character.energyResist}%
                Poison Resistance: ${character.poisonResist}%
                Radiation Resistance: ${character.radiationResist}%

                Strength: ${character.strength}
                Perception: ${character.perception}
                Endurance: ${character.endurance}
                Charisma: ${character.charisma}
                Intelligence: ${character.intelligence}
                Agility: ${character.agility}
                Luck: ${character.luck}
                `;

                doc.text(stats, {
                    columns: 2,
                    columnGap: 15,
                    height: 120,
                    width: 400,
                    align: 'center'
                });

                doc.moveDown(2);
                
                for (let i=0; i<character.character_perks.length; i++){

                    doc.text (`Level ${character.character_perks[i].level_taken} Perk`);
                    doc.text (`${character.character_perks[i].name}, Rank: ${character.character_perks[i].perk_rank}`);
                    doc.text (`${character.character_perks[i].effect}`);
                    doc.moveDown();
                }

                //finalize the PDF
                doc.end();

            });  
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;