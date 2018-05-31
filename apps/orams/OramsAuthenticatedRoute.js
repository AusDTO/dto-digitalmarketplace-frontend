import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import LoadingIndicator from 'shared/LoadingIndicator/LoadingIndicator'
import { rootPath } from 'orams/routes'
import FrameworkError from 'shared/FrameworkError/FrameworkError'

const PrivateRouteComponent = props => {
  const { component: Component, loggedIn, frameworkError, customRedirectPath, currentlySending, ...rest } = props
  return (
    <Route
      {...rest}
      render={values => {
        if (frameworkError) {
          return <FrameworkError framework="ORAMS" {...values} />
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
  currentlySending: false
}

PrivateRouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  customRedirectPath: PropTypes.string,
  currentlySending: PropTypes.bool
}

const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn,
  currentlySending: state.app.currentlySending,
  frameworkError: state.app.frameworkError
})

const PrivateRoute = withRouter(connect(mapStateToProps)(PrivateRouteComponent))

export default PrivateRoute
