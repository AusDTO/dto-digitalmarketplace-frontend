// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

import CaseStudyForm, { Textfield } from './CaseStudyForm'

import createStore from '../../redux/create'
const store = createStore(Object.assign({}, { _serverContext: {} }))

test('CaseStudyForm renders', () => {
  const component = renderer.create(
  	<Provider store={store}>
    	<CaseStudyForm />
    </Provider>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});