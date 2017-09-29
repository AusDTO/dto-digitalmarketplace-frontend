import React from 'react'
import expect from 'expect'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import { Provider } from 'react-redux'

import configureStore from '../../store'
import RequestResetEmailForm from './RequestResetEmailForm'
import ResetPasswordForm from './ResetPasswordForm'

describe('Test suite for Reset Password Functional Components', () => {
  const state = {
    user: {
      resetPasswordSuccess: true,
      resetPasswordEmailSuccess: true
    },
    userRegistrationDetails: {
      name: 'Jeff Labowski',
      email_address: 'e@mail.com'
    },
    loadCompleteSuccess: true,
    loadRegistrationData: () => true,
    location: { pathname: '/2' },
    match: { url: '/url' },
    handleSubmit: () => true
  }

  const store = configureStore()
  test('RequestResetEmailForm renders without errors', () => {
    const renderer = new ReactShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <RequestResetEmailForm {...state} />
      </Provider>
    )
    expect(tree).toMatchSnapshot()
  })

  test('ResetPasswordForm renders without errors', () => {
    const renderer = new ReactShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <ResetPasswordForm {...state} />
      </Provider>
    )
    expect(tree).toMatchSnapshot()
  })
})
