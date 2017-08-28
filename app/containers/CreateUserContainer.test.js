import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import { CreateUserContainer } from './CreateUserContainer'

test('Test suite for CreateUserContainer container component', () => {
  let state = {
    userRegistrationDetails: {
      name: 'Jeff Labowski',
      email_address: 'e@mail.com'
    },
    loadCompleteSuccess: true,
    loadRegistrationData: () => true
  }

  it('CreateUserContainer renders without errors', () => {
    let wrapper = shallow(<CreateUserContainer {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snaphots', () => {
    let component = renderer.create(<CreateUserContainer {...state} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
