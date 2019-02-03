import React from 'react'
import { NavLink } from 'react-router-dom'
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
      <div className="row" />
      <div className={`${styles.menuRow} row`}>
        <div className="col-xs-12 col-md-8">
          <nav className={styles.dashNav}>
            <ul className={styles.menu}>
              <li>
                <NavLink id="team-link" to="/" activeClassName={styles.active} exact>
                  People
                </NavLink>
              </li>
              <li>
                <NavLink id="notifications-link" to="/notifications" activeClassName={styles.active} exact>
                  Notifications
                  <span className={styles.notification}>
                    <div className={styles.circle} />
                    <div className={styles.count}>{props.messages && props.messages.items.length}</div>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink id="notifications-link" to="/services" activeClassName={styles.active} exact>
                  Services
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-xs-12 col-md-4">
          <a href={`/supplier/${props.supplier.code}`} className="au-btn right-button-margin">
            View profile
          </a>
          <a href="/sellers/edit" className="au-btn au-btn--secondary">
            Edit profile
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default Header
