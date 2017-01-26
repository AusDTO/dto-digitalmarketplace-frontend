## Creating a bundle/widget

As mentioned in [Getting started](/README.md) a bundle/widget is just an alias for a webpack entry point.

All entry points are defined in `config/paths.js`, below is a snippet of what an entry point will look like

```js
entryPoints: {
  'helloworld': [resolveApp('src/bundles/HelloWorld/HelloWorldWidget')]
}
```

The `entryPoints` object consists of two important pieces: `{ slug: [ path ] }`. The slug (aka id), is used internally by the [component registry](/docs/RegisterComponent.md) to build up unique identifiers and link up assets and files.

You may also provide a mock to this entry point which will be passed in as initial state to this bundle when loaded in the [Local Environment](/README.md#local-development). This configuration can also be found in `config/paths.js`, right below `entryPoints`.

```js
entryPointMocks: {
  'helloworld': require(resolveApp('src/bundles/HelloWorld/HelloWorldWidget.json'))
}
```

The key of this object must match the slug provided in `entryPoints` for the two to be linked correctly.

There is a plethora of examples configured already, which may provide better 'real world examples'.

### Avoiding longer build times with bundles

Another feature of both build pipelines (local and integrated) is you may specify which bundle to compile. This will generate all the necessary assets this bundle will need to load.

To compile only one bundle in the Integrated environment simply run:
```bash
$ yarn build:development -- --bundle <slug>
```

`<slug>` being the key you have specified in the `entryPoints` above.

For the local environment:
```bash
$ yarn start -- --bundle <bundle-slug>
```