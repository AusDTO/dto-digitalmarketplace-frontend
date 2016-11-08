import React from 'react';

const SubmitForm = ({ children, method, id, action, valid, onSubmit, onReset, onCustomSubmit }) => (
  <form
    method={method}
    id={id}
    action={action}
    onReset={onReset}
    onSubmit={e => {
      let values = onSubmit();
      if (!valid) {
        e.preventDefault();
        return;
      }
      onCustomSubmit(e, values);
    }}
    children={children} />
)

SubmitForm.defaultProps = {
  onCustomSubmit: () => {}
}

SubmitForm.propTypes = {
  children: React.PropTypes.any,
  method: React.PropTypes.string,
  id: React.PropTypes.string,
  action: React.PropTypes.string,
  onCustomSubmit: React.PropTypes.func,

  valid: React.PropTypes.bool.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onReset: React.PropTypes.func.isRequired
}

export default SubmitForm;