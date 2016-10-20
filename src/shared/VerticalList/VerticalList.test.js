import React from 'react'
import VerticalList from './VerticalList'
import renderer from 'react-test-renderer'

import testData from './VerticalList.json'

test('VerticalList with required attributes', () => {
  const component = renderer.create(
    <VerticalList items={testData.requiredItems} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('VerticalList with all attributes', () => {
  const component = renderer.create(
    <VerticalList items={testData.items} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('VerticalList with no attributes', () => {
  const component = renderer.create(
    <VerticalList />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
