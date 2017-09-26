/* eslint-disable no-underscore-dangle */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import get from 'lodash/get'

import PageAlert from '@gov.au/page-alerts'

import { getInvalidFields } from './errorMessageSelector'

export class AlertBoxComponent extends React.Component {
  state = {
    lastFocus: null
  }

  setRef = c => {
    this._container = c
  }

  componentDidMount() {
    this.focusIfNeeded()
  }

  componentDidUpdate() {
    this.focusIfNeeded()
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
      <PageAlert as={alertType}>
        <h4 id="validation-masthead-heading" ref={this.setRef} tabIndex="-1">
          {title || 'There was a problem with the details you gave'}
        </h4>
        <ul>
          {invalidFields &&
            !errorMessage &&
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

AlertBoxComponent.defaultProps = {
  form: null,
  title: null,
  errorMessage: null
}

AlertBoxComponent.propTypes = {
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
  errorMessage: state.app.errorMessage
})

const AlertBox = connect(mapStateToProps)(AlertBoxComponent)

export default AlertBox
