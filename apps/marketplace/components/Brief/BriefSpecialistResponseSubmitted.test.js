import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'marketplace/store'
import BriefSpecialistResponseSubmitted from './BriefSpecialistResponseSubmitted'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

const store = configureStore()

describe('BriefSpecialistResponseSubmitted', () => {
  test('shows button when 1 submitted response', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseSubmitted briefResponses={['test']} brief={{ applicationsClosedAt: '3/15/2018' }} />
      </Provider>
    )

    expect(tree.contains(<strong>You have submitted 1 specialist for this opportunity.</strong>)).toBeTruthy()
    expect(tree.contains(<p>You can submit 2 more before the closing date (March 15th, 2018)</p>)).toBeTruthy()
    expect(tree.find('a.au-btn').first().text()).toEqual('Add another specialist')
  })

  test('does not shows button when 3 submitted responses', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseSubmitted
          briefResponses={['test', 'test', 'test']}
          brief={{ applicationsClosedAt: '3/15/2018' }}
        />
      </Provider>
    )

    expect(tree.contains(<strong>You have submitted 3 specialists for this opportunity.</strong>)).toBeTruthy()
    expect(tree.contains(<p>This opportunity closes on March 15th, 2018</p>)).toBeTruthy()
    expect(tree.find('a.au-btn').exists()).toBeFalsy()
  })
})
