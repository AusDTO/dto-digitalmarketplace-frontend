import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { actions } from 'react-redux-form';

import AwardsForm, { mapStateToProps } from './AwardsForm';

import createStore from '../../redux/create'


const generateFormValidilityState = (valid) => {
    return {
        forms: {
            awardsForm: {
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
    expect(props).toEqual({ form: {"valid": true}, "formErrors": undefined, "mode": "add", "model": "awardsForm", "returnLink": undefined});

    state = generateFormValidilityState(false);
    props = mapStateToProps(state);
    expect(props).toEqual({ form: { valid: false },"formErrors": undefined, "mode": "add", "model": "awardsForm", "returnLink": undefined});
});
