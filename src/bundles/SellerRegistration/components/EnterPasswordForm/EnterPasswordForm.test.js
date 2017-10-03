import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import { Provider } from 'react-redux';

import EnterPasswordForm, { mapStateToProps } from './EnterPasswordForm';

import createStore from '../../redux/create'


const generateFormValidilityState = (valid) => {
    return {
        forms: {
            enterPasswordForm: {
                $form: { valid }
            }
        },
        form_options: {
        }
    }
}

test('mapStateToProps', () => {
    let state = generateFormValidilityState(true);
    let props = mapStateToProps(state);
    expect(props).toEqual({ form: {"valid": true}, "formErrors": undefined, "model": "enterPasswordForm"});

    state = generateFormValidilityState(false);
    props = mapStateToProps(state);
    expect(props).toEqual({ form: { valid: false },"formErrors": undefined, "model": "enterPasswordForm"});
});

test('short password', () => {
    let store = createStore(Object.assign({}, { _serverContext: {}, enterPasswordForm: {password: 'short', 'terms': 'on'} }))
    const wrapper = mount(
        <Provider store={store}>
          <EnterPasswordForm />
        </Provider>
    )

    wrapper.find('input[type="submit"]').simulate('click')
    expect(store.getState().forms.enterPasswordForm.$form.valid).toBeFalsy()
});

test('valid password', () => {
    let store = createStore(Object.assign({}, { _serverContext: {}, enterPasswordForm: {password: '0123456789', 'terms': 'on'} }))
    const wrapper = mount(
        <Provider store={store}>
          <EnterPasswordForm />
        </Provider>
    )

    wrapper.find('input[type="submit"]').simulate('click')
    expect(store.getState().forms.enterPasswordForm.$form.valid).toBeTruthy()
});
