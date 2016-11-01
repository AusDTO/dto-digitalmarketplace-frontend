import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { actions } from 'react-redux-form';
import { BrowserRouter } from 'react-router';

import CaseStudyForm, { mapStateToProps } from './CaseStudyForm';

import createStore from '../../redux/create'


const generateFormValidilityState = (valid) => {
  return {
    forms: {
      caseStudyForm: {
        $form: { valid }
      }
    },
    form_options: {
      mode: 'add',
      errors: []
    },
    casestudy: {},
    router: {}
  }
}

test('mapStateToProps', () => {
  const baseProps = {
    formErrors: [], 
    model: 'caseStudyForm', 
    mode: 'add', 
    errors: [], 
    returnLink: void 0,
    maxSteps: 2,
    caseStudyForm: void 0
  };

  let state = generateFormValidilityState(true);
  let props = mapStateToProps(state);
  expect(props).toEqual(Object.assign({}, baseProps, { form: { valid: true } }));

  state = generateFormValidilityState(false);
  props = mapStateToProps(state);
  expect(props).toEqual(Object.assign({}, baseProps, { form: { valid: false }}));
});

test('handleClick with formValid=false', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <CaseStudyForm />
      </Provider>
    </BrowserRouter>
  )

  wrapper.find('input[type="submit"]').simulate('click')
  expect(store.getState().forms.caseStudyForm.$form.valid).toBeFalsy()
});
