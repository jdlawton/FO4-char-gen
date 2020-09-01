const router = require('express').Router();
const userRoutes = require('./user-routes');
const dlcRoutes = require('./dlc-routes');
const perkRoutes = require('./perk-routes');

router.use('/users', userRoutes);
router.use('/dlc', dlcRoutes);
router.use('/perks', perkRoutes);

module.exports = router;