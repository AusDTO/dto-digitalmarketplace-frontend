import React from 'react';
import { Control } from 'react-redux-form';

const YesNoDetailsField = ({ name, id, label, model, validators, messages, description, controlProps, mapProps }) => (
  <div className="field">
      {/*<Control.checkbox
                 name={name}
                 id={id}
                 value="Yes"
                 model={model}
          />*/}
          <label htmlFor={id}>
              <strong>{label}</strong>
          </label>
          If yes, provide details...
          <Control.textarea
              name={`${name}_details`}
              id={`${id}-details`}
              model={`${model}_details`}
          >
          </Control.textarea>
  </div>
);

YesNoDetailsField.defaultProps = {
  mapProps: {}
}

YesNoDetailsField.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  model: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string,
  ]).isRequired,

  validators: React.PropTypes.object,
  messages: React.PropTypes.object,
  description: React.PropTypes.string,
  controlProps: React.PropTypes.object,
  mapProps: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.object,
  ]),
};


export default YesNoDetailsField;