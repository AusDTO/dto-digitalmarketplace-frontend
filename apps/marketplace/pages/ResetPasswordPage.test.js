import React from 'react'
import expect from 'expect'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import { Provider } from 'react-redux'

import configureStore from '../store'
import { ResetPasswordPageComponent } from './ResetPasswordPage'

jest.mock('shared/Icon/_getIcons')

describe('Test suite for Reset Password Page Container Component', () => {
  const state = {
    user: {
      resetPasswordSuccess: true,
      resetPasswordEmailSuccess: true
    },
    location: { pathname: '/2' },
    match: { url: '/url' }
  }

  const store = configureStore()
  test('ResetPasswordPage renders without errors', () => {
    const renderer = new ReactShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <ResetPasswordPageComponent {...state} />
      </Provider>
    )
    expect(tree).toMatchSnapshot()
  })
})
