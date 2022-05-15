import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from 'marketplace/actions/appActions'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react'
import style from '../../marketplace/main.scss'

const LockoutPageComponent = props => {
  const { loggedIn } = props
  if (loggedIn) props.logout()

  return (
    <div className="row">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          <h1>Sign up</h1>
          <AUpageAlert as="error" className={`${style.marginTop2} ${style.marginBottom2}`}>
            <div>
              <p>
                Digital Marketplace is closed while it is moving to{` `}
                <a href="/api/2/r/buyict">BuyICT</a>.
              </p>
            </div>
          </AUpageAlert>
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
