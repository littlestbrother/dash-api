const express = require('express');

const services = require('../services');

const { validator } = require('../middleware/model');
const models = require('../models/downtime');

const router = express.Router();

router.get('/upcoming', async (req, res) => {
    const upcoming = await services.downtime.getUpcoming();
    res.json(upcoming);
});

router.post('/', validator(models), async (req, res) => {
    const { month, day, year } = req.body;

    res.json(await services.downtime.createUpcoming({ month, day, year }));
});

module.exports = router;