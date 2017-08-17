import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Control, actions } from 'react-redux-form'
import get from 'lodash/get'
import StatefulError from './StatefulError'

class CheckboxDetailsField extends React.Component {
  state = {
    showField: false
  }

  constructor(props) {
    super(props)
    this.state = {
      showField: props.checked === true
    }
  }

  onToggle(e) {
    this.setState({
      showField: e.target.checked === true
    })

    const { detailsModel, revalidateDetails } = this.props
    revalidateDetails(detailsModel)
  }

  render() {
    const { name, id, label, model, validators, messages } = this.props
    /*eslint-disable jsx-a11y/label-has-for*/

    return (
      <label className="uikit-control-input" htmlFor={id}>
        <Control.checkbox
          className="uikit-control-input__input"
          onClick={this.onToggle.bind(this)}
          id={id}
          name={name}
          value="yes"
          model={model}
          validators={validators}
        />
        <span className="uikit-control-input__text">
          {label}
        </span>
        <StatefulError model={model} messages={messages} id={id} />
      </label>
    )
  }
}

CheckboxDetailsField.defaultProps = {
  mapProps: {},
  messages: {},
  detailsLabel: 'Please provide details'
}

CheckboxDetailsField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  detailsLabel: PropTypes.string,
  detailsModel: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,

  validators: PropTypes.object,
  messages: PropTypes.object,
  description: PropTypes.string,
  controlProps: PropTypes.object,
  mapProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}

const mapDispatchToProps = dispatch => {
  return {
    revalidateDetails: detailsModel => {
      dispatch(actions.setValidity(detailsModel, true))
    }
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    checked: get(state, ownProps.model)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxDetailsField)
