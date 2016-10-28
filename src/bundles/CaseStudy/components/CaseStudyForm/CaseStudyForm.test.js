import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { actions } from 'react-redux-form';

import CaseStudyForm, { mapStateToProps } from './CaseStudyForm';

import createStore from '../../redux/create'


const generateFormValidilityState = (valid) => {
  return {
    form: {
      forms: {
        caseStudy: {
          $form: { valid }
        }
      }
    },
    form_options: {}
  }
}

test('mapStateToProps', () => {
  let state = generateFormValidilityState(true);
  let props = mapStateToProps(state);
  expect(props).toEqual({ form: { valid: true }, formErrors: void 0, model: 'form.caseStudy', mode: 'add' });

  state = generateFormValidilityState(false);
  props = mapStateToProps(state);
  expect(props).toEqual({ form: { valid: false }, formErrors: void 0, model: 'form.caseStudy', mode: 'add' });
});

test('handleClick with formValid=false', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const wrapper = mount(
    <Provider store={store}>
      <CaseStudyForm />
    </Provider>
  )

  wrapper.find('input[type="submit"]').simulate('click')
  expect(store.getState().form.forms.caseStudy.$form.valid).toBeFalsy()
});
