var rollbarConfig = {
    accessToken: process.env.ROLLBAR_CLIENT_TOKEN,
    captureUncaught: true,
    payload: {
        environment: process.env.NODE_ENV || 'development',
    }
};

var Rollbar = require('rollbar-browser');
Rollbar.init(rollbarConfig);