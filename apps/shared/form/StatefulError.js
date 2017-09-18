import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Errors } from 'react-redux-form'
import classNames from 'classnames'

import { addMessage, removeMessage } from './errorMessage'
import styles from './scss/StatefulError.scss'

class StatefulError extends React.Component {
  componentDidMount() {
    const { dispatch, messages, model, id } = this.props
    dispatch(addMessage(model, messages, id))
  }

  componentWillUnmount() {
    const { dispatch, model } = this.props
    dispatch(removeMessage(model))
  }

  render() {
    const { model, messages, showMessagesDuringFocus } = this.props

    return (
      <Errors
        model={model}
        show={field => field.touched && (showMessagesDuringFocus || !field.focus)}
        messages={messages}
        wrapper={({ children }) => {
          if (!children.length) {
            return null
          }

          return (
            <div className={classNames('validation-message', styles.CheckboxErrorMessage)}>
              <span className="visuallyhidden">Validation Error: </span>
              {children}
            </div>
          )
        }}
      />
    )
  }
}

StatefulError.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(PropTypes.string).isRequired,
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
})

export default connect(mapStateToProps)(StatefulError)
