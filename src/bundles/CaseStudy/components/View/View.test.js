import React from 'react'
import View from './View'
import renderer from 'react-test-renderer'

import sampleState from './View.json'
import createStore from '../../redux/create'
const store = createStore({ _serverContext: {}, casestudy: sampleState })


test('VerticalList with required attributes', () => {
  const component = renderer.create(
    <View store={store} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
