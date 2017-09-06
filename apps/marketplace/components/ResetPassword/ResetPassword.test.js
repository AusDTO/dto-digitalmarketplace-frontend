import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import { ResetPasswordForm } from './ResetPasswordForm'
import { RequestResetEmailForm } from './RequestResetEmailForm'

test('Test suite for ResetPasswordForm component', () => {
  const state = {
    user: {
      resetPasswordEmailFailure: false,
      resetPasswordEmailSuccess: true
    },
    submitClicked: () => true,
    handleSubmit: () => true
  }

  it('CreateUserPage renders without errors', () => {
    const wrapper = shallow(<ResetPasswordForm {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snapshots', () => {
    const component = renderer.create(<ResetPasswordForm {...state} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

test('Test suite for RequestResetEmailForm component', () => {
  const state = {
    user: {
      resetPasswordSuccess: false,
      getResetDataSuccess: true,
      errorMessage: null
    },
    submitClicked: () => true,
    handleSubmit: () => true
  }

  it('CreateUserPage renders without errors', () => {
    const wrapper = shallow(<RequestResetEmailForm {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snapshots', () => {
    const component = renderer.create(<RequestResetEmailForm {...state} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
