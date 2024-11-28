const joi = require('joi');

const Logger = require('@kb/common/utils/logger');

const { BAD_REQUEST } = require('../error');

const logger = new Logger(__filename);

const options = {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    skipFunctions: false,
    language: {},
    presence: 'required',
    noDefaults: false,
    escapeHtml: false,
};

const validate = (data, schema) => {
    const result = joi.validate(data, schema, options);
    if (result.error) {
        const { details } = result.error;
        throw BAD_REQUEST('ValidationError', details);
    }

    return result.value;
};

module.exports = {
    validate
};

const validator = (models) => (req, res, next) => {

    const { method } = req.route.stack[0];
    const { path } = req.route;

    logger.extra({ method, path });

    const schema = models[method][path];

    const body = req?.body;
    const query = req?.query;
    const params = req?.params;

    validate({ body, query, params }, schema);
    next();
};

module.exports = {
    validator
};