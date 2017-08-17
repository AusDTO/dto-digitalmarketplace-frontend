jest.mock('react-dom')
import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { CreateUserForm } from './CreateUserForm'

describe('Test suite for CreateUserForm component', () => {
  let state = {
    initialState: {
      name: 'Jeff Labowski',
      email_address: 'e@mail.com',
      user_type: 'buyer'
    },
    loadInitialData: () => state.initialState,
    form: { valid: true }
  }

  it('UserComponent should exist', () => {
    let wrapper = shallow(<CreateUserForm {...state} />)
    expect(wrapper).toExist()
  })
})
