import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import { RequestResetEmailContainer, ResetPasswordContainer } from './ResetPasswordPage'

test('Test suite for ResetPasswordPage RequestResetEmailContainer component', () => {
  let state = {
    user: {
      resetPasswordEmailFailure: false,
      resetPasswordEmailSuccess: true
    },
    submitClicked: () => true,
    handleSubmit: () => true
  }

  it('CreateUserPage renders without errors', () => {
    let wrapper = shallow(<RequestResetEmailContainer {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snapshots', () => {
    let component = renderer.create(<RequestResetEmailContainer {...state} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

test('Test suite for ResetPasswordPage ResetPasswordContainer component', () => {
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
    let wrapper = shallow(<ResetPasswordContainer {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snapshots', () => {
    let component = renderer.create(<ResetPasswordContainer {...state} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
