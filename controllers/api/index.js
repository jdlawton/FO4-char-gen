const router = require('express').Router();
const userRoutes = require('./user-routes');
const dlcRoutes = require('./dlc-routes');
const perkRoutes = require('./perk-routes');
const characterRoutes = require('./character-routes');

router.use('/users', userRoutes);
router.use('/dlc', dlcRoutes);
router.use('/perks', perkRoutes);
router.use('/characters', characterRoutes);

module.exports = router;