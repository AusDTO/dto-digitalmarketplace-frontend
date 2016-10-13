import React from 'react'
import VerticalList from './VerticalList'
import renderer from 'react-test-renderer'

const requiredItems = [
  { title: 'Hello World', link: 'http://hello.world' }
]

const items = [
  {
    title: 'Hello World',
    link: 'http://hello.world',
    meta: '<time datetime="2016-05-08 00:00">08 May 2016</time> <a href="#" rel="author">Author</a>',
    description: 'The Digital Transformation Office (DTO) was established as an executive agency in July 2015. Its mission is to lead the […]',
    figure: {
      src: '/img-placeholder.gif',
      alt: 'Default image for items without an image specified'
    }
  }
]

test('VerticalList with required attributes', () => {
  const component = renderer.create(
    <VerticalList items={requiredItems} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('VerticalList with all attributes', () => {
  const component = renderer.create(
    <VerticalList items={items} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
