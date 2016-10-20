import path from 'path';
import ComponentRenderer from '../ComponentRenderer';

const isDev = process.env.NODE_ENV !== 'production';

let cache = {};

const render = (request, response) => {
  let defaultProps = JSON.stringify({
    _serverContext: {
      location: ''
    }
  })

  let {
    toStaticMarkup = false,
    path: pathToSource,
    serializedProps = defaultProps
  } = request.body

  let props = JSON.parse(serializedProps);

  if (!pathToSource) {
    return response.status(400).send({ error: 'You must supply a path' });
  }

  pathToSource = path.normalize(pathToSource);

  if (isDev) {
    // If not production, bust require cache
    // This will need some better monitoring
    require.cache = {}
  }

  if (isDev || !(pathToSource in cache)) {
    console.log('[%s] Loading new component %s', new Date().toISOString(), pathToSource);
    cache[pathToSource] = new ComponentRenderer(pathToSource)
  }

  const component = cache[pathToSource];

  // TODO test this behaviour
  try {
    const markup = component.render(props, toStaticMarkup);
    response.send({
      markup,
      slug: component.element.key
    });
  } catch(e) {
    return response.status(400).send({ error: e.message });
  }
}


export default render
