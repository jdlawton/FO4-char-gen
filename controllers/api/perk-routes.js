const router = require('express').Router();
const {Perk} = require('../../models/');

//GET all perks /api/perks
router.get('/', (req, res) => {
    Perk.findAll()
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

//POST a new perk /api/perks
router.post('/', (req, res) => {
    Perk.create({
        name: req.body.name,
        requirement: req.body.requirement,
        lvl_requirement: req.body.lvl_requirement,
        num_ranks: req.body.num_ranks,
        effect: req.body.effect,
        granted_by: req.body.granted_by,
        location: req.body.location,
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