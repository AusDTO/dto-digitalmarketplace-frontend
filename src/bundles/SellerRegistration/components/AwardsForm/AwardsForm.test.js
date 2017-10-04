import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import AwardsForm, { mapStateToProps } from './AwardsForm';


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
