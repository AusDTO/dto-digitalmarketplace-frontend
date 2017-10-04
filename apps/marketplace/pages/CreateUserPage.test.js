import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { MemoryRouter } from 'react-router-dom'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'marketplace/store'
import { Provider } from 'react-redux'

import CreateUserPage from './CreateUserPage'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

describe('Test suite for CreateUserPage page', () => {
  const state = {
    userRegistrationDetails: {
      name: 'Jeff Labowski',
      email_address: 'e@mail.com'
    },
    loadCompleteSuccess: true,
    loadRegistrationData: () => true
  }

  it('CreateUserPage renders without errors', () => {
    const store = configureStore(state)

    const wrapper = shallow(
      <Provider store={store}>
        <MemoryRouter>
          <CreateUserPage {...state} />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper).toBeDefined()
  })

  it('Because snaphots', () => {
    const store = configureStore(state)
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CreateUserPage {...state} />
        </MemoryRouter>
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
