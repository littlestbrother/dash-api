const util = require('util');
const fs = require('fs');
const path = require('path');
const exec = util.promisify(require('child_process').exec);

const { name, namespace } = require('../package.json');

const Logger = require('@kb/common/utils/logger');

const logger = new Logger(__filename);

if (!name || !namespace) {
    logger.info({ name, namespace });
    logger.error('Missing name or namespace in package.json- cannot load secrets.');
    process.exit(1);
}

const ssmPath = `"/${namespace}/${name}/production/"`;

const getServiceSecrets = async () => {
    logger.info(`Retrieving secrets from ${ssmPath} in SSM.`);
    const { stdout } = await exec(`aws ssm get-parameters-by-path --path "/${namespace}/${name}/production/" --recursive --with-decryption`);
    const { Parameters } = JSON.parse(stdout);
    if (!Parameters || !Parameters.length > 0) {
        throw Error(`No parameters found using SSM path recursively: ${ssmPath}`);
    }

    return Parameters;
};

const load = async () => {
    const secrets = await getServiceSecrets(); // get secrets for service from SSM

    // map data to key=value format in a string
    let fileData = '';
    secrets.map((e) => {
        const { Name, Value } = e;
        const key = Name.split('/').pop();
        if (key != 'api_key' && key != 'password' && key != 'username') {
            fileData = fileData + (`${key}=${Value}\n`);
        }
    });

    // write string to file
    const secretFilePath = path.resolve(process.cwd(), '.env.secrets');
    fs.writeFileSync(secretFilePath, fileData);
};

const validate = () => {
    require('dotenv').config({ path: path.resolve(process.cwd(), '.env.secrets') });
    const constants = require('../src/constants');

    const invalid = [];
    for (const env in constants) {
        if (!constants[env] || (String(constants[env]).includes('localhost') || String(constants[env]).includes('http://'))) {
            invalid.push(env);
        }
    }

    if (invalid.length > 0) {
        throw Error(`${invalid}, are empty or invalid secrets!`);
    }
};

(async () => {
    try {
        await load();
        validate();
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
})();