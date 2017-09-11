import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Header.scss'

class Header extends Component {
  render() {
    return (
      <section className={styles.marketplaceHeader}>
        <div className={styles.wrapper}>
          <div className={styles.userNav}>
            <div id="react-bundle-auth-header-state" />
            <div id="react-bundle-auth-header">
              <ul data-reactroot="" id="main-navigation" className={styles.inlineLinks}>
                <li>
                  {this.props.memberInfo.isAuthenticated
                    ? <span>
                        {this.dashBoardLink()}
                      </span>
                    : <a href="/2/signup">Join the Marketplace</a>}
                </li>
                <li>
                  {this.props.memberInfo.isAuthenticated
                    ? <a href="/logout">Sign out</a>
                    : <a href="/login">Sign in</a>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Header
