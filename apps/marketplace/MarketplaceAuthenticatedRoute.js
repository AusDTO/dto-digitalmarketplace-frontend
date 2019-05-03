import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import LoadingIndicator from 'shared/LoadingIndicator/LoadingIndicator'
import { rootPath } from 'marketplace/routes'
import FrameworkError from 'shared/FrameworkError/FrameworkError'

const PrivateRouteComponent = props => {
  const {
    component: Component,
    loggedIn,
    customRedirectPath,
    frameworkError,
    currentlySending,
    userType,
    restrictedTo,
    ...rest
  } = props
  return (
    <Route
      {...rest}
      render={values => {
        if (frameworkError) {
          return <FrameworkError framework="Digital Marketplace" {...values} />
        }

        if (restrictedTo && loggedIn && userType !== restrictedTo) {
          return <FrameworkError framework={restrictedTo} {...values} />
        }

        if (loggedIn) {
          return <Component {...values} />
        }

        return currentlySending ? (
          <LoadingIndicator />
        ) : (
          <Redirect
            to={{
              pathname: customRedirectPath || `${rootPath}/login`,
              state: { from: values.location }
            }}
          />
        )
      }}
    />
  )
}

PrivateRouteComponent.defaultProps = {
  customRedirectPath: null,
  currentlySending: false,
  restrictedTo: null
}

PrivateRouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  customRedirectPath: PropTypes.string,
  currentlySending: PropTypes.bool,
  restrictedTo: PropTypes.oneOf(['buyer', 'supplier', 'admin'])
}

const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn,
  userType: state.app.userType,
  currentlySending: state.app.currentlySending,
  frameworkError: state.app.frameworkError
})

const PrivateRoute = withRouter(connect(mapStateToProps)(PrivateRouteComponent))

export default PrivateRoute
