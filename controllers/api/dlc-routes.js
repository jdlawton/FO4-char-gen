const router = require('express').Router();
const {Dlc} = require('../../models/');

//GET all dlc /api/dlc
router.get('/', (req, res) => {
    Dlc.findAll()
        .then(dbDlcData => res.json(dbDlcData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET a single dlc /api/dlc/1
router.get('/:id', (req, res) => {
    Dlc.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbDlcData => {
            if(!dbDlcData) {
                res.status(404).json({message: 'No DLC found with this id'});
                return;
            }
            res.json(dbDlcData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST a new dlc /api/dlc
router.post('/', (req, res) => {
    Dlc.create({
        name: req.body.name
    })
        .then(dbDlcData => res.json(dbDlcData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//UPDATE a dlc /api/dlc/1
router.put('/:id', (req, res) => {
    Dlc.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbDlcData => {
            if(!dbDlcData[0]) {
                res.status(404).json({message: 'No DLC found with this id'});
                return;
            }
            res.json(dbDlcData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//DELETE a dlc /api/dlc/1
router.delete('/:id', (req, res) => {
    Dlc.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbDlcData => {
            if(!dbDlcData) {
                res.status(404).json({message: 'No dlc found with this id'});
                return;
            }
            res.json(dbDlcData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;