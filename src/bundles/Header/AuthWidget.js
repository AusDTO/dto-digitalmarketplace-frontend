import React from 'react'
import RegisterComponent from '../../RegisterComponent'

export const AuthWidget = (props) => {
  if (props.isAuthenticated) {
    return (
      <ul className="inline-links--inverted">
        <li><a href={props.dashboardUrl}>Dashboard</a></li>
        <li><a href={props.logoutUrl}>Log out</a></li>
      </ul>
    )
  }

  return (
    <ul className="inline-links--inverted">
      <li><a href={props.registerUrl}>Register</a></li>
      <li><a href={props.loginUrl}>Log in</a></li>
    </ul>
  )
}

export default new RegisterComponent({ 'auth-header': AuthWidget })
