import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import styles from './SellerDashboard.scss'

const Header = props => (
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
                <NavLink id="notifications-link" to="/" activeClassName={styles.active} exact>
                  Notifications {props.messages && props.messages.items.length}
                </NavLink>
              </li>
              <li>
                <NavLink id="team-link" to="/team" activeClassName={styles.active}>
                  Team
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
)

export default Header
