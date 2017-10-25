import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import { Provider } from 'react-redux'
import expect from 'expect'
import configureStore from '../store'
import { ReportPageContainer } from './ReportPage'

jest.mock('shared/Icon/_getIcons')

describe('Test suite for ReportPageContainer component', () => {
  const state = {}

  const store = configureStore()
  test('ReportPageContainer renders without errors', () => {
    const renderer = new ReactShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <ReportPageContainer {...state} />
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
