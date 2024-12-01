const Joi = require('joi');

module.exports = {

    post: {

        ['/']: Joi.object({
            body: Joi.object({
                month: Joi.string().required(),
                date: Joi.string().required(),
                year: Joi.string().required()
            }).unknown(true)
        }).unknown(true)
    },

};