const path = require('path');
const pkg = require('../package.json');

const { NODE_ENV } = process.env;

if (!NODE_ENV) {
    throw Error('NODE_ENV not set.');
}

require('dotenv').config({
    path: path.resolve(process.cwd(), `.env.${NODE_ENV}`)
});

const { SSM } = require('@kb/aws');

const Logger = require('@kb/common/utils/logger');
const logger = new Logger();

const object = require('../src/constants');

const remove = ['ROLES'];

const {
    MYSQL_READ_HOST,
    MYSQL_READ_PASSWORD,
    MYSQL_READ_USER,
    MYSQL_READ_DATABASE,
    MYSQL_READ_PORT,
    MYSQL_WRITE_PORT,
    MYSQL_VALIDATION_QUERY,
    MYSQL_WRITE_USER,
    MYSQL_WRITE_CONNECTIONS,
    MYSQL_WRITE_HOST,
    MYSQL_WRITE_PASSWORD,
    MYSQL_READ_CONNECTIONS,
    MYSQL_WRITE_DATABASE
} = process.env;

const include = {
    MYSQL_READ_HOST,
    MYSQL_READ_PASSWORD,
    MYSQL_READ_USER,
    MYSQL_READ_DATABASE,
    MYSQL_READ_PORT,
    MYSQL_WRITE_PORT,
    MYSQL_VALIDATION_QUERY,
    MYSQL_WRITE_USER,
    MYSQL_WRITE_CONNECTIONS,
    MYSQL_WRITE_HOST,
    MYSQL_WRITE_PASSWORD,
    MYSQL_READ_CONNECTIONS,
    MYSQL_WRITE_DATABASE
};

logger.info(process.env);

const main = async () => {

    const env = JSON.parse(JSON.stringify({ ...object, ...include }));

    // clean up and remove any fields we want to ignore
    remove.forEach((k) => {
        delete env[k];
    });

    // clean up and remove any undefined fields
    Object.keys(object).forEach((k) => {
        if (object[k] === undefined) {
            delete env[k];
        }
    });

    logger.info({ env });

    await SSM.createParameters(pkg.namespace, pkg.name, NODE_ENV, env);
};

module.exports = {
    main
};
