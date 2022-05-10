import React from 'react';
import PropTypes from 'prop-types'
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
    validators,
    disabled
  } = props;

  return (
    <div className="field">
      <b className="question-heading">{label}</b>
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
      <div className="field">
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
        disabled={disabled}
      />
      </div>
    </div>
  );
};

MultiInput.defaultProps = {
  mapProps: {},
  disabled: false
};

MultiInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  model: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
  disabled: PropTypes.bool,
  messages: PropTypes.object,
  validators: PropTypes.object,
  description: PropTypes.string,
  controlProps: PropTypes.object,
  mapProps: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default MultiInput;