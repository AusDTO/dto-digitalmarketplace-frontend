var _rollbarConfig = {
    accessToken: process.env.ROLLBAR_CLIENT_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        environment: process.env.NODE_ENV || 'development',
    }
};

var Rollbar = require("rollbar");
var rollbar = new Rollbar(_rollbarConfig);