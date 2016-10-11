## Marketplace Buyer React frontend

### Getting started

Install dependencies
```bash
$ npm install
```

Local isolated dev environment
```bash
$ npm start
```

Production build
```bash
$ npm run build
```

Running in conjunction with python app
```bash
$ npm run build:development
```

Run tests
```bash
$ npm test
```

Run local rendering service
```bash
$ NODE_ENV=development npm run server
```

## Rendering a React component in Python

### `render_component`

Generate the markup for a React component for server-side rendering. Currently only available inside a python view

#### Arguments

1. `path`: Relative path to component from `static/src`.
2. `props`: Initial state/props for component
3. `to_static_markup`: Whether to return plain markup or React bound markup
4. `request_headers`: Headers to send to node service on render request

#### Returns

`Object`: With either a key for resulting `markup` or a key for `errors`

#### Examples

Rendering basic component:
```python
render_component('App.js', { 'foo': 'bar' })
```
