const path = require('path');

const pkg = require('../package.json');

require('dotenv').config({
    path: path.resolve(process.cwd(), '.env.secrets')
});

const { SSM } = require('@kb/aws');

const Logger = require('@kb/common/utils/logger');
const logger = new Logger(__filename);

const object = require('../src/constants');

logger.info(process.env);

const main = async () => {

    const env = JSON.parse(JSON.stringify({ ...object }));

    // clean up and remove any fields we want to ignore
    // remove.forEach((k) => {
    // delete env[k];
    // });

    // clean up and remove any undefined fields
    Object.keys(object).forEach((k) => {
        if (object[k] === undefined) {
            delete env[k];
        }
    });

    logger.info({ env });

    await SSM.createParameters(pkg.namespace, pkg.name, 'production', env);
};

module.exports = {
    main
};
