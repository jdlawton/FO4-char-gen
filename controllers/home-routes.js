const router = require('express').Router();
const sequelize = require('../config/connection');
const {Character, User, Perk, Dlc, CharacterPerk} = require('../models/');

router.get('/', (req, res) => {
    //console.log(req.session);
    Character.findAll({
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
            /*{
                model: CharacterPerk,
                attributes: [
                    'id',
                    'perk_id',
                    'level_taken'
                ]
            }*/
        ]
    })
        .then(dbCharacterData => {
            //pass a single character object into the homepage template
            res.render('homepage', dbCharacterData[0].get({plain: true}));
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
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
            console.log(character);
            console.log(character.id);
            console.log(character.character_perks[0].perk_id);
            /*return Perk.findOne({
                where: {
                    id: character.character_perks[0].perk_id
                },
                attributes: [
                    'id',
                    'name',
                    'effect',
                ]
            });*/


            res.render('character-view', {character});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;