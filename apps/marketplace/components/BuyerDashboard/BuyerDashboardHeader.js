import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './BuyerDashboard.scss'

const BuyerDashboardHeader = props => (
  <div className={`${styles.header} row`}>
    <div className="col-sm-12">
      <small className={styles.organisation}>{props.organisation}</small>
      <div className="row">
        <div className="col-xs-12">
          <h1 className="au-display-xl">Dashboard</h1>
        </div>
      </div>
      <div className={`${styles.menuRow} row`}>
        <div className="col-xs-12 col-md-8">
          <nav className={styles.dashNav}>
            <ul className={styles.menu}>
              <li>
                <NavLink id="my-briefs-link" to="/" activeClassName={styles.active} exact>
                  My opportunities
                </NavLink>
              </li>
              <li>
                <NavLink id="team-briefs-link" to="/team-briefs" activeClassName={styles.active}>
                  Team opportunities
                </NavLink>
              </li>
              <li>
                <NavLink id="team-overview-link" to="/team-overview" activeClassName={styles.active}>
                  Team overview
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={`${styles.dashActions} ${styles.createNew} col-xs-12 col-md-4 buyer-dashboard-actions`}>
          <AUaccordion header="Create new request" closed>
            <ul>
              <li>
                <a href="/buyers/frameworks/digital-marketplace/requirements/digital-professionals">Specialist</a>
              </li>
              <li>
                <a href={`${rootPath}/outcome-choice`}>Outcome</a>
              </li>
              <li>
                <a href="/buyers/frameworks/digital-marketplace/requirements/training">Training</a>
              </li>
            </ul>
          </AUaccordion>
        </div>
      </div>
    </div>
  </div>
)

export default withRouter(BuyerDashboardHeader)
