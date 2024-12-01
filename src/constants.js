const {
    PORT = 8888,
    // TIME
    MINIMUM_HOUR_AM = 7,
    MAXIMUM_HOUR_AM = 9,
    MAXIMUM_MINUTE_AM = 30,
    // AWS
    AWS_PROFILE,
    AWS_REGION,
    DYNAMO_PUNCH_TABLE = 'punch',
    DYNAMO_DOWNTIME_TABLE = 'downtime',
    DYNAMO_PARDON_TABLE = 'pardon'
} = process.env;

module.exports = {
    PORT,
    // TIME
    MINIMUM_HOUR_AM,
    MAXIMUM_HOUR_AM,
    MAXIMUM_MINUTE_AM,
    // AWS
    AWS_PROFILE,
    AWS_REGION,
    DYNAMO_PUNCH_TABLE,
    DYNAMO_DOWNTIME_TABLE,
    DYNAMO_PARDON_TABLE
};