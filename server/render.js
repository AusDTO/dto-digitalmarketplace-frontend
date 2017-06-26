import express from 'express'
import Rollbar from 'rollbar'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'

import { render, renderPage } from './routes/render'

var _rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    verbose: true,
    payload: {
        environment: process.env.NODE_ENV || 'development',
    }
};

var rollbar = new Rollbar(_rollbarConfig);

const isDev = process.env.NODE_ENV !== 'production'

var argv = require('yargs')
  .usage('Usage: $0 [--port NUM]')
  .describe('port', 'The port to listen to')
  .describe('debug', 'Print stack traces on error').alias('debug', 'd')
  .describe('whitelist', 'Whitelist a root directory where the javascript files can be')
  .default('port', process.env.PORT)
  .default('whitelist', process.env.REACT_WHITELIST)
  .help('h').alias('h', 'help')
  .argv;

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(compression());
app.use('/bundle', express.static('build'));
app.use('/static', express.static('build/static'));
app.use(function errorHandler(err, request, response, next) {
  console.log('[' + new Date().toISOString() + '] ' + err.stack);
  response.status(500).send(argv.debug ? err.stack : err.toString());
});
// Use the rollbar error handler to send exceptions to your rollbar account
app.use(rollbar.errorHandler());

if (isDev) {
  app.use(morgan('tiny'));
}

app.get('/', function (req, res) {
  res.send('ok');
});

app.post('/render', render);

app.get('/*', renderPage);

const server = app.listen(process.env.PORT || 60000, function() {
  console.log('Started server at port %s', server.address().port);
});

export default app;
