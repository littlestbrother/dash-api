const express = require('express');

const router = express.Router();

router.use('/clock-in', require('./clock-in'));

module.exports = router;