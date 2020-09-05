const router = require('express').Router();
const sequelize = require('../config/connection');
const {Character, User, Perk, Dlc, CharacterPerk} = require('../models/');
const perkLookup = require('../utilities/data-manipulation');

router.get('/', (req, res) => {
    //console.log(req.session);
    Character.findAll({
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
            res.render('homepage', {loggedIn: req.session.loggedIn});
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



module.exports = router;