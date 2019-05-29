import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'marketplace/store'
import BriefSpecialistResponseForm2 from './BriefSpecialistResponseForm2'

Enzyme.configure({ adapter: new Adapter() })

const store = configureStore()

describe('BriefSpecialistResponseForm2', () => {
  test('has initial state when no responses', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseForm2
          brief={{ title: 'test brief', applicationsClosedAt: '1/15/2018', numberOfSuppliers: '3' }}
          specialistNumber={1}
        />
      </Provider>
    )
    expect(
      tree
        .find('h1')
        .first()
        .text()
    ).toEqual('Apply for ‘test brief’')
    expect(
      tree.contains(<p>You can submit up to 3 candidates for this role. This opportunity closes on 15-01-2018.</p>)
    ).toBeTruthy()
    expect(tree.contains(<strong>Candidate 1</strong>)).toBeTruthy()
    expect(
      tree
        .find('input.au-btn')
        .first()
        .props().value
    ).toEqual('Start application')
  })

  test('has initial state when no responses', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseForm2
          brief={{ title: 'test brief', applicationsClosedAt: '1/15/2018', numberOfSuppliers: '1' }}
          specialistNumber={1}
        />
      </Provider>
    )
    expect(
      tree
        .find('h1')
        .first()
        .text()
    ).toEqual('Apply for ‘test brief’')
    expect(
      tree.contains(<p>You can submit up to 1 candidate for this role. This opportunity closes on 15-01-2018.</p>)
    ).toBeTruthy()
    expect(tree.contains(<strong>Candidate 1</strong>)).toBeTruthy()
    expect(
      tree
        .find('input.au-btn')
        .first()
        .props().value
    ).toEqual('Start application')
  })

  test('displays progress when responses added', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseForm2 briefResponses={[{}]} />
      </Provider>
    )
    expect(
      tree
        .find('input.au-btn')
        .first()
        .props().value
    ).toEqual('Continue')
  })

  test('displays questions when specialist name entered', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseForm2
          specialistGivenNames="John"
          specialistSurname="Doe"
          specialistNumber={1}
          app={{ supplierCode: 1 }}
          brief={{ numberOfSuppliers: '3' }}
        />
      </Provider>
    )

    expect(
      tree
        .find('h1')
        .first()
        .text()
    ).toEqual('John Doe')
    expect(
      tree
        .find('div.stepTitle')
        .first()
        .text()
    ).toEqual('Specialist 1 of 3')
    expect(
      tree
        .find('input.au-btn')
        .first()
        .props().value
    ).toEqual('Submit specialist')
    expect(
      tree
        .find('input.au-btn')
        .at(1)
        .props().value
    ).toEqual('Submit and add another')
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
        />
      </Provider>
    )

    expect(
      tree
        .find('div.stepTitle')
        .first()
        .text()
    ).toEqual('Specialist 3 of 3')
    expect(tree.find('input.au-btn').length).toEqual(1)
    expect(
      tree
        .find('input.au-btn')
        .first()
        .props().value
    ).toEqual('Submit specialist')
  })
})
