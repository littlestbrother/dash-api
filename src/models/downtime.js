const Joi = require('joi');

module.exports = {

    post: {
        ['/']: Joi.object({
            body: {
                month: Joi.number().required(),
                day: Joi.number().required(),
                year: Joi.number().required()
            }
        }).unknown(true)
    },

};