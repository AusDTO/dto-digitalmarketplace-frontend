import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'marketplace/store'
import BriefSpecialistResponseForm from './BriefSpecialistResponseForm'

Enzyme.configure({ adapter: new Adapter() })

const store = configureStore()
  
describe('BriefSpecialistResponseForm', () => {
  test('has initial state when no responses', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseForm
          brief={{ title: 'test brief', applicationsClosedAt: '1/15/2018' }}
          specialistNumber="1"
        />
      </Provider>
    )
    expect(tree.find('h1').first().text()).toEqual('Apply for ‘test brief’')
    expect(tree.contains(<div>You can add 3 specialists. This opportunity closes on 15/01/2018.</div>)).toBeTruthy()
    expect(tree.contains(<strong>Specialist 1</strong>)).toBeTruthy()
    expect(tree.find('input.uikit-btn').first().props().value).toEqual('Start application')
  })

  test('displays progress when responses added', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseForm briefResponses={[{}]} />
      </Provider>
    )
    expect(tree.find('input.uikit-btn').first().props().value).toEqual('Continue')
  })

  test('displays questions when specialist name entered', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseForm
          specialistName="John Doe"
          specialistNumber="1"
          app={{supplierCode: 1}}
        />
      </Provider>
    )

    expect(tree.find('h1').first().text()).toEqual('John Doe')
    expect(tree.find('div.stepTitle').first().text()).toEqual('Specialist 1 of 3')
    expect(tree.find('input.uikit-btn').first().props().value).toEqual('Submit specialist')
    expect(tree.find('input.uikit-btn').at(1).props().value).toEqual('Submit and add another')
  })

  test('does not display add another button on last specialist', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseForm
          specialistName="John Doe"
          specialistNumber="3"
          app={{supplierCode: 1}}
        />
      </Provider>
    )

    expect(tree.find('div.stepTitle').first().text()).toEqual('Specialist 3 of 3')
    expect(tree.find('input.uikit-btn').length).toEqual(1)
    expect(tree.find('input.uikit-btn').first().props().value).toEqual('Submit specialist')
  })
})
