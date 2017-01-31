## Testing

Frameworks:
* [Jest](https://facebook.github.io/jest/)
* [Enzyme](https://github.com/airbnb/enzyme)
* [WebdriverIO](http://webdriver.io/)
  * [wdio-mocha-framework](https://github.com/webdriverio/wdio-mocha-framework)

### Unit testing

We use a combination of Jest and Enzyme for uniting test our React components, event handlers and various utility helpers.

The typical convention we follow is test files sit along side the file they are testing, example:

```
├── file.js
└── file.test.js
```

We opt to use the tap style of testing over the traditional mocha/jasmine styles

```js
test('description of test', () => {
  expect(true).toEqual(true)
});
```

### Integration testing

We utilise the `wdio` CLI tool to run these tests. It has built integration with browser stack, which are to be run on CI and locally it points to standalone selenium. These tests are to run against the staging environment. There is more information over at the wdio website and our [own configuration](/wdio.conf.js)

