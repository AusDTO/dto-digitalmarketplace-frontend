import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageAlert from '@gov.au/page-alerts'

let ErrorMessages = props => {
  return props.errorMessage
    ? <PageAlert as="error">
        <h4>
          {props.title}
        </h4>
        <ul>
          <li>
            {props.errorMessage}
          </li>
        </ul>
      </PageAlert>
    : <div />
}
ErrorMessages.propTypes = {
  title: PropTypes.string,
  errorMessage: PropTypes.string
}
const mapStateToProps = state => ({
  errorMessage: state.user.message
})
ErrorMessages = connect(mapStateToProps)(ErrorMessages)
export default ErrorMessages
