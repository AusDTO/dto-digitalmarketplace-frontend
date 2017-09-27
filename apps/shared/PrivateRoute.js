/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

const PrivateRouteComponent = props => {
  const { component: Component, loggedIn, customRedirectPath, currentlySending, ...rest } = props
  return (
    <Route
      {...rest}
      render={values =>
        loggedIn || currentlySending
          ? <Component {...values} />
          : <Redirect
              to={{
                pathname: customRedirectPath ? customRedirectPath : '/2/login',
                state: { from: values.location }
              }}
            />}
    />
  )
}

PrivateRouteComponent.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn,
  currentlySending: state.app.currentlySending
})

const PrivateRoute = withRouter(connect(mapStateToProps)(PrivateRouteComponent))

export default PrivateRoute
