import React from 'react';
import PropTypes from 'prop-types'

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
  children: PropTypes.any,
  method: PropTypes.string,
  id: PropTypes.string,
  action: PropTypes.string,
  onCustomSubmit: PropTypes.func,

  valid: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

export default SubmitForm;