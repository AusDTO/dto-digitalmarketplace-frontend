import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route } from 'react-router-dom'
import { required, validEmail, governmentEmail } from '../components/validators'

import BaseForm from '../components/shared/form/BaseForm'
import Textfield from '../components/shared/form/Textfield'
import formProps from '../components/shared/form/formPropsSelector'

import { handleSignupSubmit } from '../actions/memberActions'

import { SignupForm } from '../components/Signup/SignupForm'
import UserOnboardingContainer from '../components/Onboarding/OnboardingContainer'
import CreateUserPage from './CreateUserPage'
import NotFound from '../components/shared/NotFound'

class SignupPage extends BaseForm {
  static propTypes = {
    action: PropTypes.string,
    csrf_token: PropTypes.string,
    form: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      emailValidators: {
        required,
        validEmail
      },
      emailErrorMessages: {
        required: 'Your email is required',
        validEmail: 'A validly formatted email is required.',
        governmentEmail: ' Email should have a government domain.'
      },
      isBuyer: this.props.signupForm.user_type === 'buyer',
      submitClicked: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.signupForm.user_type !== nextProps.signupForm.user_type) {
      if (nextProps.signupForm.user_type === 'seller') {
        this.setState({
          emailValidators: {
            required,
            validEmail
          },
          emailErrorMessages: {
            required: 'Your email is required',
            validEmail: 'A validly formatted email is required.'
          },
          isBuyer: false
        })
      }

      if (nextProps.signupForm.user_type === 'buyer') {
        this.setState({
          emailValidators: {
            required,
            validEmail,
            governmentEmail
          },
          emailErrorMessages: {
            required: 'Your email is required',
            validEmail: 'A validly formatted email is required.',
            governmentEmail: ' Email should have a government domain.'
          },
          isBuyer: true
        })
      }
    }
  }

  handleSubmit(model) {
    this.props.handleSignupSubmit(model)
  }

  onSubmitFailed() {
    window.scrollTo(0, 0)
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const { csrf_token, signupForm, user, model, form, buyer_url, seller_url, signupSuccess } = this.props
    let { isBuyer, emailValidators, emailErrorMessages } = this.state
    return (
      <SignupForm
        csrf_token={csrf_token}
        signupForm={signupForm}
        user={user}
        model={model}
        form={form}
        buyer_url={buyer_url}
        seller_url={seller_url}
        signupSuccess={signupSuccess}
        submitClicked={this.onSubmitClicked}
        handleSubmit={this.handleSubmit}
        submitFailed={this.onSubmitFailed}
        isBuyer={isBuyer}
        emailValidators={emailValidators}
        emailErrorMessages={emailErrorMessages}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSignupSubmit: model => dispatch(handleSignupSubmit(model))
  }
}

const mapStateToProps = state => {
  return {
    ...formProps(state, 'signupForm'),
    signupSuccess: state.user.signupSuccess
  }
}

export { Textfield, mapStateToProps, SignupForm as Form }

const SignupPageContainer = connect(mapStateToProps, mapDispatchToProps)(SignupPage)

const Routes = ({ match }) =>
  <Switch>
    <Route exact path={match.url} component={SignupPageContainer} />
    <Route path={`${match.url}/createuser/:token`} component={CreateUserPage} />
    <Route path={`${match.url}/success`} component={UserOnboardingContainer} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(Routes)
