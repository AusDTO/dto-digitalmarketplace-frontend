import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateUserForm from './CreateUserForm'
import { loadCompleteSignup } from '../../actions/memberActions'

export class CreateUser extends Component {
  componentDidMount() {
    let tokenString = this.props.match.params.tokenstring
    this.props.loadRegistrationData(tokenString)
  }

  render() {
    let {
      loadCompleteSignupSuccess,
      loadCompleteSignupErrored,
      userRegisterDetails
    } = this.props

    return (
      <div className="row">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          {loadCompleteSignupSuccess &&
            <div>
              <CreateUserForm initialState={userRegisterDetails} />
            </div>}
          {loadCompleteSignupErrored && <div>placeholder for failed loading of user registration details</div>}
        </div>
      </div>
    )
  }
}

CreateUser.propTypes = {
  userRegisterDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email_address: PropTypes.string.isRequired,
    manager_name: PropTypes.string,
    manager_email: PropTypes.string
  }),
  loadCompleteSignupSuccess: PropTypes.bool,
  loadRegistrationData: PropTypes.func.isRequired
}

const mapStateToProps = ({ user }) => {
  return {
    userRegisterDetails: user.userRegisterDetails,
    loadCompleteSignupLoading: user.loadCompleteSignupLoading,
    loadCompleteSignupSuccess: user.loadCompleteSignupSuccess,
    loadCompleteSignupErrored: user.loadCompleteSignupErrored,
    createUserSuccess: user.createUserSuccess,
    createUserErrored: user.createUserErrored,
    user: user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRegistrationData: tokenString => {
      dispatch(loadCompleteSignup(tokenString))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
