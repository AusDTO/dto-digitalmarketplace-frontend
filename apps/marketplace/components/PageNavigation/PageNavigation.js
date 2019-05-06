import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './PageNavigation.scss'

const PageNavigation = props => (
  <div className={`${styles.pageNav} row`}>
    <div className="col-sm-12">
      <nav>
        <ul className={styles.pageNavList}>
          {props.links.map(link => (
            <li key={link.text}>
              <NavLink activeClassName={styles.active} id={link.id} to={link.to} exact={link.exact}>
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </div>
)

export default PageNavigation
