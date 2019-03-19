import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './SellerDashboard.scss'

const Header = props => (
  <div className={`${styles.header} row`}>
    <div className="col-sm-12">
      <div className={`row`}>
        <div className="col-xs-12 col-md-12">
          <nav className={styles.dashNav}>
            <ul className={styles.menu}>
              <li>
                <NavLink id="team-link" to="/" activeClassName={styles.active} exact>
                  Team
                </NavLink>
              </li>
              <li>
                <NavLink id="notifications-link" to="/notifications" activeClassName={styles.active} exact>
                  Notifications
                  {props.messages && props.messages.items.length !== 0 ? (
                    <span className={styles.notification}>
                      <div className={styles.count}>{props.messages && props.messages.items.length}</div>
                    </span>
                  ) : (
                    ''
                  )}
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
