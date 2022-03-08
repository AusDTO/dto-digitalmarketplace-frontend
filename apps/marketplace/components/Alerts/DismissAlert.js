import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import dismissStyles from './DismissAlert.scss'

class DismissAlert extends Component {
  constructor(props) {
    super(props)
    this.handleDismissClick = this.handleDismissClick.bind(this)
    this.state = {
      isDismissed: false,
      alerts: null
    }
  }

  componentDidMount = () => {
    const savedAlerts = DismissAlert.getAlerts()
    const dismissed = this.isAlertDismissed(savedAlerts)
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ alerts: savedAlerts, isDismissed: dismissed })
  }

  static getAlerts() {
    const defaultAlerts = '{}'
    if (typeof window !== 'undefined') {
      const savedAlerts = window.localStorage.getItem('dm_alerts')
      if (savedAlerts === null) {
        window.localStorage.setItem('dm_alerts', defaultAlerts)
      } else return JSON.parse(savedAlerts)
    }
    return JSON.parse(defaultAlerts)
  }

  isAlertDismissed(alerts) {
    if (alerts === null) return false
    return alerts[this.props.id] === undefined ? false : alerts[this.props.id]
  }

  handleDismissClick() {
    const updatedAlerts = this.state.alerts
    updatedAlerts[this.props.id] = true
    this.setState({ isDismissed: true })
    this.setState({ alerts: updatedAlerts })
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('dm_alerts', JSON.stringify(this.state.alerts))
    }
  }

  render = () => {
    const { children, as, dismissLabel, className } = this.props

    return (
      <React.Fragment>
        {!this.state.isDismissed && (
          <AUpageAlert as={as} className={`${dismissStyles.container} ${className}`}>
            <div>{children}</div>
            <div>
              <button className={`au-btn au-btn--secondary`} onClick={this.handleDismissClick}>
                {dismissLabel}
              </button>
            </div>
          </AUpageAlert>
        )}
      </React.Fragment>
    )
  }
}

DismissAlert.defaultProps = {
  id: null,
  as: 'info',
  dismissLabel: 'Dismiss'
}

DismissAlert.propTypes = {
  id: PropTypes.string.isRequired,
  as: PropTypes.string,
  dismissLabel: PropTypes.string
}

export default DismissAlert
