import React from 'react'
import PropTypes from 'prop-types'
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
                <NavLink id="opportunities-link" to="/" activeClassName={styles.active} exact>
                  Opportunities
                </NavLink>
              </li>
              {props.showCategoriesTab && (
                <li>
                  <NavLink id="categories-link" to="/categories" activeClassName={styles.active} exact>
                    Categories
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink id="team-link" to="/team" activeClassName={styles.active} exact>
                  Team
                </NavLink>
              </li>
              <li>
                <NavLink id="notifications-link" to="/notifications" activeClassName={styles.active} exact>
                  Notifications
                  {props.messages && props.messages.items.length !== 0 ? (
                    <div className={styles.notification}>{props.messages && props.messages.items.length}</div>
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

Header.defaultProps = {
  showCategoriesTab: true
}

Header.propTypes = {
  showCategoriesTab: PropTypes.bool
}

export default Header
