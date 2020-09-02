const router = require('express').Router();
const {Character, User, Perk, Dlc} = require('../../models/');

//GET all characters /api/characters
router.get('/', (req, res) => {
    Character.findAll({
        attributes: {exclude: ['user_id']},
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Perk,
                attributes: ['name']
            }
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

//POST a new character /api/characters
router.post('/', (req, res) => {
    Character.create({
        name: req.body.name,
        level: req.body.level,
        strength: req.body.strength,
        perception: req.body.perception,
        endurance: req.body.endurance,
        intelligence: req.body.intelligence,
        charisma: req.body.charisma,
        agility: req.body.agility,
        luck: req.body.luck,
        hit_points: req.body.hit_points,
        action_points: req.body.action_points,
        carry_weight: req.body.carry_weight,
        damage_res: req.body.damage_res,
        energy_res: req.body.energy_res,
        poison_res: req.body.poison_res,
        radiation_res: req.body.radiation_res,
        melee_bonus: req.body.melee_bonus,
        exp_mod: req.body.exp_mod,
        lv2_perk: req.body.lv2_perk,
        lv3_perk: req.body.lv3_perk,
        lv4_perk: req.body.lv4_perk,
        lv5_perk: req.body.lv5_perk,
        user_id: req.body.user_id
    })
        .then(dbCharacterData => res.json(dbCharacterData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
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