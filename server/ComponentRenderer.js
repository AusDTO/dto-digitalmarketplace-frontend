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

    this.element = element;
  }

  render(props, toStaticMarkup) {
    const serverContext = props._serverContext;
    const location = serverContext.location;

    delete props._serverContext;

    const renderMethod = toStaticMarkup ? 'renderToStaticMarkup' : 'renderToString';
    const context = createServerRenderContext();

    return (
      ReactDOMServer[renderMethod](
        <ServerRouter location={location} context={context}>
          {this.element.instance(props)}
        </ServerRouter>
      )
    );
  }
}
