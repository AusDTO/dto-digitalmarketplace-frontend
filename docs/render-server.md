## Render Server

As highlighted in other [docs](/docs/cheatsheet.md) you can use this server in either development or production mode.

There is one route exposed from this service is: `/render`.

It only accepts a `POST` request.

Example request:

```bash
curl \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"path":"bundles/HelloWorld/HelloWorldWidget.js", "serializedProps": "{\"_serverContext\":{\"location\":\"/\"}}"}' \
  https://dm-dev-frontend.apps.staging.digital.gov.au/render
```

Available `POST` options:

* path - Filepath to bundle, relative from `src/`
* serializedProps - the initial state or props for the bundle
* toStaticMarkup - call `renderToStaticMarkup` instead, renders without react bindings

Response:
```js
{
  "markup": "<h1 data-reactroot=\"\" data-reactid=\"1\" data-react-checksum=\"55251490\">Hello World</h1>",
  "slug":"helloworld",
  "files": {
    "helloworld":"helloworld.js",
    "vendor":"vendor.2947c279.js", 
    "stylesheet":"helloworld.css"
  }
}
```

### `markup: String`
The compiled markup based on `serializedProps` of the requested bundle.

### `slug: String`
The `slug/id` of this bundle, used internally for setting up unique elements for rendering.

### `files: Object`
A dictionary of assets required for the client to render. Usually comes with a `vendor` file, the bundle javascript and the CSS module that belongs to the widget. These are only file names, could be improved to provide qualified URLs.

