import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'marketplace/store'
import { Provider } from 'react-redux'

import ResetPasswordForm from './ResetPasswordForm'
import RequestResetEmailForm from './RequestResetEmailForm'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

describe('Test suite for ResetPasswordForm component', () => {
  const state = {
    model: 'resetPasswordForm',
    user: {
      resetPasswordEmailFailure: false,
      resetPasswordEmailSuccess: true
    },
    submitClicked: () => true,
    handleSubmit: () => true
  }

  it('CreateUserPage renders without errors', () => {
    const store = configureStore(state)
    const wrapper = shallow(
      <Provider store={store}>
        <ResetPasswordForm {...state} />
      </Provider>
    )
    expect(wrapper).toBeDefined()
  })

  it('Because snapshots', () => {
    const store = configureStore(state)
    const component = renderer.create(
      <Provider store={store}>
        <ResetPasswordForm {...state} />
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Test suite for RequestResetEmailForm component', () => {
  const state = {
    model: 'resetPasswordForm',
    user: {
      resetPasswordSuccess: false,
      getResetDataSuccess: true,
      errorMessage: null
    },
    submitClicked: () => true,
    handleSubmit: () => true
  }

  it('RequestResetEmailForm renders without errors', () => {
    const store = configureStore(state)
    const wrapper = shallow(
      <Provider store={store}>
        <RequestResetEmailForm {...state} />
      </Provider>
    )
    expect(wrapper).toBeDefined()
  })

  it('Because snapshots', () => {
    const store = configureStore(state)
    const component = renderer.create(
      <Provider store={store}>
        <RequestResetEmailForm {...state} />
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
