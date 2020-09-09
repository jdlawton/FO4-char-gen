const router = require('express').Router();
const {Character, User, Perk, Dlc, CharacterPerk} = require('../../models/');
//const { rawAttributes } = require('../../models/dlc');

//GET all perks /api/perks
router.get('/', (req, res) => {
    Perk.findAll({
        attributes: [
            'id',
            'name',
            'perk_rank',
            'req_name',
            'req_rank',
            'req_level',
            'effect'
        ],
        include: [
            {
                model: Dlc,
                attributes: ['name']
            }
        ]
    })
        .then(dbPerkData => res.json(dbPerkData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET a single perk /api/perks/1
router.get('/:id', (req, res) => {
    Perk.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'perk_rank',
            'req_name',
            'req_rank',
            'req_level',
            'effect'
        ],
        include: [
            {
                model: Dlc,
                attributes: ['name']
            }
        ]
    })
        .then(dbPerkData => {
            if(!dbPerkData) {
                res.status(404).json({message: 'No perk found with this id'});
                return;
            }
            res.json(dbPerkData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST a new perk /api/perks
router.post('/', (req, res) => {
    Perk.create({
        name: req.body.name,
        perk_rank: req.rank.perk_rank,
        req_name: req.body.req_name,
        req_rank: req.body.req_rank,
        req_level: req.body.req_level,
        effect: req.body.effect,
        dlc_id: req.body.dlc_id
    })
        .then(dbPerkData => res.json(dbPerkData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//UPDATE a perk /api/perks/1
router.put('/:id', (req, res) => {
    Perk.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbPerkData => {
            if(!dbPerkData[0]) {
                res.status(404).json({message: 'No perk found with this id'});
                return;
            }
            res.json(dbPerkData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//DELETE a perk /api/perks/1
router.delete('/:id', (req, res) => {
    Perk.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPerkData => {
            if(!dbPerkData) {
                res.status(404).json({message: 'No perk found with this id'});
                return;
            }
            res.json(dbPerkData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;