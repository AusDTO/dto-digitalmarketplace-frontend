import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import { Provider } from 'react-redux'
import expect from 'expect'
import configureStore from '../store'
import { CollaboratePageContainer } from './CollaboratePage'

jest.mock('shared/Icon/_getIcons')

describe('Test suite for CollaboratePageContainer component', () => {
  const state = {}

  const store = configureStore()
  test('CollaboratePageContainer renders without errors', () => {
    const renderer = new ReactShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <CollaboratePageContainer {...state} />
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
