import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { rootPath } from 'marketplace/routes'
import styles from './BuyerDashboard.scss'

export const BuyerDashboardHeader = props =>
  <div className={`${styles.header} row`}>
    <div className="col-md-12 col-sm-12">
      <small className={styles.organisation}>
        {props.organisation}
      </small>
      <h1 className="uikit-display-5">Dashboard</h1>
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-md-9">
          <ul className={styles.menu}>
            <li>
              <NavLink id="my-briefs-link" to="/" activeClassName={styles.active} exact>
                My briefs
              </NavLink>
            </li>
            <li>
              <NavLink id="team-briefs-link" to="/team-briefs" activeClassName={styles.active}>
                Team briefs
              </NavLink>
            </li>
            <li>
              <NavLink id="team-overview-link" to="/team-overview" activeClassName={styles.active}>
                Team overview
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={`${styles.alignRight} col-xs-12 col-sm-4 col-md-3`}>
          <a className={`${styles.firstButton} uikit-btn`} href={`${rootPath}/create-brief`}>
            Start a new brief
          </a>
        </div>
      </div>
    </div>
  </div>

export default withRouter(BuyerDashboardHeader)
