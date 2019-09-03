import React from 'react'
import PropTypes from 'prop-types'
import { Errors } from 'react-redux-form'

import PageAlertError from './PageAlertError'

const ErrorAlert = props => (
  <Errors
    model={props.model}
    show={field => field.touched && !field.focus}
    messages={props.messages}
    component="li"
    wrapper={PageAlertError}
  />
)

ErrorAlert.defaultProps = {
  messages: {}
}

ErrorAlert.propTypes = {
  model: PropTypes.string.isRequired,
  messages: PropTypes.object
}

export default ErrorAlert
