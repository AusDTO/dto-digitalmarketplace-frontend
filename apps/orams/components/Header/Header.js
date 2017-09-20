import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { rootPath } from 'orams/routes'

import styles from 'orams/components/Header/Header.scss'

const Header = props =>
  <div>
    <section className={styles.marketplaceHeader}>
      <div className={styles.wrapper}>
        <div className={styles.userNav}>
          <div id="react-bundle-auth-header-state" />
          <div id="react-bundle-auth-header">
            <ul data-reactroot="" id="main-navigation" className={styles.inlineLinks}>
              <li>
                {props.loggedIn
                  ? <Link to={`${rootPath}/logout`}>Sign out</Link>
                  : <Link to={`${rootPath}/login`}>Sign in</Link>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = ({ app }) => ({
  loggedIn: app.loggedIn
})

export default connect(mapStateToProps)(Header)
