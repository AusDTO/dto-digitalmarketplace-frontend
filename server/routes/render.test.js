jest.mock('react-dom')

import {render, renderPage} from './render'
import Helmet from 'react-helmet'

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
    // vendor will always be dynamic!
    if (object && object.files) delete object.files.vendor;
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

beforeAll(() => {
  Helmet.canUseDOM = false;
});

test('render route with standard request', () => {
  let response = new Response();
  let req = request({ path: helloWorldWidgetPath });
  render(req, response);

  expect(response.statusCode).toEqual(200);
  expect(response.sendResponse)
    .toEqual({
      markup: '<h1 data-reactroot="" data-reactid="1" data-react-checksum="55251490">Hello World</h1>',
      slug: 'helloworld',
      files: {
        'helloworld': 'helloworld',
        'stylesheet': 'helloworld'
      }
    });
});

test('render route with standard request with custom props', () => {
  let response = new Response();
  let req = request({
    path: helloWorldWidgetPath,
    serializedProps: JSON.stringify(Object.assign({}, defaultProps, { id: 'hello-world' }))
  });

  render(req, response);

  expect(response.statusCode).toEqual(200);
  expect(response.sendResponse)
    .toEqual({
      markup: '<h1 id="hello-world" data-reactroot="" data-reactid="1" data-react-checksum="1940985849">Hello World</h1>',
      slug: 'helloworld',
      files: {
        'helloworld': 'helloworld',
        'stylesheet': 'helloworld'
      }
    });
});

test('render route with toStaticMarkup flag', () => {
  let response = new Response();
  let req = request({
    path: helloWorldWidgetPath,
    toStaticMarkup: true
  });

  render(req, response);

  expect(response.statusCode).toEqual(200);
  expect(response.sendResponse)
    .toEqual({
      markup: '<h1>Hello World</h1>',
      slug: 'helloworld',
      files: {
        'helloworld': 'helloworld',
        'stylesheet': 'helloworld'
      }
    });
});

test('render route with toStaticMarkup flag and custom props', () => {
  let response = new Response();
  let req = request({
    path: helloWorldWidgetPath,
    toStaticMarkup: true,
    serializedProps: JSON.stringify(Object.assign({}, defaultProps, { id: 'hello-world' }))
  });

  render(req, response);

  expect(response.statusCode).toEqual(200);
  expect(response.sendResponse)
    .toEqual({
      markup: '<h1 id="hello-world">Hello World</h1>',
      slug: 'helloworld',
      files: {
        'helloworld': 'helloworld',
        'stylesheet': 'helloworld'
      }
    });
});

test('render route with no path supplied', () => {
  let response = new Response();
  let req = request();

  render(req, response);

  expect(response.statusCode).toEqual(400);
  expect(response.sendResponse.stack).toMatch(/You must supply a path/);
})

test('render route with a bad path supplied in request', () => {
  let response = new Response();
  let req = request({
    path: 'bad/path/to/HelloWorldWidget.js'
  });

  render(req, response);

  expect(response.statusCode).toEqual(400);
  expect(response.sendResponse.stack)
    .toMatch('Cannot find module \'../src/bad/path/to/HelloWorldWidget.js\'');
})

test('render page with standard request', () => {
  let response = new Response();
  let req = request();
  req.url = '/hello';

  renderPage(req, response);

  expect(response.statusCode).toEqual(200);
  console.log(response.sendResponse)
  expect(response.sendResponse)
    .toMatch('<h1 data-reactroot="" data-reactid="1" data-react-checksum="55251490">Hello World</h1>');
});

test('render page with invalid url request', () => {
  let response = new Response();
  let req = request();
  req.url = '/invalid';

  renderPage(req, response);

  expect(response.statusCode).toEqual(404);
  expect(response.sendResponse)
    .toMatch('Page not found');
});
