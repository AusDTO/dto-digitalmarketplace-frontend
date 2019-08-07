import React from 'react'
import PropTypes from 'prop-types'
import { Errors } from 'react-redux-form'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import styles from './ErrorAlert.scss'

const ErrorAlert = props => (
  <Errors
    model={props.model}
    show={field => field.touched && !field.focus}
    messages={props.messages}
    component="li"
    wrapper={({ children }) => {
      if (!children.length) {
        return null
      }

      return (
        <AUpageAlert as="error" className={styles.container}>
          <AUheadings level="2" size="lg">
            {props.title}
          </AUheadings>
          <ul>{children}</ul>
        </AUpageAlert>
      )
    }}
  />
)

ErrorAlert.defaultProps = {
  messages: {}
}

ErrorAlert.propTypes = {
  title: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  messages: PropTypes.object
}

export default ErrorAlert
