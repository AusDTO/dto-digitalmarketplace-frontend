import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { actions } from 'react-redux-form';

import YourInfoForm, { mapStateToProps } from './YourInfoForm';

import createStore from '../../redux/create'


const generateFormValidilityState = (valid) => {
  return {
    form: {
      forms: {
        yourInfo: {
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
  expect(props).toEqual({ form: { valid: true }, formErrors: void 0, model: 'form.yourInfo' });

  state = generateFormValidilityState(false);
  props = mapStateToProps(state);
  expect(props).toEqual({ form: { valid: false }, formErrors: void 0, model: 'form.yourInfo' });
});

test('handleClick with formValid=false', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const wrapper = mount(
    <Provider store={store}>
      <YourInfoForm />
    </Provider>
  )

  wrapper.find('input[type="submit"]').simulate('click')
  expect(store.getState().form.forms.yourInfo.$form.valid).toBeFalsy()
});
