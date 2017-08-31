/* eslint no-underscore-dangle: 0 */
/* eslint react/no-array-index-key: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import get from 'lodash/get'

import PageAlert from '@gov.au/page-alerts'

import { getInvalidFields } from './errorMessageSelector'

export class ErrorBox extends React.Component {
  state = {
    lastFocus: null
  }

  componentDidMount() {
    this.focusIfNeeded()
  }

  componentDidUpdate() {
    this.focusIfNeeded()
  }

  setRef = c => {
    this._container = c
  }

  focusIfNeeded() {
    if (this._container && this.state.lastFocus !== this.props.submitClicked) {
      this.setState({
        lastFocus: this.props.submitClicked
      })
      this.props.setFocus(this._container)
    }
  }

  render() {
    const { invalidFields, form, errorMessage, title } = this.props
    if ((form.submitFailed === false && !errorMessage) || (!invalidFields.length && !errorMessage)) {
      this._container = null
      return null
    }

    return (
      <PageAlert as="error">
        <h4 id="validation-masthead-heading" ref={this.setRef} tabIndex="-1">
          {title || 'There was a problem with the details you gave'}
        </h4>
        <ul>
          {invalidFields &&
            invalidFields.map(({ messages, id }, i) =>
              messages.map((message, j) =>
                <li key={`${i}${j}`}>
                  <a href={`#${id}`}>
                    {message}
                  </a>
                </li>
              )
            )}
          {errorMessage &&
            <li key="errorMessage">
              {errorMessage}
            </li>}
        </ul>
      </PageAlert>
    )
  }
}

ErrorBox.defaultProps = {
  form: null,
  title: '',
  invalidFields: [],
  errorMessage: null
}

ErrorBox.propTypes = {
  invalidFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  form: PropTypes.object,
  title: PropTypes.string,
  errorMessage: PropTypes.string
}

export const mapStateToProps = (state, { model }) => ({
  invalidFields: getInvalidFields(state, model),
  form: get(state, `forms.${model}.$form`, {}),
  errorMessage: state.user.message
})

export default connect(mapStateToProps)(ErrorBox)
