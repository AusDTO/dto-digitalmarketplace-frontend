import React from 'react'
import PropTypes from 'prop-types'

const SubmitForm = props => {
  const { children, method, id, action, valid, onSubmit, onReset, onCustomSubmit } = props
  return (
    <form
      method={method}
      id={id}
      action={action}
      onReset={onReset}
      onSubmit={e => {
        const values = onSubmit()
        if (!valid) {
          e.preventDefault()
          return
        }
        onCustomSubmit(e, values)
      }}
    >
      {children}
    </form>
  )
}

SubmitForm.defaultProps = {
  onCustomSubmit: () => {},
  method: null,
  id: null,
  action: null
}

SubmitForm.propTypes = {
  method: PropTypes.string,
  id: PropTypes.string,
  action: PropTypes.string,
  onCustomSubmit: PropTypes.func,

  valid: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

export default SubmitForm
