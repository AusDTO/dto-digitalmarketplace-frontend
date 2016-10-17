import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'

export default class ComponentRenderer {

  constructor(pathToSource) {
    this.pathToSource = path.relative(__dirname, pathToSource);
    let element = require(this.pathToSource);

    // Detect bad JS file
    if (!element) {
      throw new Error('JS file did not export anything: ' + this.pathToSource);
    }
    if (typeof element.default !== 'undefined') {
      // ES6 'export default' support
      element = element.default;
    }

    this.element = element
  }

  render(props, toStaticMarkup) {
    const serverContext = props._serverContext
    const location = serverContext.location;
    delete props._serverContext;

    const renderMethod = toStaticMarkup ? 'renderToStaticMarkup' : 'renderToString'
    const context = createServerRenderContext()

    return (
      ReactDOMServer[renderMethod](
        <ServerRouter location={location} context={context}>
          {this.element.instance(props)}
        </ServerRouter>
      )
    )
  }
}
