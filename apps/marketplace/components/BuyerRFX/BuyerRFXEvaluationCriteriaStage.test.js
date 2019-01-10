import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'marketplace/store'
import { Provider } from 'react-redux'
import { actions } from 'react-redux-form'
import BuyerRFXEvaluationCriteriaStage, { weightingsAddUpTo100 } from './BuyerRFXEvaluationCriteriaStage'

Enzyme.configure({ adapter: new Adapter() })

test('include weightings checkbox adds the weightings inputs', () => {
  const evaluationCriteria = [{ criteria: '', weighting: '' }]
  const state = {
    BuyerRFXForm: {
      evaluationCriteria
    }
  }
  const store = configureStore(state)

  const component = mount(
    <Provider store={store}>
      <BuyerRFXEvaluationCriteriaStage model="BuyerRFXForm" BuyerRFXForm={state.BuyerRFXForm} />
    </Provider>
  )

  component
    .find('input#include_weightings')
    .at(0)
    .simulate('change', { target: { checked: true } })
  expect(component.find('input#weighting_0').length).toEqual(1)
})

test('removing a criteria', () => {
  const evaluationCriteria = [{ criteria: 'this', weighting: '75' }, { criteria: 'that', weighting: '25' }]
  const state = {
    BuyerRFXForm: {
      evaluationCriteria,
      includeWeightings: true
    }
  }
  const store = configureStore()
  store.dispatch(actions.change(`BuyerRFXForm.evaluationCriteria`, state.BuyerRFXForm.evaluationCriteria))
  store.dispatch(actions.change(`BuyerRFXForm.includeWeightings`, state.BuyerRFXForm.includeWeightings))

  const component = mount(
    <Provider store={store}>
      <BuyerRFXEvaluationCriteriaStage model="BuyerRFXForm" BuyerRFXForm={state.BuyerRFXForm} />
    </Provider>
  )

  component
    .find('a[href="#remove"]')
    .at(0)
    .simulate('click')

  expect(component.find('textarea#criteria_0').instance().value).toEqual('that')
  expect(component.find('input#weighting_0').instance().value).toEqual('25')
})

test('adding a criteria', () => {
  const evaluationCriteria = [{ criteria: 'this', weighting: '75' }, { criteria: 'that', weighting: '25' }]
  const state = {
    BuyerRFXForm: {
      evaluationCriteria,
      includeWeightings: true
    }
  }
  const store = configureStore()
  store.dispatch(actions.change(`BuyerRFXForm.evaluationCriteria`, state.BuyerRFXForm.evaluationCriteria))
  store.dispatch(actions.change(`BuyerRFXForm.includeWeightings`, state.BuyerRFXForm.includeWeightings))

  const component = mount(
    <Provider store={store}>
      <BuyerRFXEvaluationCriteriaStage model="BuyerRFXForm" BuyerRFXForm={state.BuyerRFXForm} />
    </Provider>
  )

  component
    .find('a[href="#add"]')
    .at(0)
    .simulate('click')

  expect(component.find('textarea#criteria_2').instance().value).toEqual('')
  expect(component.find('input#weighting_2').instance().value).toEqual('')
})

test('weightingsAddUpTo100 correctly determines whether the weightings add up to 100, or are not present', () => {
  const goodWeightings = { includeWeightings: true, evaluationCriteria: [{ weighting: 25 }, { weighting: 75 }] }
  const badWeightings1 = { includeWeightings: true, evaluationCriteria: [{ weighting: 90 }] }
  const badWeightings2 = { includeWeightings: true, evaluationCriteria: [{ weighting: 50 }, { weighting: 51 }] }
  const noWeightings = { includeWeightings: false, evaluationCriteria: [] }

  expect(weightingsAddUpTo100(goodWeightings)).toBeTruthy()
  expect(weightingsAddUpTo100(badWeightings1)).toBeFalsy()
  expect(weightingsAddUpTo100(badWeightings2)).toBeFalsy()
  expect(weightingsAddUpTo100(noWeightings)).toBeTruthy()
})
