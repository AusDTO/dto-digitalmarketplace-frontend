import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'
import path from 'path'
import fs from 'fs'
import get from 'lodash/get'
import Rollbar from 'rollbar'
import ComponentRenderer from '../ComponentRenderer'
import App from '../../app/App'
import {routes} from './routes' 
import template from './template'
import {Helmet} from "react-helmet"

const isDev = process.env.NODE_ENV !== 'production';

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

let cache = {};
let contentHashCache = {};

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
  try {
    let component, initialState, context = {};
    let cookie = request.universalCookies.get('dm_session');
    const validRoute = routes.some(route => {
      const match = matchPath(request.url, route);
      if (match) {
        let props = {_serverContext: {location: request.url}, form_options: {}, options: {serverRender: true}};
        initialState = Object.assign({}, props);
        component = renderComponent(route.widgetPath, props, false);
      }
      return match
    })

    if (!validRoute) {
      return response.status(404).send('Page not found');
    }

    response.send(template(ReactDOMServer.renderToString(
      <StaticRouter location={request.url} context={context}>
        <App component={component} initialState={initialState} cookie={cookie}/>
      </StaticRouter>
    ), Helmet.renderStatic()));

  } catch(e) {
    rollbar.handleError(e, request);
    return response.status(400).send({ 
      error: `Error rendering: '${request.url}'`, 
      stack: e.stack 
    });
  }
}

export {render, renderPage, renderComponent}
