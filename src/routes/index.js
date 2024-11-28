const express = require('express');

const router = express.Router();

router.use('/clock-in', require('./clock-in'));
router.use('/off-day', require('./off-day'));

module.exports = router;