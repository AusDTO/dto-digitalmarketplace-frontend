import express from 'express'
import Rollbar from 'rollbar'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'

import { render } from './routes/render'

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
const helmet = require("helmet");
app.use(bodyParser.json({limit: '50mb'}));
app.use(compression());
app.use('/bundle', express.static('build'));
app.use('/static', express.static('build/static'));

app.use(function errorHandler(err, request, response, next) {
  console.log('[' + new Date().toISOString() + '] ' + err.stack);
  response.status(500).send(argv.debug ? err.stack : err.toString());
});

// use helmet to add HSTS
// Sets "Strict-Transport-Security: max-age=300"
app.use(
  helmet.hsts({
    // 300 is 5 minutes
    maxAge: 300,
    // includeSubDomains: false,
  })
);

// Use the rollbar error handler to send exceptions to your rollbar account
app.use(rollbar.errorHandler());

if (isDev) {
  app.use(morgan('tiny'));
}

app.get('/', function (req, res) {
  res.send('ok');
});

app.post('/render', render);

app.set('view engine', 'ejs');

app.get('/2/collaborate*', function(req, res) {
  res.redirect('https://infrastructure.gov.au/cities/smart-cities/collaboration-platform/');
})

app.get('/2/r/master-agreement-2019-07-01.pdf', function(req, res) {
  res.redirect('/api/2/r/master-agreement-2019-07-01.pdf');
})

app.get('/2/r/comprehensive-terms-2019-07-01.pdf', function(req, res) {
  res.redirect('/api/2/r/comprehensive-terms-2019-07-01.pdf');
})


app.get('/*', function(req, res) {
  res.render('index');
})

const server = app.listen(process.env.PORT || 60000, function() {
  console.log('Started server at port %s', server.address().port);
});

export default app;
