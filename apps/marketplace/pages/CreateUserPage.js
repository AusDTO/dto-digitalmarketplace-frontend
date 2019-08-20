import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BaseForm from 'shared/form/BaseForm'
import formProps from 'shared/form/formPropsSelector'
import { getTokenFromURL, getEmailFromQueryString } from 'marketplace/components/helpers'
import CreateUserForm from '../components/CreateUser/CreateUserForm'
import { createUser } from '../actions/memberActions'
import { rootPath } from '../routes'

export class CreateUserPageComponent extends BaseForm {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null
    }

    this.onSubmitClicked = this.onSubmitClicked.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.createUserSuccess !== nextProps.createUserSuccess) {
      if (nextProps.createUserSuccess && this.props.createdUser) {
        this.props.history.push(`${rootPath}/signup/success/${nextProps.createdUser.role}`)
      }
    }
  }

  onSubmitClicked() {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  handleSubmit = values => {
    const token = getTokenFromURL(this.props.match.url, this.props.location)
    const email = getEmailFromQueryString(this.props.location)
    const password = values.password
    this.props.createUser(token, email, password)
  }

  render() {
    const { model, createUserSuccess, currentlySending } = this.props

    return (
      <div className="row">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <article role="main">
            <CreateUserForm
              onSubmitClicked={this.onSubmitClicked}
              submitClicked={this.state.submitClicked}
              handleSubmit={this.handleSubmit}
              createUserSuccess={createUserSuccess}
              model={model}
              currentlySending={currentlySending}
            />
          </article>
        </div>
      </div>
    )
  }
}

CreateUserPageComponent.propTypes = {
  model: PropTypes.string.isRequired,
  createUserSuccess: PropTypes.bool
}

const mapStateToProps = state => ({
  ...formProps(state, 'createUserForm'),
  createUserSuccess: state.user.createUserSuccess,
  createdUser: state.user.user,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  createUser: (token, emailAddress, password) => dispatch(createUser(token, emailAddress, password))
})

const CreateUserPage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateUserPageComponent)
)

export default CreateUserPage
