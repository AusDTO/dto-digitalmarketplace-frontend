import React from 'react'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import { withRouter } from 'react-router-dom'
import BaseForm from '../../components/shared/form/BaseForm'
import ErrorBox from '../../components/shared/form/ErrorBox'
import Textfield from '../../components/shared/form/Textfield'
import CheckboxDetailsField from '../../components/shared/form/CheckboxDetailsField'
import formProps from '../../components/shared/form/formPropsSelector'

import PageAlert from '@gov.au/page-alerts'

import { createUser } from '../../actions/memberActions'

class CreateUserForm extends BaseForm {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    errors: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = { createMessage: null }
    this.handleAPIResponseError = this.handleAPIResponseError.bind(this)
  }

  componentWillMount() {
    this.props.loadInitialData(this.props.initialState)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createUserErrored) {
      window.scrollTo(0, 0)
      this.setState({ createMessage: this.handleAPIResponseError(nextProps.isDuplicate) })
    }
    if (this.props.createUserSuccess !== nextProps.createUserSuccess) {
      if (nextProps.createUserSuccess) {
        this.props.history.push('/signup/success')
      }
    }
  }

  handleAPIResponseError(isDuplicate) {
    if (isDuplicate) {
      return (
        <span>
          <span>An account with this email address already exists</span>
          <a href="/login"> login</a>
        </span>
      )
    } else
      return (
        <li>
          <p>
            The Digital Marketplace encountered an error trying to create your account. Please try again later or{' '}
            <a href="/contact-us" target="_blank" rel="external">
              {' '}contact us{' '}
            </a>{' '}
            for assistance.
          </p>
        </li>
      )
  }

  handleSuccess() {}

  render() {
    const { model, form, initialState, handleSubmit, createUserSuccess, createUserLoading } = this.props
    let valid = form.valid
    let userType = initialState.user_type

    let { createMessage } = this.state

    return (
      <div>
        {createUserLoading && <strong>....loading</strong>}
        {createMessage &&
          !createUserSuccess &&
          valid &&
          <PageAlert as="error">
            <h4>We were unable to create your account</h4>
            <ul>
              {createMessage}
            </ul>
          </PageAlert>}
        <ErrorBox focusOnMount={true} model={model} />
        {userType === 'buyer'
          ? <div>
              <h1>Add your name and password</h1>
              <p>To finish creating your account please provide the following details.</p>
            </div>
          : <div>
              <h1>Add a password</h1>
              <p>To finish creating your account please provide the following details.</p>
            </div>}
        <Form model={model} id="createuser" onSubmit={model => handleSubmit(model)}>
          {userType === 'buyer' &&
            <Textfield
              model={`${model}.name`}
              name="name"
              id="name"
              htmlFor="name"
              label="Full name"
              description="This name will be used throughout the Marketplace"
              validators={{
                required: val => val && val.length
              }}
              messages={{
                required: 'A name is required'
              }}
            />}

          <Textfield
            model={`${model}.password`}
            name="password"
            id="password"
            htmlFor="password"
            label="Password"
            description="At least 10 characters"
            validators={{
              length: val => val && val.length >= 10
            }}
            messages={{
              length: 'Your password must be at least 10 characters'
            }}
          />

          <CheckboxDetailsField
            model={`${model}.agree`}
            id="agree"
            name="agree"
            value="agree"
            label={
              <span>
                <span>I accept the </span>
                <a href="/terms-of-use" target="_blank" rel="external">
                  Terms of Use
                </a>
              </span>
            }
            description="blah"
            detailsModel={model}
            validators={{
              required: val => val
            }}
            messages={{
              required: 'Accept Terms of Use'
            }}
          />
          <button type="submit">Join the Marketplace</button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { createUserSuccess, createUserErrored, createUserLoading, isDuplicate, user } = state.user
  return {
    ...formProps(state, 'createUserForm'),
    createUserSuccess: createUserSuccess,
    createUserErrored: createUserErrored,
    createUserLoading: createUserLoading,
    isDuplicate: isDuplicate,
    user: user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialData: data => {
      data = Object.assign({}, data)
      dispatch(actions.load('createUserForm', data))
    },
    handleSubmit: values => dispatch(createUser(values))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUserForm))
