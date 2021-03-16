import React from 'react'
import expect from 'expect'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import { Provider } from 'react-redux'

import configureStore from '../store'
import LoginForm from './LoginForm'

jest.mock('shared/Icon/_getIcons')

describe('Test suite for LoginForm component', () => {
  const state = {
    submitClicked: () => true,
    handleSubmit: () => true,
    model: 'loginForm'
  }

  const store = configureStore()
  test('LoginForm renders without errors', () => {
    const renderer = new ReactShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <LoginForm {...state} />
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
