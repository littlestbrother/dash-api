const express = require('express');

// const services = require('../../services');
// const { validator } = require('../../middleware/model');
// const models = require('../../models/private/user');

const router = express.Router();

// router.post('/', validator(models), async (req, res) => {
router.post('/', (req, res) => {
    // const { username } = req.auth;
    // const { oldPassword, newPassword } = req.body;

    // const { id: userId } = await services.user.authenticate({ username, password: oldPassword });
    // res.json(await services.user.updatePassword({ userId, password: newPassword }));
    res.json({});
});

module.exports = router;