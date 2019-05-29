import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'marketplace/store'
import BriefResponseSubmittedSummary2 from './BriefResponseSubmittedSummary2'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

const store = configureStore()

describe('BriefResponseSubmittedSummary2', () => {
  test('does not show evaluation types', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefResponseSubmittedSummary2 brief={{ applicationsClosedAt: '1/14/2018' }} />
      </Provider>
    )
    expect(
      tree.contains(
        <p>
          The buyer will get in contact after <b>January 14th, 2018</b> to organise next steps.
        </p>
      )
    ).toBeTruthy()
  })
})
