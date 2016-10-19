import React from 'react'
import renderer from 'react-test-renderer'

import MultiInput from './MultiInput'

test('MultiInput with no props', () => {
  const component = renderer.create(
    <MultiInput name="test" />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('MultiInput with 4 rows', () => {
  const rows = [
    { id: 0, value: 'One' },
    { id: 1, value: 'Two' },
    { id: 2, value: 'Three' },
    { id: 3, value: 'Four' },
  ];

  const component = renderer.create(
    <MultiInput name="test" rows={rows} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('MultiInput with 4 default rows', () => {
  const component = renderer.create(
    <MultiInput name="test" defaultRows={4} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
