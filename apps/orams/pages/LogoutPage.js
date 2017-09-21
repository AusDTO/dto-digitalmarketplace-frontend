import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import BaseForm from 'shared/form/BaseForm'
import LoadingIndicator from 'shared/LoadingIndicator/LoadingIndicator'
import { logout } from 'orams/actions/appActions'
import { rootPath } from 'orams/routes'

export class LogoutPageComponent extends BaseForm {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    currentlySending: PropTypes.bool.isRequired
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.handleLogout()
    }
  }

  render() {
    const { loggedIn } = this.props

    return (
      <main>
        <div id="logout-page">
          {loggedIn ? <LoadingIndicator /> : <Redirect to={{ pathname: `${rootPath}/login` }} />}
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn
})

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logout())
})

LogoutPageComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
}

const LogoutPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutPageComponent))

export default LogoutPage
