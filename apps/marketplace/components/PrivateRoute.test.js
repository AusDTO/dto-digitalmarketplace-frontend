import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import configureStore from '../store'
import PrivateRoute from './PrivateRoute'

describe('Test suite for PrivateRoute component', () => {
  test('PrivateRoute renders without errors', () => {
    const myComponent = () => <div>test</div>
    const store = configureStore()

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute path="/" component={myComponent} />
        </MemoryRouter>
      </Provider>
    )

    expect(wrapper).toBeDefined()
  })
})
