import React from 'react'
import { ViewWidget } from './View'
import renderer from 'react-test-renderer'

import testData from './View.json'

const View = ViewWidget({ casestudy: testData })

test('VerticalList with required attributes', () => {
  const component = renderer.create(
    <View />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
