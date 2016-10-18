import React from 'react'
import renderer from 'react-test-renderer'

import Textarea from './Textarea'

test('Textarea with no words, no limit', () => {
  const component = renderer.create(
    <Textarea />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Textarea with limit 100, no words', () => {
  const component = renderer.create(
    <Textarea limit={100} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Textarea with limit 100, 10 words', () => {
  const component = renderer.create(
    <Textarea limit={100} value="1 2 3 4 5 6 7 8 9 10" />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Textarea with limit 5, 10 words', () => {
  const component = renderer.create(
    <Textarea limit={5} value="1 2 3 4 5 6 7 8 9 10" />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
