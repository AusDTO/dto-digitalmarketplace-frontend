import React from 'react'
import CaseStudyAdd, { mapStateToProps } from './CaseStudyAdd'
import renderer from 'react-test-renderer'

import createStore from '../../redux/create'
const store = createStore({ _serverContext: {} })

test('Structure of CaseStudyAdd', () => {
  const component = renderer.create(
    <CaseStudyAdd store={store} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('mapStateToProps', () => {
  const state = {
    casestudies: {
      added: true
    }
  }
  const props = mapStateToProps(state)
  expect(props).toEqual({ redirect: true })
})
