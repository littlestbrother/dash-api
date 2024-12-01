const Logger = require('@kb/common/utils/logger');

const logger = new Logger(__filename);

// check dynamo to determine if off day
// const isOffDay = () => { }

const LIST_LENGTH = 7;

const getUpcoming = () => {
    logger.info();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const today = new Date();

    const upcoming = [];
    for (let i = 1; i <= LIST_LENGTH; i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i, 0, 0, 0, 0);
        const numericDay = date.getDay();

        // if week day
        if (numericDay >= 1 && numericDay <= 5) {
            const dayName = days[date.getDay()];
            const dayNum = date.getDate();
            const monthName = months[date.getMonth()];
            upcoming.push({ iso: date, dayName, dayNum, monthName });
        }

    }

    return upcoming;
};

const createUpcoming = ({ month, date, year }) => {
    logger.info({ month, date, year });

};

module.exports = {
    getUpcoming,
    createUpcoming
};  