import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from 'marketplace/actions/appActions'

const LockoutPageComponent = props => {
  const { loggedIn } = props
  if (loggedIn) props.logout()

  return (
    <div className="row">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          <p>We are closed.</p>
        </article>
      </div>
    </div>
  )
}

LockoutPageComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}

LockoutPageComponent.mapStateToProps = ({ app }) => ({
  loggedIn: app.loggedIn
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

const LockoutPage = withRouter(
  connect(
    null,
    mapDispatchToProps
  )(LockoutPageComponent)
)

export default LockoutPage
