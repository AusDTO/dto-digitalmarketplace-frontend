import React from 'react'
import renderer from 'react-test-renderer'

import LinkInput from './LinkInput'

test('LinkInput with no props', () => {
  const component = renderer.create(
    <LinkInput name="test" />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('LinkInput with 4 rows', () => {
  const rows = [ 'One', 'Two', 'Three', 'Four' ];
  const component = renderer.create(
    <LinkInput name="test" rows={rows} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('LinkInput with 4 default rows', () => {
  const component = renderer.create(
    <LinkInput name="test" defaultRows={4} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
