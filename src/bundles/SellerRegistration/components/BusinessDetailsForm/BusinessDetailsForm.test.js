import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { actions } from 'react-redux-form';

import BusinessDetailsForm, { mapStateToProps } from './BusinessDetailsForm';

import createStore from '../../redux/create'


const generateFormValidilityState = (valid) => {
    return {
        forms: {
            businessDetailsForm: {
                $form: { valid }
            }
        },
        form_options: {
            mode: 'add'
        }
    }
}

test('mapStateToProps', () => {
    let state = generateFormValidilityState(true);
    let props = mapStateToProps(state);
    expect(props).toEqual({ form: {"valid": true}, "formErrors": undefined, "mode": "add", "model": "businessDetailsForm", "returnLink": undefined});

    state = generateFormValidilityState(false);
    props = mapStateToProps(state);
    expect(props).toEqual({ form: { valid: false },"formErrors": undefined, "mode": "add", "model": "businessDetailsForm", "returnLink": undefined});
});

test('handleClick with formValid=false', () => {
    let store = createStore(Object.assign({}, { _serverContext: {} }))
    const wrapper = mount(
        <Provider store={store}>
          <BusinessDetailsForm />
        </Provider>
    )

    wrapper.find('button[type="submit"]').first().simulate('click')
    expect(store.getState().forms.businessDetailsForm.$form.valid).toBeFalsy()
    expect(wrapper.find('h1').text()).toBe('Tell us about your business');
    expect(wrapper.find('#abn-hint').text()).toMatch(/Apply for an ABN here/);
});

test('render existing supplier copy', () => {
  let store = createStore({application: {supplier_code: 999}});
  const wrapper = mount(
    <Provider store={store}>
      <BusinessDetailsForm />
    </Provider>
  )

  expect(wrapper.find('h1').text()).toBe('Check your business details');
});
