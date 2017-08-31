import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import { ResetPasswordForm } from './ResetPasswordForm'
import { RequestResetEmailForm } from './RequestResetEmailForm'

test('Test suite for ResetPasswordForm component', () => {
  let state = {
    user: {
      resetPasswordEmailFailure: false,
      resetPasswordEmailSuccess: true
    },
    submitClicked: () => true,
    handleSubmit: () => true
  }

  it('CreateUserPage renders without errors', () => {
    let wrapper = shallow(<ResetPasswordForm {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snapshots', () => {
    let component = renderer.create(<ResetPasswordForm {...state} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

test('Test suite for RequestResetEmailForm component', () => {
  let state = {
    user: {
      resetPasswordSuccess: false,
      getResetDataSuccess: true,
      errorMessage: null
    },
    submitClicked: () => true,
    handleSubmit: () => true
  }

  it('CreateUserPage renders without errors', () => {
    let wrapper = shallow(<RequestResetEmailForm {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snapshots', () => {
    let component = renderer.create(<RequestResetEmailForm {...state} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
