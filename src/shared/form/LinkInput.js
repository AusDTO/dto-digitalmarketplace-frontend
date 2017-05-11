import React from 'react';
import { Control, controls } from 'react-redux-form';

import StatefulError from './StatefulError';
import LinkInputComponent from '../LinkInput';

const LinkInput = (props) => {
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
    <div className="field" id={id}>
      <h3 style={{marginTop: 0}}><label htmlFor={htmlFor}>{label}</label></h3>
      {description && (
        <p className="hint" id={`${id}-hint`}>{description}</p>
      )}
      <Control
        model={model}
        controlProps={{ name, id, describedby: `${id}-hint`, hint: description, ...controlProps}}
        mapProps={{
          rows: ({ viewValue }) => viewValue,
          className: ({ fieldValue }) => !fieldValue.valid && fieldValue.touched ? 'invalid' : '',
          errors:
          (messages && <StatefulError
              model={model}
              messages={messages}
              id={id}
          />),
          ...mapProps,
          ...controls.default,
        }}
        validators={validators}
        component={LinkInputComponent}
      />


    </div>
  );
};

LinkInput.defaultProps = {
  mapProps: {},
};

LinkInput.propTypes = {
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

export default LinkInput;