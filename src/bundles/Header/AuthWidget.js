import React from 'react'
import RegisterComponent from '../../RegisterComponent'
import { returnPath } from './helper'

export const AuthWidget = (props, history) => {

    const _path = returnPath(history);

    if (props.isAuthenticated) {
        return (
            <ul className="inline-links--inverted">
                <li><a href={props.dashboardUrl}>{props.dashboardText}</a></li>
                <li><a href={props.logoutUrl}>Sign out</a></li>
            </ul>
        )
    }

    return (
    <ul className="inline-links--inverted">
        <li><a href={props.registerUrl}>{props.registerText}</a></li>
        <li><a href={props.loginUrl.concat(_path)}>Sign in</a></li>
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
