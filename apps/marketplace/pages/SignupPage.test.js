import React from 'react'
import expect from 'expect'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import { Provider } from 'react-redux'

import configureStore from '../store'
import SignupPage from './SignupPage'

jest.mock('shared/Icon/_getIcons')

describe('Test suite for SignupPage component', () => {
  const state = {}

  const store = configureStore()
  test('SignupPage renders without errors', () => {
    const renderer = new ReactShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <SignupPage {...state} />
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
