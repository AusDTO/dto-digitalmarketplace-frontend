import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'marketplace/store'
import BriefTrainingResponseForm from './BriefTrainingResponseForm'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

const brief = {
  title: 'test',
  id: 1,
  startDate: ''
}

const app = {
  supplierCode: 1
}

const store = configureStore()

describe('BriefTrainingResponseForm', () => {
  test('shows the trainer résumé upload button conditionally', () => {
    const component1 = mount(
      <Provider store={store}>
        <BriefTrainingResponseForm model="test" showTrainerResumes={false} brief={brief} app={app} />
      </Provider>
    )
    expect(component1.find('input[type="file"]').length).toEqual(2)

    const component2 = mount(
      <Provider store={store}>
        <BriefTrainingResponseForm model="test" showTrainerResumes brief={brief} app={app} />
      </Provider>
    )
    expect(component2.find('input[type="file"]').length).toEqual(3)
  })
})
