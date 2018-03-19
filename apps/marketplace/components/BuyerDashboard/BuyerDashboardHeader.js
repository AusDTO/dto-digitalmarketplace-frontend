import React from 'react'
import { connect } from 'react-redux'
import LinkList from '@gov.au/link-list/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './BuyerDashboard.scss'

const BuyerDashboardHeader = props =>
  <div className={styles.container}>
    <div className={`${styles.header} row`}>
      <div className="col-md-12 col-sm-12">
        <small className={styles.organisation}>
          {props.organisation}
        </small>
        <h1 className="uikit-display-5">Dashboard</h1>
        <div className="row">
          <div className={`${styles.alignRight} col-xs-12`}>
            <LinkList
              inline
              items={[
                {
                  link: `${rootPath}/buyer-dashboard`,
                  text: 'My briefs',
                  onClick: e => {
                    e.preventDefault()
                    props.history.push(`${rootPath}/buyer-dashboard`)
                  }
                },
                {
                  link: `${rootPath}/buyer-dashboard/team-briefs`,
                  text: 'Team briefs',
                  onClick: e => {
                    e.preventDefault()
                    props.history.push(`${rootPath}/buyer-dashboard/team-briefs`)
                  }
                },
                {
                  link: `${rootPath}/buyer-dashboard/team-overview`,
                  text: 'Team overview',
                  onClick: e => {
                    e.preventDefault()
                    props.history.push(`${rootPath}/buyer-dashboard/team-overview`)
                  }
                }
              ]}
            />
            <a className={`${styles.firstButton} uikit-btn`} href="#url">
              Start a new brief
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

const mapStateToProps = state => ({
  organisation: state.dashboard.buyerDashboardOrganisation
})

export default connect(mapStateToProps)(BuyerDashboardHeader)
