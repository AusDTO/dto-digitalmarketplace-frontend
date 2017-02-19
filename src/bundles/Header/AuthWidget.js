import React from 'react'
import RegisterComponent from '../../RegisterComponent'

export const AuthWidget = (props) => {
    if (props.isAuthenticated) {
        return (
            <ul className="inline-links--inverted">
                <li><a href={props.dashboardUrl}>{props.dashboardText}</a></li>
                <li><a href={props.logoutUrl}>Log out</a></li>
            </ul>
        )
    }

    return (
        <ul className="inline-links--inverted">
            <li><a href={props.registerUrl}>{props.registerText}</a></li>
            <li><a href={props.loginUrl}>Log in</a></li>
        </ul>
    )
}

AuthWidget.propTypes = {
    registerUrl: React.PropTypes.string,
    registerText: React.PropTypes.string,
    loginUrl: React.PropTypes.string,
    dashboardUrl: React.PropTypes.string,
    logoutUrl: React.PropTypes.string,
    isAuthenticated: React.PropTypes.bool
}

AuthWidget.defaultProps = {
    registerText: 'Register',
    dashboardText: 'Dashboard'
}

export default new RegisterComponent({'auth-header': AuthWidget})
