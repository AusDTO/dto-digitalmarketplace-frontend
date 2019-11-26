import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'marketplace/store'
import BriefSpecialistResponseForm2 from './BriefSpecialistResponseForm2'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

const store = configureStore()

describe('BriefSpecialistResponseForm2', () => {
  test('has initial state when no responses', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseForm2
          brief={{ title: 'test brief', applicationsClosedAt: '1/15/2018', numberOfSuppliers: '3' }}
          briefResponseStatus="draft"
          specialistNumber={1}
          briefResponseForm={{
            attachedDocumentURL: [],
            availability: '',
            specialistName: '',
            specialistGivenNames: '',
            specialistSurname: '',
            dayRate: '',
            dayRateExcludingGST: '',
            hourRate: '',
            hourRateExcludingGST: '',
            essentialRequirements: {},
            niceToHaveRequirements: {},
            respondToEmailAddress: '',
            visaStatus: '',
            securityClearance: '',
            previouslyWorked: ''
          }}
        />
      </Provider>
    )
    expect(
      tree
        .find('h1')
        .first()
        .text()
    ).toEqual('Submit candidate for ‘test brief’')
    expect(
      tree
        .find('input.au-btn')
        .first()
        .props().value
    ).toEqual('Submit candidate')
  })

  test('has initial state when no responses', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseForm2
          brief={{ title: 'test brief', applicationsClosedAt: '1/15/2018', numberOfSuppliers: '1' }}
          briefResponseStatus="draft"
          specialistNumber={1}
          briefResponseForm={{
            attachedDocumentURL: [],
            availability: '',
            specialistName: '',
            specialistGivenNames: '',
            specialistSurname: '',
            dayRate: '',
            dayRateExcludingGST: '',
            hourRate: '',
            hourRateExcludingGST: '',
            essentialRequirements: {},
            niceToHaveRequirements: {},
            respondToEmailAddress: '',
            visaStatus: '',
            securityClearance: '',
            previouslyWorked: ''
          }}
        />
      </Provider>
    )
    expect(
      tree
        .find('h1')
        .first()
        .text()
    ).toEqual('Submit candidate for ‘test brief’')
    expect(
      tree
        .find('input.au-btn')
        .first()
        .props().value
    ).toEqual('Submit candidate')
  })

  test('does not display add another button on last specialist', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseForm2
          specialistGivenNames="John"
          specialistSurname="Doe"
          specialistNumber={3}
          app={{ supplierCode: 1 }}
          brief={{ numberOfSuppliers: '3' }}
          briefResponseStatus="submitted"
          briefResponseForm={{
            attachedDocumentURL: [],
            availability: '',
            specialistName: '',
            specialistGivenNames: '',
            specialistSurname: '',
            dayRate: '',
            dayRateExcludingGST: '',
            hourRate: '',
            hourRateExcludingGST: '',
            essentialRequirements: {},
            niceToHaveRequirements: {},
            respondToEmailAddress: '',
            visaStatus: '',
            securityClearance: '',
            previouslyWorked: ''
          }}
        />
      </Provider>
    )

    expect(tree.find('input.au-btn').length).toEqual(1)
    expect(
      tree
        .find('input.au-btn')
        .first()
        .props().value
    ).toEqual('Update candidate')
  })
})
