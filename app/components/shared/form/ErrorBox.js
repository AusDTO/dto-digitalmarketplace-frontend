import React from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'

import PageAlert from '@gov.au/page-alerts'

import { getInvalidFields } from './errorMessageSelector'

class ErrorBox extends React.Component {
  state = {
    focusedOnce: false
  }

  componentDidUpdate() {
    const { focusOnMount } = this.props
    const { focusedOnce } = this.state

    if (this.refs['box'] && !focusedOnce && focusOnMount) {
      this.setState({ focusedOnce: true })
      this.refs.box.focus()
    }
  }

  

  render() {
    const { invalidFields, form } = this.props
    if (form.submitFailed === false || !invalidFields.length) {
      return null
    }

    return (
      <PageAlert as="error">
        <h4 id="validation-masthead-heading" ref='box' tabIndex='0'>There was a problem with the details you gave</h4>
        {invalidFields &&
          <ul>
            {invalidFields.map(({ messages, id }, i) => {
              return messages.map((message, j) =>
                <li key={`${i}${j}`}>
                  <a href={`#${id}`}>
                    {message}
                  </a>
                </li>
              )
            })}
          </ul>}
      </PageAlert>
    )
  }
}

ErrorBox.propTypes = {
  focusOnMount: React.PropTypes.bool,
  invalidFields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      message: React.PropTypes.arrayOf(React.PropTypes.string)
    })
  ).isRequired,
  form: React.PropTypes.object
}

export const mapStateToProps = (state, { focusOnMount, model }) => {
  return {
    invalidFields: getInvalidFields(state, model),
    // Currently does nada, since cDM since render is not blocked internally.
    focusOnMount,
    form: get(state, `forms.${model}.$form`, {})
  }
}

export default connect(mapStateToProps)(ErrorBox)
