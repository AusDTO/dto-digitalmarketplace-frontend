import renderRoute from './render'

const helloWorldWidgetPath = 'bundles/HelloWorld/HelloWorldWidget.js'

let defaultProps = {
  _serverContext: {
    location: ''
  }
}

// Mock objects/classes
class Response {
  sendResponse = {}
  statusCode = 200

  send = (object) => {
    this.sendResponse = object;
    return this;
  }
  status = (code) => {
    this.statusCode = code;
    return this;
  }
}

const request = (body = {}) => {
  /*
  {
    toStaticMarkup: true,
    path: '',
    serializedProps: JSON.stringify({})
  }
   */
  return { body }
}


test('render route with standard request', () => {
  let response = new Response();
  let req = request({ path: helloWorldWidgetPath });

  renderRoute(req, response);

  expect(response.statusCode).toEqual(200);
  expect(response.sendResponse)
    .toEqual({
      markup: '<h1 data-reactroot="" data-reactid="1" data-react-checksum="55251490">Hello World</h1>',
      slug: 'helloworld'
    });
});

test('render route with standard request with custom props', () => {
  let response = new Response();
  let req = request({
    path: helloWorldWidgetPath,
    serializedProps: JSON.stringify(Object.assign({}, defaultProps, { id: 'hello-world' }))
  });

  renderRoute(req, response);

  expect(response.statusCode).toEqual(200);
  expect(response.sendResponse)
    .toEqual({
      markup: '<h1 id="hello-world" data-reactroot="" data-reactid="1" data-react-checksum="1940985849">Hello World</h1>',
      slug: 'helloworld'
    });
});

test('render route with toStaticMarkup flag', () => {
  let response = new Response();
  let req = request({
    path: helloWorldWidgetPath,
    toStaticMarkup: true
  });

  renderRoute(req, response);

  expect(response.statusCode).toEqual(200);
  expect(response.sendResponse)
    .toEqual({
      markup: '<h1>Hello World</h1>',
      slug: 'helloworld'
    });
});

test('render route with toStaticMarkup flag and custom props', () => {
  let response = new Response();
  let req = request({
    path: helloWorldWidgetPath,
    toStaticMarkup: true,
    serializedProps: JSON.stringify(Object.assign({}, defaultProps, { id: 'hello-world' }))
  });

  renderRoute(req, response);

  expect(response.statusCode).toEqual(200);
  expect(response.sendResponse)
    .toEqual({
      markup: '<h1 id="hello-world">Hello World</h1>',
      slug: 'helloworld'
    });
});

test('render route with no path supplied', () => {
  let response = new Response();
  let req = request();

  renderRoute(req, response);

  expect(response.statusCode).toEqual(400);
  expect(response.sendResponse).toEqual({ error: 'You must supply a path' });
})

test('render route with a bad path supplied in request', () => {
  let response = new Response();
  let req = request({
    path: 'bad/path/to/HelloWorldWidget.js'
  });

  expect(() => {
    renderRoute(req, response);
  }).toThrowError('Cannot find module \'../src/bad/path/to/HelloWorldWidget.js\' from \'ComponentRenderer.js\'');
})
