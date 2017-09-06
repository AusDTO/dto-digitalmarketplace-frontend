import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import ResetPasswordPage from './ResetPasswordPage'

test('Test suite for ResetPasswordPage RequestResetEmailContainer component', () => {
  const state = {
    user: {
      resetPasswordSuccess: true,
      resetPasswordEmailSuccess: true
    }
  }

  it('CreateUserPage renders without errors', () => {
    const wrapper = shallow(<ResetPasswordPage {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snapshots', () => {
    const component = renderer.create(<ResetPasswordPage {...state} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
