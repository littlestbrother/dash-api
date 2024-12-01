const express = require('express');

const router = express.Router();

router.use('/punch', require('./punch'));
router.use('/downtime', require('./downtime'));

module.exports = router;