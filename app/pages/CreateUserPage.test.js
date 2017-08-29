import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import { CreateUserPage } from './CreateUserPage'

test('Test suite for CreateUserPage page', () => {
  let state = {
    userRegistrationDetails: {
      name: 'Jeff Labowski',
      email_address: 'e@mail.com'
    },
    loadCompleteSuccess: true,
    loadRegistrationData: () => true
  }

  it('CreateUserPage renders without errors', () => {
    let wrapper = shallow(<CreateUserPage {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snaphots', () => {
    let component = renderer.create(<CreateUserPage {...state} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
