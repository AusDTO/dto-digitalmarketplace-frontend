import ComponentRenderer from './ComponentRenderer'

const helloWorldWidgetPath = 'bundles/HelloWorld/HelloWorldWidget.js'

test('ComponentRenderer renders static markup', () => {
  const component = new ComponentRenderer(helloWorldWidgetPath)
  const markup = component.render({ _serverContext: { location: '/' } }, true)

  expect(markup).toEqual('<h1>Hello World</h1>')
})

test('ComponentRenderer renders react-bound markup', () => {
  const component = new ComponentRenderer(helloWorldWidgetPath)
  const markup = component.render({ _serverContext: { location: '/' } }, false)

  expect(markup).toEqual('<h1 data-reactroot="" data-reactid="1" data-react-checksum="55251490">Hello World</h1>')
})

test('ComponentRenderer renders static markup with props', () => {
  const component = new ComponentRenderer(helloWorldWidgetPath)
  const markup = component.render({ _serverContext: { location: '/' }, id: 'hello-world' }, true)

  expect(markup).toEqual('<h1 id="hello-world">Hello World</h1>')
})

test('ComponentRenderer throws error on bad path', () => {
  expect(() => {
    new ComponentRenderer('bad/path/to/HelloWorldWidget.js')
  }).toThrowError('Cannot find module \'../src/bad/path/to/HelloWorldWidget.js\' from \'ComponentRenderer.js\'')
})

test('ComponentRenderer throws error on path with no module', () => {
  expect(() => {
    new ComponentRenderer('__mocks__/badModule')
  }).toThrowError('File did not export anything: \'__mocks__/badModule\'')

})
