import React from 'react'
import styles from './Header.scss'

const Header = () =>
  <section className={styles.marketplaceHeader}>
    <div className={styles.wrapper}>
      <div className={styles.userNav}>
        <div id="react-bundle-auth-header-state" />
        <div id="react-bundle-auth-header">
          <ul data-reactroot="" id="main-navigation" className={styles.inlineLinks}>
            <li>
              <a href="/login">Sign in</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

export default Header
