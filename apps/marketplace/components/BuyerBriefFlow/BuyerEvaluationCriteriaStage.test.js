import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'marketplace/store'
import { Provider } from 'react-redux'
import { actions } from 'react-redux-form'
import BuyerEvaluationCriteriaStage, { weightingsAddUpTo100Essential } from './BuyerEvaluationCriteriaStage'

Enzyme.configure({ adapter: new Adapter() })

test('include weightings checkbox adds the weightings inputs', () => {
  const essentialRequirements = [{ criteria: '', weighting: '' }]
  const niceToHaveRequirements = []
  const state = {
    BuyerSpecialistForm: {
      essentialRequirements,
      niceToHaveRequirements
    }
  }
  const store = configureStore(state)

  const component = mount(
    <Provider store={store}>
      <BuyerEvaluationCriteriaStage
        model="BuyerSpecialistForm"
        BuyerSpecialistForm={state.BuyerSpecialistForm}
        formButtons={<br />}
      />
    </Provider>
  )

  component
    .find('input#includeWeightingsEssential')
    .at(0)
    .simulate('change', { target: { checked: true } })
  expect(component.find('input#essential_weighting_0').length).toEqual(1)
})

test('disabling weightings clears the current weighting values', () => {
  const essentialRequirements = [{ criteria: 'this', weighting: '50' }, { criteria: 'that', weighting: '50' }]
  const state = {
    BuyerSpecialistForm: {
      essentialRequirements,
      niceToHaveRequirements: []
    }
  }
  const store = configureStore(state)

  const component = mount(
    <Provider store={store}>
      <BuyerEvaluationCriteriaStage
        model="BuyerSpecialistForm"
        BuyerSpecialistForm={state.BuyerSpecialistForm}
        formButtons={<br />}
      />
    </Provider>
  )

  component
    .find('input#includeWeightingsEssential')
    .at(0)
    .simulate('change', { target: { checked: true } })
    .simulate('click')
  expect(component.find('input#essential_weighting_0').instance().value).toEqual('50')
  expect(component.find('input#essential_weighting_1').instance().value).toEqual('50')

  component
    .find('input#includeWeightingsEssential')
    .at(0)
    .simulate('change', { target: { checked: false } })
    .simulate('click')
  expect(component.find('input#essential_weighting_0').length).toEqual(0)
  expect(component.find('input#essential_weighting_1').length).toEqual(0)

  component
    .find('input#includeWeightingsEssential')
    .at(0)
    .simulate('change', { target: { checked: true } })
    .simulate('click')
  expect(component.find('input#essential_weighting_0').instance().value).toEqual('50')
  expect(component.find('input#essential_weighting_1').instance().value).toEqual('50')
})

test('removing a criteria', () => {
  const essentialRequirements = [{ criteria: 'this', weighting: '75' }, { criteria: 'that', weighting: '25' }]
  const state = {
    BuyerSpecialistForm: {
      essentialRequirements,
      includeWeightingsEssential: true
    }
  }
  const store = configureStore()
  store.dispatch(
    actions.change(`BuyerSpecialistForm.essentialRequirements`, state.BuyerSpecialistForm.essentialRequirements)
  )
  store.dispatch(
    actions.change(
      `BuyerSpecialistForm.includeWeightingsEssential`,
      state.BuyerSpecialistForm.includeWeightingsEssential
    )
  )

  const component = mount(
    <Provider store={store}>
      <BuyerEvaluationCriteriaStage
        model="BuyerSpecialistForm"
        BuyerSpecialistForm={state.BuyerSpecialistForm}
        formButtons={<br />}
      />
    </Provider>
  )

  component
    .find('a[href="#remove"]')
    .at(0)
    .simulate('click')

  expect(component.find('textarea#essential_criteria_0').instance().value).toEqual('that')
  expect(component.find('input#essential_weighting_0').instance().value).toEqual('25')
})

test('adding a criteria', () => {
  const essentialRequirements = [{ criteria: 'this', weighting: '75' }, { criteria: 'that', weighting: '25' }]
  const state = {
    BuyerSpecialistForm: {
      essentialRequirements,
      includeWeightingsEssential: true
    }
  }
  const store = configureStore()
  store.dispatch(
    actions.change(`BuyerSpecialistForm.essentialRequirements`, state.BuyerSpecialistForm.essentialRequirements)
  )
  store.dispatch(
    actions.change(
      `BuyerSpecialistForm.includeWeightingsEssential`,
      state.BuyerSpecialistForm.includeWeightingsEssential
    )
  )

  const component = mount(
    <Provider store={store}>
      <BuyerEvaluationCriteriaStage
        model="BuyerSpecialistForm"
        BuyerSpecialistForm={state.BuyerSpecialistForm}
        formButtons={<br />}
      />
    </Provider>
  )

  component
    .find('a[href="#add"]')
    .at(0)
    .simulate('click')

  expect(component.find('textarea#essential_criteria_2').instance().value).toEqual('')
  expect(component.find('input#essential_weighting_2').instance().value).toEqual('')
})

test('weightingsAddUpTo100 correctly determines whether the weightings add up to 100, or are not present', () => {
  const goodWeightings = {
    includeWeightingsEssential: true,
    essentialRequirements: [{ weighting: 25 }, { weighting: 75 }]
  }
  const badWeightings1 = { includeWeightingsEssential: true, essentialRequirements: [{ weighting: 90 }] }
  const badWeightings2 = {
    includeWeightingsEssential: true,
    essentialRequirements: [{ weighting: 50 }, { weighting: 51 }]
  }
  const noWeightings = { includeWeightingsEssential: false, essentialRequirements: [] }

  expect(weightingsAddUpTo100Essential(goodWeightings)).toBeTruthy()
  expect(weightingsAddUpTo100Essential(badWeightings1)).toBeFalsy()
  expect(weightingsAddUpTo100Essential(badWeightings2)).toBeFalsy()
  expect(weightingsAddUpTo100Essential(noWeightings)).toBeTruthy()
})
