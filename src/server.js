const express = require('express');
require('express-async-errors');
const cors = require('cors');

const pkg = require('../package.json');
const routes = require('./routes');

// get env vars & setup mysql
const { PORT } = require('./constants');

const Logger = require('@kb/common/utils/logger');
const logger = new Logger(__filename);

const app = express();

// setup the server
app.use(cors());
app.enable('trust proxy');

app.use(express.json({ limit: '50mb', strict: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Accept, Accept-Encoding, Authorization, Content-Type, Origin');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/api/_version', (req, res) => {
    res.json({ version: pkg.version });
});

app.use('/api', routes);

app.listen(PORT);
logger.info(`Listening on ${PORT}`);

module.exports = app;
