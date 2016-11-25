## Marketplace Buyer React frontend

### Getting started for local dev

Install yarn
```bash
$ npm i -g yarn
```

Install dependencies
```bash
$ yarn install
```

Run local environment
```bash
$ yarn start
```

Run tests
```bash
$ yarn test
```

### Running the server side rendering service

_Note: This is only needed for server side rendering, not required for local development._

Install dependencies
```bash
$ yarn install
```

Generate the assets
```bash
$ yarn build
```

Run local rendering service
```bash
$ yarn server
```


### Generate production assets

Run:
```bash
$ yarn build
```

### Generate development assets

This is handy when running the server locally for integration.

Run:
```bash
$ yarn build:development
```

This command also accepts the `bundle` argument

```bash
$ yarn build:development -- --bundle <bundle-slug>
```

To run a hot reload server run:
```
yarn server:development
```

### Compile only one bundle

Helpful when you're trying to run an isolated bundle.

Run:
```bash
$ yarn start -- --bundle <bundle-slug>
```

