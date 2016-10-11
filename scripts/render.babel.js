// Required so we can process presentational components
require('babel-register')

import fs from 'fs'
import path from 'path'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'
import { Provider } from 'react-redux'

const isDev = process.env.NODE_ENV !== 'production'

var argv = require('yargs')
  .usage('Usage: $0 [--port NUM] [--host ADDRESS]')
  .describe('port', 'The port to listen to')
  .describe('host', 'The host address to bind to')
  .describe('debug', 'Print stack traces on error').alias('debug', 'd')
  .describe('whitelist', 'Whitelist a root directory where the javascript files can be')
  .default('whitelist', process.env.REACT_WHITELIST)
  .help('h').alias('h', 'help')
  .argv;

morgan.token('file', function(req, res){
  return path.basename(req.body.path);
});

var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :file :res[content-length]'));

// Component cache living in global scope
var cache = {};

class Component {

  constructor(pathToSource) {
    this.pathToSource = path.relative(__dirname, pathToSource);
    this.component = require(this.pathToSource);

    // Detect bad JS file
    if (!this.component) {
      throw new Error('JS file did not export anything: ' + this.pathToSource);
    }
    if (typeof this.component.default !== 'undefined') {
      // ES6 'export default' support
      this.component = this.component.default;
    }

    try {
      this.factory = React.createFactory(this.component);
    } catch(e) {
      throw new Error('Not a React component: ' + this.pathToSource);
    }
  }

  getStore(props) {
    const parsedPath = path.parse(this.pathToSource)
    let createStore = require(parsedPath.dir + '/redux/create')
    if (typeof createStore.default !== 'undefined') {
      // ES6 'export default' support
      createStore = createStore.default;
    }
    return createStore(props)
  }

  render(props, toStaticMarkup, callback) {
    const pythonContext = props._pythonContext
    const location = pythonContext.location;
    delete props._pythonContext;

    const element = this.factory(props);
    const renderMethod = toStaticMarkup ? 'renderToStaticMarkup' : 'renderToString'
    const context = createServerRenderContext()
    const store = this.getStore(props)
    callback(ReactDOMServer[renderMethod](
      <Provider store={store}>
        <ServerRouter location={location} context={context}>
          {element}
        </ServerRouter>
      </Provider>
    ))
  }
}

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
    cache[pathToSource] = new Component(pathToSource)
  }

  var component = cache[pathToSource];
  component.render(props, toStaticMarkup, function(markup) {
    const parsedPath = path.parse(pathToSource)
    response.send({
      markup,
      slug: parsedPath.name.toLowerCase().replace(/\s/g, '')
    })
  });
});

app.use(function errorHandler(err, request, response, next) {
  console.log('[' + new Date().toISOString() + '] ' + err.stack);
  response.status(500).send(argv.debug ? err.stack : err.toString());
});

var server = app.listen(argv.port || 63578, argv.host || 'localhost', function() {
  console.log('Started server at http://%s:%s', server.address().address, server.address().port);
});

module.exports = app;
