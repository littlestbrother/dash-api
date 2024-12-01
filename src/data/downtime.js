const { Dynamo } = require('@kb/aws');

const Logger = require('@kb/common/utils/logger');

const { DYNAMO_DOWNTIME_TABLE } = require('../constants');

const db = new Dynamo(DYNAMO_DOWNTIME_TABLE);
const logger = new Logger(__filename);

const getUpcoming = async ({ month, date, year }) => {
    logger.info({ month, date, year });
    // TODO: remove old entries
    const all = await db.getAll();
    return all;
};

const create = async ({ month, date, year }) => {
    logger.info({ month, date, year });
    
    const id = `${month}-${date}-${year}`;

    const oneMonthExpiryInSeconds = 60 * 60 * 24 * 30;

    return await db.createOneExpiring(id, null, oneMonthExpiryInSeconds);
};

module.exports = {
    getUpcoming,
    create
};