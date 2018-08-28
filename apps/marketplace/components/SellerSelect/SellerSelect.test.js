import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import SellerSelect from './SellerSelect'

Enzyme.configure({ adapter: new Adapter() })

let server = ''

test('component mounts with a id attribute for its text input', () => {
  const component = mount(<SellerSelect id="test-1" />)

  expect(
    component
      .find('input[type="text"]')
      .getDOMNode()
      .getAttribute('id')
  ).toEqual('test-1')
  expect(component.find('input[type="text"]').getDOMNode().id).toEqual('test-1')
})

test('component mounts with a placeholder attribute for its text input', () => {
  const component = mount(<SellerSelect placeholder="This is a placeholder" />)

  expect(
    component
      .find('input[type="text"]')
      .getDOMNode()
      .getAttribute('placeholder')
  ).toEqual('This is a placeholder')
})

test('component mounts with a search button by default', () => {
  const component = mount(<SellerSelect />)

  expect(component.find('button')).toHaveLength(1)
})

test('component mounts without a search button when showSearchButton is false', () => {
  const component = mount(<SellerSelect showSearchButton={false} />)

  expect(component.find('button')).toHaveLength(0)
})

describe('tests that generate network requests', () => {
  beforeEach(() => {
    server = sinon.fakeServer.create()
    return server
  })

  afterEach(() => {
    server.restore()
    return server
  })

  test('component sends a network request on input text change when the value is 3 or more chars in length', async () => {
    const component = mount(<SellerSelect />)

    await component
      .find('input[type="text"]')
      .at(0)
      .simulate('change', { target: { value: 'ab' } })
    expect(server.requests.length).toBe(0)

    await component
      .find('input[type="text"]')
      .at(0)
      .simulate('change', { target: { value: 'abc' } })
    expect(server.requests.length).toBe(1)
    expect(server.requests[0].url).toEqual('/api/2/suppliers/search?keyword=abc')
  })
})
