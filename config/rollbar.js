var _rollbarConfig = {
    accessToken: process.env.ROLLBAR_CLIENT_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        environment: process.env.NODE_ENV || 'development',
        client: {
          javascript: {
            source_map_enabled: true, //this is now true by default
            code_version: process.env.CIRCLE_SHA1 || 'noversion',
            guess_uncaught_frames: true
          }
        }
    }
};

var Rollbar = require("rollbar");
var rollbar = new Rollbar(_rollbarConfig);