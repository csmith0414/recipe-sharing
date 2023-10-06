const router = require('express').Router();

const apiRoutes = require('./api');
const homepage = require('./homepage');

router.use('/', homepage);
router.use('/api', apiRoutes);

module.exports = router;
