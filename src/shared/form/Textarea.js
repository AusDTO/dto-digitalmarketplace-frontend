import React from 'react';
import { Control, Errors, controls } from 'react-redux-form';

import TextareaComponent from '../Textarea';

const Textarea = ({ name, id, label, model, validators, messages, description, controlProps, mapProps }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
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
      controlProps={{ name, id, ...controlProps}}
      validators={validators}
      component={TextareaComponent}
      mapProps={{
        className: ({ fieldValue }) => !fieldValue.valid && fieldValue.touched ? 'invalid' : '',
        value: (props) => props.viewValue,
        ...mapProps,
        ...controls.default,
      }}
    />
  </div>
);

Textarea.defaultProps = {
  mapProps: {}
}

Textarea.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  model: React.PropTypes.string.isRequired,

  validators: React.PropTypes.object,
  messages: React.PropTypes.object,
  description: React.PropTypes.string,
  controlProps: React.PropTypes.object,
  mapProps: React.PropTypes.object,
};


export default Textarea;