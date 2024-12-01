const { Dynamo } = require('@kb/aws');

const Logger = require('@kb/common/utils/logger');

const { DYNAMO_DOWNTIME_TABLE } = require('../constants');

const db = new Dynamo(DYNAMO_DOWNTIME_TABLE);
const logger = new Logger(__filename);

const getAll = async () => {
    logger.info();
    // TODO: remove old entries
    return await db.getAll();
};

const create = async ({ month, day, year }) => {
    logger.info({ month, day, year });

    const id = `${month}-${day}-${year}`;

    const oneMonthExpiryInSeconds = 60 * 60 * 24 * 30;

    return await db.createOneExpiring(id, { month, day, year }, oneMonthExpiryInSeconds);
};

module.exports = {
    getAll,
    create
};