import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { actions } from 'react-redux-form';

import SignupForm, { mapStateToProps } from './SignupForm';

import createStore from '../../redux/create'


const generateFormValidilityState = (valid) => {
  return {
      forms: {
        signupForm: {
          $form: { valid }
        }
      }
    ,
    form_options: {}
  }
  }

test('mapStateToProps', () => {
  let state = generateFormValidilityState(true);
  let props = mapStateToProps(state);
  expect(props).toEqual({ form: { valid: true }, formErrors: void 0, model: 'signupForm' });

  state = generateFormValidilityState(false);
  props = mapStateToProps(state);
  expect(props).toEqual({ form: { valid: false }, formErrors: void 0, model: 'signupForm' });
});

test('handleClick with formValid=false', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const wrapper = mount(
    <Provider store={store}>
      <SignupForm />
    </Provider>
  )

  wrapper.find('input[type="submit"]').simulate('click')
  expect(store.getState().forms.signupForm.$form.valid).toBeFalsy()
});
