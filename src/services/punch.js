const Logger = require('@kb/common/utils/logger');

const logger = new Logger(__filename);

const { MINIMUM_HOUR_AM, MAXIMUM_HOUR_AM, MAXIMUM_MINUTE_AM } = require('../constants');

const inTimeRange = ({ userHour, userMinute }) => {
    logger.info({ userHour, userMinute });

    // userHour is greater than 7:00 AM
    if (userHour >= MINIMUM_HOUR_AM) {

        // userHour is less than 9:00 AM
        if (userHour < MAXIMUM_HOUR_AM) {
            // EX: 8:00 AM
            return true;
        }

        // userHour is equal to 9 (user could be before 9:30 AM)
        if (userHour === MAXIMUM_HOUR_AM) {

            // userMinute is less than 30
            // EX: 9:15 AM (true)
            // EX: 9:32 AM (false)
            return userMinute < MAXIMUM_MINUTE_AM;
        }

        // userHour is greater than 9:00 AM
        if (userHour > MAXIMUM_HOUR_AM) {
            // EX: 10:00 AM
            return false;
        }
    }
};

const isEligible = ({ tzOffset }) => {
    logger.info({ tzOffset });

    // Calculate the user's local time
    const serverTime = new Date();
    const userTime = new Date(serverTime.getTime() - parseInt(tzOffset) * 60000); // Adjust server time by offset

    // Check if the local time is between 7:00 AM and 9:30 AM
    const userHour = userTime.getHours();
    const userMinute = userTime.getMinutes();

    const inRange = inTimeRange({ userHour, userMinute });

    return inRange;

};

module.exports = {
    isEligible
};