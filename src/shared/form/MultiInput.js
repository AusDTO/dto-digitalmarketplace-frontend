import React from 'react';
import { Control, controls } from 'react-redux-form';

import StatefulError from './StatefulError';
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
      {description && (
        <p className="hint" id={`${id}-hint`}>{description}</p>
      )}
      {messages &&
        <StatefulError
          model={model}
          messages={messages}
          id={id}
        />
      }
      <Control
        model={model}
        controlProps={{ name, id, describedby: `${id}-hint`, hint: description, ...controlProps}}
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

MultiInput.defaultProps = {
  mapProps: {},
};

MultiInput.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  htmlFor: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  model: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string,
  ]).isRequired,

  messages: React.PropTypes.object,
  validators: React.PropTypes.object,
  description: React.PropTypes.string,
  controlProps: React.PropTypes.object,
  mapProps: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.object,
  ]),
}

export default MultiInput;