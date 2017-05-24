var rollbarConfig = {
    accessToken: process.env.ROLLBAR_CLIENT_TOKEN,
    handleUncaughtExceptions: true,
    handleUnhandledRejections: true,
    payload: {
        environment: process.env.NODE_ENV || 'development',
    }
};

var Rollbar = require("rollbar");
var rollbar = new Rollbar(rollbarConfig);