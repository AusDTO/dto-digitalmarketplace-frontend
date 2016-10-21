import path from 'path';
import fs from 'fs';
import ComponentRenderer from '../ComponentRenderer';

const isDev = process.env.NODE_ENV !== 'production';

let cache = {};
let contentHashCache = {};

/**
 * Get hashed filename from webpack.
 * @param  {string} key The slug of the current widget/component we're trying to render.
 * @return {string}     The hashed file name. Format: [slug].[contenthash].js
 */
const getHashedFilename = (key) => {
  if (key in contentHashCache) {
    return contentHashCache[key]
  }

  let assetsByChunkName = fs.readFileSync(process.cwd() + '/assetsByChunkName.json');
  assetsByChunkName = JSON.parse(assetsByChunkName.toString());

  let filename = key;
  if (key in assetsByChunkName) {
    filename = assetsByChunkName[key].filter(asset => asset.match(/\.js$/))[0];
  }

  contentHashCache[key] = filename;

  return filename;
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

  if (!pathToSource) {
    return response.status(400).send({ error: 'You must supply a path' });
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
  try {
    const markup = component.render(props, toStaticMarkup);
    response.send({
      markup,
      slug: component.element.key,
      file: getHashedFilename(component.element.key)
    });
  } catch(e) {
    return response.status(400).send({ 
      error: `Error rendering component: '${pathToSource}'`, 
      stack: e.stack 
    });
  }
}


export default render
