import React from 'react';
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form';

import StatefulError from './StatefulError';

const RadioList = (props) => {
    const {
        id,
        label,
        name,
        options,
        model,
        messages,
        validators
    } = props;
    return (
        <div className="field">
            <fieldset>
                <legend>{label}</legend>
                <StatefulError model={model} messages={messages} id={id} />
                <div>
                    {options.map((option, i) => {
                        let fieldId = `${id}-${option.value}`;
                        return (
                            <span key={i}>
                                <Control.radio
                                    model={model}
                                    name={name}
                                    id={fieldId}
                                    value={option.value}
                                    validators={validators}
                                />
                                <label htmlFor={fieldId}>{option.label}</label>
                            </span>
                        )
                    })}
                </div>
            </fieldset>
        </div>
    );
};

RadioList.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    model: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    })).isRequired,

    validators: PropTypes.object,
    messages: PropTypes.object,
};


export default RadioList;