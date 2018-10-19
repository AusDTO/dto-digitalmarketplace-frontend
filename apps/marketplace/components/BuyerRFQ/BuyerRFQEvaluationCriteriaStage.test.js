import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'marketplace/store'
import { Provider } from 'react-redux'
import BuyerRFQEvaluationCriteriaStage, { weightingsAddUpTo100 } from './BuyerRFQEvaluationCriteriaStage'

Enzyme.configure({ adapter: new Adapter() })

test('include weightings checkbox adds the weightings inputs', () => {
  const evaluationCriteria = [{ criteria: '', weighting: '' }]
  const state = {
    BuyerRFQForm: {
      evaluationCriteria
    }
  }
  const store = configureStore(state)

  const component = mount(
    <Provider store={store}>
      <BuyerRFQEvaluationCriteriaStage model="BuyerRFQForm" BuyerRFQForm={state.BuyerRFQForm} />
    </Provider>
  )

  component
    .find('input#include_weightings')
    .at(0)
    .simulate('change', { target: { checked: true } })
  expect(component.find('input#weighting_0').length).toEqual(1)
})

test('disabling weightings clears the current weighting values', () => {
  const evaluationCriteria = [{ criteria: 'this', weighting: '50' }, { criteria: 'that', weighting: '50' }]
  const state = {
    BuyerRFQForm: {
      evaluationCriteria
    }
  }
  const store = configureStore(state)

  const component = mount(
    <Provider store={store}>
      <BuyerRFQEvaluationCriteriaStage model="BuyerRFQForm" BuyerRFQForm={state.BuyerRFQForm} />
    </Provider>
  )

  component
    .find('input#include_weightings')
    .at(0)
    .simulate('change', { target: { checked: true } })
  expect(component.find('input#weighting_0').instance().value).toEqual('50')
  expect(component.find('input#weighting_1').instance().value).toEqual('50')

  component
    .find('input#include_weightings')
    .at(0)
    .simulate('change', { target: { checked: false } })
  expect(component.find('input#weighting_0').length).toEqual(0)
  expect(component.find('input#weighting_1').length).toEqual(0)

  component
    .find('input#include_weightings')
    .at(0)
    .simulate('change', { target: { checked: true } })
  expect(component.find('input#weighting_0').instance().value).toEqual('')
  expect(component.find('input#weighting_1').instance().value).toEqual('')
})

test('removing a criteria', () => {
  const evaluationCriteria = [{ criteria: 'this', weighting: '75' }, { criteria: 'that', weighting: '25' }]
  const state = {
    BuyerRFQForm: {
      evaluationCriteria
    }
  }
  const store = configureStore(state)

  const component = mount(
    <Provider store={store}>
      <BuyerRFQEvaluationCriteriaStage model="BuyerRFQForm" BuyerRFQForm={state.BuyerRFQForm} />
    </Provider>
  )

  component
    .find('a[href="#remove"]')
    .at(0)
    .simulate('click')

  expect(component.find('input#criteria_0').instance().value).toEqual('that')
  expect(component.find('input#weighting_0').instance().value).toEqual('25')
})

test('adding a criteria', () => {
  const evaluationCriteria = [{ criteria: 'this', weighting: '75' }, { criteria: 'that', weighting: '25' }]
  const state = {
    BuyerRFQForm: {
      evaluationCriteria
    }
  }
  const store = configureStore(state)

  const component = mount(
    <Provider store={store}>
      <BuyerRFQEvaluationCriteriaStage model="BuyerRFQForm" BuyerRFQForm={state.BuyerRFQForm} />
    </Provider>
  )

  component
    .find('a[href="#add"]')
    .at(0)
    .simulate('click')

  expect(component.find('input#criteria_2').instance().value).toEqual('')
  expect(component.find('input#weighting_2').instance().value).toEqual('')
})

test('weightingsAddUpTo100 correctly determines whether the weightings add up to 100, or are not present', () => {
  const goodWeightings = [{ weighting: 25 }, { weighting: 75 }]
  const badWeightings1 = [{ weighting: 90 }]
  const badWeightings2 = [{ weighting: 50 }, { weighting: 51 }]
  const noWeightings = [{}]

  expect(weightingsAddUpTo100(goodWeightings)).toBeTruthy()
  expect(weightingsAddUpTo100(badWeightings1)).toBeFalsy()
  expect(weightingsAddUpTo100(badWeightings2)).toBeFalsy()
  expect(weightingsAddUpTo100(noWeightings)).toBeTruthy()
})
