import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BaseForm from '../../components/shared/form/BaseForm'
import formProps from '../../components/shared/form/formPropsSelector'
import { RequestResetEmailForm } from './RequestResetEmailForm'
import { sendResetPasswordEmail } from '../../actions/resetPasswordActions'

export class RequestResetEmailContainer extends BaseForm {
  static propTypes = {
    action: PropTypes.string,
    csrf_token: PropTypes.string,
    form: PropTypes.object.isRequired,
    errors: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const { user, model, form, handleSubmit } = this.props
    return (
      <RequestResetEmailForm
        model={model}
        form={form}
        user={user}
        submitClicked={this.onSubmitClicked}
        handleSubmit={handleSubmit}
      />
    )
  }
}

RequestResetEmailContainer.propTypes = {
  user: PropTypes.shape({
    resetPasswordEmailFailure: PropTypes.bool,
    resetPasswordEmailSuccess: PropTypes.bool
  }).isRequired,
  form: PropTypes.object.isRequired,
  model: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    ...formProps(state, 'resetPasswordEmailForm'),
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: model => dispatch(sendResetPasswordEmail(model))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestResetEmailContainer))
