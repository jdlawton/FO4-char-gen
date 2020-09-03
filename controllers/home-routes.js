const router = require('express').Router();
const sequelize = require('../config/connection');
const {Character, User, Perk, Dlc, CharacterPerk} = require('../models/');

router.get('/', (req, res) => {
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

module.exports = router;