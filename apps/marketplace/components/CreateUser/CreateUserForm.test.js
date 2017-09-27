import React from 'react'
import expect from 'expect'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CreateUserForm from './CreateUserForm'

jest.mock('react-dom')
Enzyme.configure({ adapter: new Adapter() })

describe.skip('Test suite for CreateUserForm component', () => {
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
    expect(wrapper).toBeDefined()
  })
})
