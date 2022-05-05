import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import { Provider } from 'react-redux';
import { actions } from 'react-redux-form';

import YourInfoForm, { mapStateToProps } from './YourInfoForm';

import createStore from '../../redux/create'


const generateFormValidilityState = (valid) => {
  return {
      forms: {
        yourInfoForm: {
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
  expect(props).toEqual({ form: { valid: true }, formErrors: void 0, model: 'yourInfoForm' });

  state = generateFormValidilityState(false);
  props = mapStateToProps(state);
  expect(props).toEqual({ form: { valid: false }, formErrors: void 0, model: 'yourInfoForm' });
});

test('render existing supplier copy', () => {
  let store = createStore({application: {supplier_code: 999}});
  const wrapper = mount(
    <Provider store={store}>
      <YourInfoForm />
    </Provider>
  )

  expect(wrapper.find('h1').text()).toBe('Check your contact details');
});
