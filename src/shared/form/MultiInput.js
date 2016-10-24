import React from 'react';
import { Errors, Control, controls } from 'react-redux-form';

import MultiInputComponent from '../MultiInput';

const MultiInput = (props) => {
  const {
    id,
    name,
    htmlFor,
    label,
    description,
    model,
    messages,
    controlProps,
    mapProps,
    validators
  } = props;

  return (
    <div className="field">
      <label htmlFor={htmlFor}>{label}</label>
      <p className="hint">{description}</p>
      <Errors
        model={model}
        show="touched"
        messages={messages}
        wrapper={(props) => (
          <a className="error validation-message" href={`#${id}`}><span className="visuallyhidden">Validation Error: </span>{props.children}</a>
        )}
      />
      <Control
        model={model}
        controlProps={{ id, name, ...controlProps }}
        mapProps={{
          rows: ({ viewValue }) => viewValue,
          className: ({ fieldValue }) => !fieldValue.valid && fieldValue.touched ? 'invalid' : '',
          ...mapProps,
          ...controls.default,
        }}
        validators={validators}
        component={MultiInputComponent}
      />
    </div>
  );
};

export default MultiInput;