/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Control, actions } from 'react-redux-form'
import get from 'lodash/get'
import StatefulError from './StatefulError'

class CheckboxDetailsField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showField: props.checked === true
    }
  }

  state = {
    showField: false
  }

  onToggle(e) {
    this.setState({
      showField: e.target.checked === true
    })

    const { detailsModel, revalidateDetails } = this.props
    revalidateDetails(detailsModel)
  }

  render() {
    const { name, id, label, model, validators, messages, value } = this.props
    /* eslint-disable jsx-a11y/label-has-for */

    return (
      <label className="au-control-input" htmlFor={id}>
        <Control.checkbox
          className="au-control-input__input"
          onClick={this.onToggle.bind(this)}
          id={id}
          name={name}
          value={value || 'yes'}
          model={model}
          validators={validators}
        />
        <span className="au-control-input__text">{label}</span>
        <StatefulError model={model} messages={messages} id={id} />
      </label>
    )
  }
}

CheckboxDetailsField.defaultProps = {
  messages: null,
  validators: null
}

CheckboxDetailsField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  detailsModel: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,

  validators: PropTypes.object,
  messages: PropTypes.object
}

const mapDispatchToProps = dispatch => ({
  revalidateDetails: detailsModel => {
    dispatch(actions.setValidity(detailsModel, true))
  }
})

export const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  checked: get(state, ownProps.model)
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxDetailsField)
