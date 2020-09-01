const router = require('express').Router();
const userRoutes = require('./user-routes');
const dlcRoutes = require('./dlc-routes');

router.use('/users', userRoutes);
router.use('/dlc', dlcRoutes);

module.exports = router;