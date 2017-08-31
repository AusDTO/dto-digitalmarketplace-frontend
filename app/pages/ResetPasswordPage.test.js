import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import ResetPasswordPage from './ResetPasswordPage'

test('Test suite for ResetPasswordPage RequestResetEmailContainer component', () => {
  let state = {
    user: {
      resetPasswordSuccess: true,
      resetPasswordEmailSuccess: true
    }
  }

  it('CreateUserPage renders without errors', () => {
    let wrapper = shallow(<ResetPasswordPage {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snapshots', () => {
    let component = renderer.create(<ResetPasswordPage {...state} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
