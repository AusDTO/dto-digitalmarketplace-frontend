import React, { Component } from 'react'
import { connect } from 'react-redux'
import { rootPath } from 'marketplace/routes'
import styles from './BuyerDashboard.scss'

class BuyerDashboardHeader extends Component {
  constructor(props) {
    super(props)
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick(e) {
    e.preventDefault()
    const targetEl = e.currentTarget
    this.props.history.push(targetEl.getAttribute('href'))
  }

  render() {
    return (
      <div className={`${styles.header} row`}>
        <div className="col-md-12 col-sm-12">
          <small className={styles.organisation}>
            {this.props.organisation}
          </small>
          <h1 className="uikit-display-5">Dashboard</h1>
          <div className="row">
            <div className="col-xs-9">
              <ul className={styles.menu}>
                <li>
                  <a
                    id="my-briefs-link"
                    href={`${rootPath}/buyer-dashboard`}
                    className={this.props.location.pathname === `${rootPath}/buyer-dashboard` ? styles.active : ''}
                    onClick={this.handleMenuClick}
                  >
                    My briefs
                  </a>
                </li>
                <li>
                  <a
                    id="team-briefs-link"
                    href={`${rootPath}/buyer-dashboard/team-briefs`}
                    className={
                      this.props.location.pathname === `${rootPath}/buyer-dashboard/team-briefs` ? styles.active : ''
                    }
                    onClick={this.handleMenuClick}
                  >
                    Team briefs
                  </a>
                </li>
                <li>
                  <a
                    id="team-overview-link"
                    href={`${rootPath}/buyer-dashboard/team-overview`}
                    className={
                      this.props.location.pathname === `${rootPath}/buyer-dashboard/team-overview` ? styles.active : ''
                    }
                    onClick={this.handleMenuClick}
                  >
                    Team overview
                  </a>
                </li>
              </ul>
            </div>
            <div className={`${styles.alignRight} col-xs-3`}>
              <a className={`${styles.firstButton} uikit-btn`} href="#url">
                Start a new brief
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  organisation: state.dashboard.buyerDashboardOrganisation
})

export default connect(mapStateToProps)(BuyerDashboardHeader)
