import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import UserOnboarding from './UserOnboarding'

test('Test suite for UserOnboarding container component', () => {
  let state = {
    userRegistrationDetails: {
      name: 'Jeff Labowski',
      email_address: 'e@mail.com'
    },
    loadCompleteSuccess: true,
    loadRegistrationData: () => true
  }

  it('UserOnboarding renders without errors', () => {
    let wrapper = shallow(<UserOnboarding {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snaphots', () => {
    let component = renderer.create(<UserOnboarding {...state} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
