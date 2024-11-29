const Logger = require('@kb/common/utils/logger');

const logger = new Logger(__filename);

// check dynamo to determine if off day
// const isOffDay = () => { }

const getUpcoming = () => {
    logger.info();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const today = new Date();

    const upcoming = [];
    for (let i = 1; i <= 14; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        const numericDay = date.getDay();

        // if week day
        if (numericDay >= 1 && numericDay <= 5) {
            const name = days[date.getDay()];
            upcoming.push({ iso: date, name });
        }

    }

    return upcoming;
};

module.exports = {
    getUpcoming
};