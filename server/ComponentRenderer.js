import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty';

export default class ComponentRenderer {

  constructor(pathToSource) {
    let element = require(`../src/${pathToSource}`);

    // Detect bad module
    // If file exists require will return an object even if it exports nothing
    // Ensure we have something to work with
    if (isEmpty(element)) {
      throw new Error(`File did not export anything: '${pathToSource}'`);
    }

    // ES6 'export default' support
    if (typeof element.default !== 'undefined') {
      element = element.default;
    }

    if (!element.instance) {
      throw new Error('Component must be registered in the Registry')
    }

    this.element = element;
  }

  render(props, toStaticMarkup) {
    const serverContext = props._serverContext;
    const basename = props.basename;
    let location = serverContext.location;

    delete props.basename;
    delete props._serverContext;

    const renderMethod = toStaticMarkup ? 'renderToStaticMarkup' : 'renderToString';
    const context = {};

    return (
      ReactDOMServer[renderMethod](
        <StaticRouter location={location} context={context} basename={basename}>
          {this.element.instance(props)}
        </StaticRouter>
      )
    );
  }
}
