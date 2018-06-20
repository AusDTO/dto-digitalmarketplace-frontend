import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'marketplace/store'
import BriefInviteAssessorsForm from './BriefInviteAssessorsForm'

Enzyme.configure({ adapter: new Adapter() })

const store = configureStore()

describe('BriefInviteAssessorForm', () => {
  test('has initial empty state', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefInviteAssessorsForm />
      </Provider>
    )

    expect(tree.contains(<p>You have no evaluators added.</p>)).toBeTruthy()
  })

  test('displays an assessor', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefInviteAssessorsForm assessors={['test@test.com']} remainingCount={4} />
      </Provider>
    )

    expect(tree.contains(<p>You have no evaluators added.</p>)).toBeFalsy()
    expect(tree.contains('test@test.com')).toBeTruthy()
    expect(tree.contains('(4 remaining)')).toBeTruthy()
  })
})
