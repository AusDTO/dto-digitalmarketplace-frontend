import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import { CreateUser } from './CreateUser'

test('Test suite for CreateUser container component', () => {
  let state = {
    userRegistrationDetails: {
      name: 'Jeff Labowski',
      email_address: 'e@mail.com'
    },
    loadCompleteSuccess: true,
    loadRegistrationData: () => true
  }

  it('CreateUser renders without errors', () => {
    let wrapper = shallow(<CreateUser {...state} />)
    expect(wrapper).toExist()
  })

  it('Because snaphots', () => {
    let component = renderer.create(<CreateUser {...state} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
