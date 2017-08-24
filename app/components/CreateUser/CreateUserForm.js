import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import { withRouter } from 'react-router-dom'
import BaseForm from '../../components/shared/form/BaseForm'
import ErrorBox from '../../components/shared/form/ErrorBox'
import ErrorMessages from '../../components/shared/form/ErrorMessages'
import Textfield from '../../components/shared/form/Textfield'
import CheckboxDetailsField from '../../components/shared/form/CheckboxDetailsField'
import formProps from '../../components/shared/form/formPropsSelector'
import PageAlert from '@gov.au/page-alerts'
import { createUser } from '../../actions/memberActions'
import styles from './CreateUserForm.scss'
import { rootPath } from '../../routes'

export class CreateUserForm extends BaseForm {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null
    }
  }

  componentWillMount() {
    this.props.loadInitialData(this.props.initialState)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createUserErrored) {
      window.scrollTo(0, 0)
    }
    if (this.props.createUserSuccess !== nextProps.createUserSuccess) {
      if (nextProps.createUserSuccess) {
        this.props.history.push(`${rootPath}/signup/success/${nextProps.createUserForm.user_type}`)
      }
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const { model, form, initialState, handleSubmit, createUserSuccess } = this.props
    let valid = form.valid
    let userType = initialState.user_type

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <div className="row">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <article role="main">
            <ErrorMessages title="We were unable to create your account" />
            <ErrorBox model={model} submitClicked={this.state.submitClicked} setFocus={setFocus} />
            {userType === 'buyer' /*eslint-disable indent */
              ? <div>
                  <h1>Add your name and password</h1>
                  <p>To finish creating your account please provide the following details.</p>
                </div>
              : <div>
                  <h1>Add a password</h1>
                  <p>To finish creating your account please provide the following details.</p>
                </div> /*eslint-disable indent */}
            <Form model={model} id="createuser" onSubmit={model => handleSubmit(model)}>
              {userType === 'buyer' &&
                <Textfield
                  model={`${model}.name`}
                  name="name"
                  id="name"
                  htmlFor="name"
                  label="Full name"
                  description="This name will be used throughout the Marketplace"
                  validators={{ required: val => val && val.length }}
                  messages={{ required: 'A name is required' }}
                />}

              <Textfield
                model={`${model}.password`}
                name="password"
                id="password"
                htmlFor="password"
                label="Password"
                type="password"
                description="At least 10 characters"
                validators={{ length: val => val && val.length >= 10 }}
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
                validators={{ required: val => val }}
                messages={{ required: 'Accept Terms of Use' }}
              />
              <p className={styles.formSubmitBtnWrapper}>
                <input
                  className="uikit-btn"
                  type="submit"
                  value="Join the Marketplace"
                  onClick={this.onSubmitClicked}
                />
              </p>
            </Form>
          </article>
        </div>
      </div>
    )
  }
}

CreateUserForm.propTypes = {
  initialState: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email_address: PropTypes.string.isRequired,
    user_type: PropTypes.string.isRequired
  }),
  createUserSuccess: PropTypes.bool,
  isLoading: PropTypes.bool
}

const mapStateToProps = state => {
  const { createUserSuccess, isLoading } = state.user
  return {
    ...formProps(state, 'createUserForm'),
    createUserSuccess: createUserSuccess,
    isLoading: isLoading
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
