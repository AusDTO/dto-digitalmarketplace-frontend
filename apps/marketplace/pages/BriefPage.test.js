import React from 'react'
import expect from 'expect'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import { Provider } from 'react-redux'

import configureStore from '../store'
import BriefPage from './BriefPage'

describe('Test suite for BriefPage component', () => {
  const state = {}

  const store = configureStore()
  test('BriefPage renders without errors', () => {
    const renderer = new ReactShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <BriefPage {...state} />
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
