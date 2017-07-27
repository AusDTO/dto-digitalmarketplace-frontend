import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { actions } from 'react-redux-form';

import SignupForm, { mapStateToProps } from './SignupForm';

import createStore from '../../redux/create'

import { required, validEmail, governmentEmail } from '../../../../validators';


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

test('should render PageAlert ErrorBox with invalid field values', () => {
  let signupForm = {name: 'Jeff'}
  let store = createStore(Object.assign({}, {
    _serverContext: {},
    signupForm: { email_address: 'asdfasfd' }
  }))
  const wrapper = mount(
    <Provider store={store}>
      <SignupForm />
    </Provider>
  )

  const ErrorBox = wrapper.find('ErrorBox').at(0);
  let errorBoxProps = ErrorBox.props()
  
  wrapper.find('input[type="submit"]').simulate('click')
  expect(errorBoxProps.invalidFields[0].messages[0]).toEqual('You must select a user type')
  expect(errorBoxProps.invalidFields[1].messages[0]).toEqual('Name is required')
  expect(errorBoxProps.invalidFields[2].messages[0]).toEqual('A validly formatted email is required')
  expect(store.getState().forms.signupForm.$form.valid).toBeFalsy()
});
