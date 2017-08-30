import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BaseForm from '../../components/shared/form/BaseForm'
import { ResetPasswordForm } from './ResetPasswordForm'
import formProps from '../../components/shared/form/formPropsSelector'
import { submitResetPassword, getUserDataFromToken } from '../../actions/resetPasswordActions'
import { passwordsMatch } from '../validators'

export class ResetPasswordContainer extends BaseForm {
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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    let tokenString = this.props.match.params.tokenString
    this.props.loadInitialData(tokenString)
  }

  handleSubmit(values) {
    const { user } = this.props
    const payload = Object.assign({}, values, user.user)
    this.props.handleSubmit(payload)
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const { user, model } = this.props
    return (
      <ResetPasswordForm
        model={model}
        user={user}
        submitClicked={this.onSubmitClicked}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    ...formProps(state, 'resetPasswordForm'),
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: payload => dispatch(submitResetPassword(payload)),
    loadInitialData: token => dispatch(getUserDataFromToken(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer))
