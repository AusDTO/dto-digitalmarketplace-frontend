import React from 'react'
import ReactDOMServer from 'react-dom/server'
import path from 'path';
import fs from 'fs';
import get from 'lodash/get';
import rollbar from 'rollbar'
import ComponentRenderer from '../ComponentRenderer';
import App from './App';

const isDev = process.env.NODE_ENV !== 'production';

let cache = {};
let contentHashCache = {};
let widgetPaths = {
  '/collaborate': 'bundles/Collaborate/CollaborateLandingWidget.js',
  '/hello': 'bundles/HelloWorld/HelloWorldWidget.js'
};

/**
 * Get hashed filename from webpack.
 * @param  {string} key The slug of the current widget/component we're trying to render.
 * @return {string}     The hashed file name. Format: [slug].[contenthash].js
 */
const getHashedFilename = (key, extension = 'js') => {
  const extensionRegex = new RegExp(`\.${extension}$`);

  if (key in contentHashCache && get(contentHashCache, key, '').match(extensionRegex)) {
    return contentHashCache[key]
  }

  let assetsByChunkName = fs.readFileSync(process.cwd() + '/assetsByChunkName.json');
  assetsByChunkName = JSON.parse(assetsByChunkName.toString());
  let filename = key;
  if (key in assetsByChunkName) {
    const chunk = assetsByChunkName[key];
    if (Array.isArray(chunk)) {
      filename = assetsByChunkName[key].find(asset => asset.match(extensionRegex));
    } else {
      filename = chunk;
    }
  }

  contentHashCache[key] = filename;

  return filename;
}

const renderComponent = (pathToSource,  props, toStaticMarkup) => {

  if (!pathToSource) {
    throw new Error('You must supply a path');
  }

  pathToSource = path.normalize(pathToSource);

  if (isDev) {
    // If not production, bust require cache
    // This will need some better monitoring
    require.cache = {};
  }

  if (isDev || !(pathToSource in cache)) {
    console.log('[%s] Loading new component %s', new Date().toISOString(), pathToSource);
    cache[pathToSource] = new ComponentRenderer(pathToSource);
  }

  const component = cache[pathToSource];

  // TODO test this behaviour
  const markup = component.render(props, toStaticMarkup);
  const componentKey = component.element.key;
  return{
    markup,
    slug: componentKey,
    files: {
      [component.element.key]: getHashedFilename(componentKey),
      vendor: getHashedFilename('vendor'),
      stylesheet: getHashedFilename(componentKey, 'css')
    }
  };
}

const render = (request, response) => {
  let defaultProps = JSON.stringify({
    _serverContext: {
      location: ''
    }
  });

  let {
    toStaticMarkup = false,
    path: pathToSource,
    serializedProps = defaultProps
  } = request.body;

  let props = JSON.parse(serializedProps);  

  // TODO test this behaviour
  try {
    response.send(renderComponent(pathToSource, props, toStaticMarkup));
  } catch(e) {
    rollbar.handleError(e, request);
    return response.status(400).send({ 
      error: `Error rendering component: '${pathToSource}'`, 
      stack: e.stack 
    });
  }
} 

const renderPage = (request, response) => {
  if (!widgetPaths.hasOwnProperty(request.url)) {
    return response.status(404).send('Url not mapped to widget');
  }

  const pathToSource = widgetPaths[request.url];
  let props = {_serverContext: {location: request.url}, form_options: {}, options: {serverRender: true}};
  let clonedProps = Object.assign({}, props);

  try {
    const component = renderComponent(pathToSource, props, false)
    response.send('<!doctype html>' + ReactDOMServer.renderToString(<App state={clonedProps} component={component}/>));
  } catch(e) {
    rollbar.handleError(e, request);
    return response.status(400).send({ 
      error: `Error rendering: '${request.url}'`, 
      stack: e.stack 
    });
  }
}

export {render, renderPage}
