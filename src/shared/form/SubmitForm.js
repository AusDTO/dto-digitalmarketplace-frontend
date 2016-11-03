import React from 'react';

const SubmitForm = ({ children, method, id, action, valid, onSubmit, onReset }) => (
  <form
    method={method}
    id={id}
    action={action}
    onReset={onReset}
    onSubmit={e => {
      onSubmit();
      if (!valid) {
        e.preventDefault();
      }
    }}
    children={children} />
)

SubmitForm.propTypes = {
  children: React.PropTypes.any,
  method: React.PropTypes.string,
  id: React.PropTypes.string,
  action: React.PropTypes.string,

  valid: React.PropTypes.bool.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func.isRequired
}

export default SubmitForm;