import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'marketplace/store'
import { Provider } from 'react-redux'
import { SelectedSellers } from './SelectedSellersControl'

Enzyme.configure({ adapter: new Adapter() })

test('selected sellers shows sellers from value property', () => {
  const state = {}
  const store = configureStore(state)
  const value = {
    122: { name: 'Seller 1' },
    981: { name: 'Seller 2' }
  }

  const component = mount(
    <Provider store={store}>
      <SelectedSellers id="test" value={value} formModel="test" />
    </Provider>
  )

  expect(component.find('ul#test').length).toEqual(1)
  expect(component.find('ul#test li').length).toEqual(2)
  expect(
    component
      .find('ul#test li')
      .at(0)
      .text()
  ).toEqual('Seller 1Remove')
})

test('selected sellers shows nothing with empty value', () => {
  const state = {}
  const store = configureStore(state)
  const value = {}

  const component = mount(
    <Provider store={store}>
      <SelectedSellers id="test" value={value} formModel="test" />
    </Provider>
  )

  expect(component.find('ul#test').length).toEqual(0)
  expect(component.text()).toEqual('')
})

test('selected sellers remove click calls the onRemoveClick property', () => {
  const state = {}
  const store = configureStore(state)
  const onRemoveClick = jest.fn()
  const value = {
    122: { name: 'Seller 1' },
    981: { name: 'Seller 2' }
  }

  const component = mount(
    <Provider store={store}>
      <SelectedSellers id="test" value={value} formModel="test" onRemoveClick={onRemoveClick} />
    </Provider>
  )

  component
    .find('ul#test li a')
    .at(0)
    .simulate('click')

  expect(onRemoveClick).toHaveBeenCalledTimes(1)
  expect(onRemoveClick).toHaveBeenCalledWith('122')
})
