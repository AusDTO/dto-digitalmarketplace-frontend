import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import format from 'date-fns/format'
import configureStore from 'marketplace/store'
import { Provider } from 'react-redux'
import { DateComponent } from './DateControl'

Enzyme.configure({ adapter: new Adapter() })

test('closing date control shows correct day, month and year values', () => {
  const state = {}
  const store = configureStore(state)
  const date = new Date()

  const component = mount(
    <Provider store={store}>
      <DateComponent id="test" value={format(date, 'YYYY-MM-DD')} formModel="test" />
    </Provider>
  )

  expect(component.find('input#day').instance().value).toEqual(format(date, 'DD'))
  expect(component.find('input#month').instance().value).toEqual(format(date, 'MM'))
  expect(component.find('input#year').instance().value).toEqual(format(date, 'YYYY'))
})

test('date shows empty inputs on bad input data', () => {
  const state = {}
  const store = configureStore(state)

  const component = mount(
    <Provider store={store}>
      <DateComponent id="test" value="thisisnotarealdate" formModel="test" />
    </Provider>
  )

  expect(component.find('input#day').instance().value).toEqual('')
  expect(component.find('input#month').instance().value).toEqual('')
  expect(component.find('input#year').instance().value).toEqual('')
})

test('date control calls the onDateChange property on value changes', () => {
  const state = {}
  const store = configureStore(state)
  const date = new Date()
  const onDateChange = jest.fn()

  const component = mount(
    <Provider store={store}>
      <DateComponent id="test" value={format(date, 'YYYY-MM-DD')} formModel="test" onDateChange={onDateChange} />
    </Provider>
  )

  component
    .find('input#day')
    .at(0)
    .simulate('blur', { target: { checked: false } })
  component
    .find('input#month')
    .at(0)
    .simulate('blur', { target: { checked: false } })
  component
    .find('input#year')
    .at(0)
    .simulate('blur', { target: { checked: false } })

  expect(onDateChange).toHaveBeenCalledTimes(3)
})
