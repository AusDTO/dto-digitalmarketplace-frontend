// Required so we can process presentational components
require('babel-register')

import path from 'path'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import ComponentRenderer from './ComponentRenderer'

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

if (isDev)
    app.use(morgan('tiny'));

// Component cache living in global scope
var cache = {};

app.use('/bundle', express.static('build'));

app.get('/', function (req, res) {
  res.send('ok');
});

app.post('/render', function service(request, response) {
  var toStaticMarkup = request.body.toStaticMarkup || false;
  var pathToSource = request.body.path;
  var props = JSON.parse(request.body.serializedProps || {});

  if (!pathToSource) {
    return response.status(400).send({ error: 'path required' });
  }

  pathToSource = path.normalize(pathToSource);
  if (argv.whitelist) {
    if (!pathToSource.startsWith(argv.whitelist)) {
      return response.status(400).send({ error: 'invalid path'});
    }
  }

  if (isDev) {
    // If not production, bust require cache
    // This will need some better monitoring
    require.cache = {}
  }

  if (isDev || !(pathToSource in cache)) {
    console.log('[%s] Loading new component %s', new Date().toISOString(), pathToSource);
    cache[pathToSource] = new ComponentRenderer(pathToSource)
  }

  var component = cache[pathToSource];
  component.render(props, toStaticMarkup, function(markup) {
    response.send({
      markup,
      slug: component.element.key
    })
  });
});

app.use(function errorHandler(err, request, response, next) {
  console.log('[' + new Date().toISOString() + '] ' + err.stack);
  response.status(500).send(argv.debug ? err.stack : err.toString());
});

var server = app.listen(process.env.PORT || 63578, function() {
  console.log('Started server at port %s', server.address().port);
});

export default app;
