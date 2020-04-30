import React from 'react'
import expect from 'expect'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import { Provider } from 'react-redux'

import configureStore from '../store'
import LoginPage from './LoginPage'

jest.mock('shared/Icon/_getIcons')

describe('Test suite for LoginPage component', () => {
  const state = {}

  const store = configureStore()
  test('LoginPage renders without errors', () => {
    const renderer = new ReactShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <LoginPage {...state} />
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
