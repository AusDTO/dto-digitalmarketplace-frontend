import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import CreateUserForm from './CreateUserForm'

jest.mock('react-dom')

describe('Test suite for CreateUserForm component', () => {
  const state = {
    initialState: {
      name: 'Jeff Labowski',
      email_address: 'e@mail.com',
      user_type: 'buyer'
    },
    loadInitialData: () => state.initialState,
    form: { valid: true }
  }

  it('UserComponent should exist', () => {
    const wrapper = shallow(<CreateUserForm {...state} />)
    expect(wrapper).toExist()
  })
})
