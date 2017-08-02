import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { decodeInviteToken } from '../../actions/memberActions'

class CreateUser extends Component {
  componentDidMount() {
    let tokenString = this.props.match.params.tokenstring
    this.props.loadRegistrationData(tokenString)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.registrationDataLoaded !== nextProps.registrationDataLoaded) {
      return true
    }
    return false
  }

  render() {
    return (
      <div>
        {this.props.registrationDataLoaded ? this.props.userRegisterDetails.name : null}
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
  hasErrored: PropTypes.bool,
  isLoading: PropTypes.bool,
  registrationDataLoaded: PropTypes.bool,
  loadRegistrationData: PropTypes.func.isRequired
}

const mapStateToProps = ({ createUser }) => {
  return {
    userRegisterDetails: createUser.userRegisterDetails,
    hasErrored: createUser.memberInfoHasErrored,
    isLoading: createUser.memberInfoIsLoading,
    registrationDataLoaded: createUser.registrationDataLoaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRegistrationData: tokenString => {
      dispatch(decodeInviteToken(tokenString))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
