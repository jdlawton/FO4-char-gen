const router = require('express').Router();
const sequelize = require('../config/connection');
const {Character, User, Perk, Dlc, CharacterPerk} = require('../models/');
const perkLookup = require('../utilities/data-manipulation');

router.get('/', (req, res) => {
    //res.render('dashboard');
    Character.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'name'
        ]
    })
        .then(dbCharacterData => {
            const characters = dbCharacterData.map(character => character.get({plain: true}));
            res.render('dashboard', {characters, loggedIn: true});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/character/:id', (req, res) => {
    Character.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
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
        ]
    })
        .then(dbCharacterData => {
            if (!dbCharacterData) {
                res.status(404).json({message: 'No character found with this id'});
                return;
            }

            const character = dbCharacterData.get({plain: true});
            //console.log(character);
            //console.log(character.id);
            //console.log(character.character_perks[0].perk_id);

            //call perkLookup and send the character_perks[] array. This will convert the perk_ids into
            //the perk name and perk effect and send them back. Once back we can paste them into
            //the character_perks array for display on the character page.

            //console.log(character.character_perks);

            perkLookup(character.character_perks).then(perkArray => {
                //console.log("Logging perkArray in home function");
                //console.log(perkArray);
                //console.log("Logging original character_perks arrray");
                //console.log(character.character_perks);
                res.render('character-view', {character});
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;