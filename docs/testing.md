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


### Troubleshooting

If you encounter this error running the test script:
```
> react-scripts test --env=jsdom
Determining test suites to run...2016-10-07 11:38 node[873] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2016-10-07 11:38 node[873] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
events.js:160
      throw er; // Unhandled 'error' event
      ^

Error: Error watching file for changes: EMFILE
    at exports._errnoException (util.js:953:11)
    at FSEvent.FSWatcher._handle.onchange (fs.js:1400:11)
npm ERR! Test failed.  See above for more details.
```
`brew install watchman` should fix it
[See create-react-app issue](https://github.com/facebookincubator/create-react-app/issues/871)
