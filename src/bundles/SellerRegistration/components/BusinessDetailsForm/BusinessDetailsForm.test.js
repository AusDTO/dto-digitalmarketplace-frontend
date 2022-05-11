import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

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


test('render existing supplier copy', () => {
  let store = createStore({application: {supplier_code: 0, abn: "123456"}});
  const wrapper = mount(
    <Provider store={store}>
      <BusinessDetailsForm />
    </Provider>
  )

  expect(wrapper.find('h1').text()).toBe('Check your business details');
});
