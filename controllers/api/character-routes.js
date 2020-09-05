const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Character, User, Perk, Dlc, CharacterPerk} = require('../../models/');

//GET all characters /api/characters
router.get('/', (req, res) => {
    Character.findAll({
        attributes: {exclude: ['user_id']},
        include: [
            {
                model: User,
                attributes: ['username']
            },
            /*{
                model: Perk,
                attributes: ['name']
            }*/
        ]
    })
        
        .then(dbCharacterData => res.json(dbCharacterData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET a single character /api/characters/1
router.get('/:id', (req, res) => {
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
            res.json(dbCharacterData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST a new character /api/characters
router.post('/', (req, res) => {
    Character.create({
        name: req.body.name,
        level: req.body.level,
        description: req.body.description,
        strength: req.body.strength,
        perception: req.body.perception,
        endurance: req.body.endurance,
        intelligence: req.body.intelligence,
        charisma: req.body.charisma,
        agility: req.body.agility,
        luck: req.body.luck,
        user_id: req.session.user_id
    })
        .then(dbCharacterData => res.json(dbCharacterData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Add a character perk /api/characters/addperk
router.put('/addperk', (req, res) => {
    CharacterPerk.create({
        level_taken: req.body.level_taken,
        character_id: req.body.character_id,
        perk_id: req.body.perk_id
    }).then(() => {
        //then find the perk we just added
        return Perk.findOne({
            where: {
                id: req.body.perk_id
            },
            attributes: [
                'id',
                'name',
                'effect'
            ]
        })
            .then(dbPerkData => res.json(dbPerkData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    });

});

//UPDATE a character /api/characters/1
router.put('/:id', (req, res) => {
    Character.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbCharacterData => {
            if(!dbCharacterData[0]) {
                res.status(404).json({message: 'No character found with this id'});
                return;
            }
            res.json(dbCharacterData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//DELETE a character /api/characters/1
router.delete('/:id', (req, res) => {
    Character.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCharacterData => {
            if(!dbCharacterData) {
                res.status(404).json({message: 'No character found with this id'});
                return;
            }
            res.json(dbCharacterData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;