import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'
import _ from 'lodash'

export default class ComponentRenderer {

  constructor(pathToSource) {
    let element = require(`../src/${pathToSource}`);

    // Detect bad module
    // If file exists require will return an object even if it exports nothing
    // Ensure we have something to work with
    if (_.isEmpty(element)) {
      throw new Error(`File did not export anything: '${pathToSource}'`);
    }

    // ES6 'export default' support
    if (typeof element.default !== 'undefined') {
      element = element.default;
    }

    if (!element.instance) {
      throw new Error('Component must be registered in the Registry')
    }

    this.pathToSource = pathToSource;
    this.element = element;
  }

  render(props, toStaticMarkup) {
    const serverContext = props._serverContext;
    const location = serverContext.location;

    delete props._serverContext;

    const renderMethod = toStaticMarkup ? 'renderToStaticMarkup' : 'renderToString';
    const context = createServerRenderContext();

    // TODO test this behaviour
    let markup;
    try {
      markup = ReactDOMServer[renderMethod](
        <ServerRouter location={location} context={context}>
          {this.element.instance(props)}
        </ServerRouter>
      );
    } catch (e) {
      throw new Error(`Error rendering component: '${this.pathToSource}' with message: '${e.message}'`)
    }

    return markup;
  }
}
