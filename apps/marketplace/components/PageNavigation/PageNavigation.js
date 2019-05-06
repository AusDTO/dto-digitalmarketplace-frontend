import React from 'react'

import styles from './PageNavigation.scss'

const PageNavigation = props => (
  <div className={`${styles.pageNav} row`}>
    <div className="col-sm-12">
      <nav>
        <ul>{props.links.map(link => <li key={link.key}>{link}</li>)}</ul>
      </nav>
    </div>
  </div>
)

export default PageNavigation
