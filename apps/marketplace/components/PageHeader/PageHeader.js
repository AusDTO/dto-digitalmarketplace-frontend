import React from 'react'
import styles from './PageHeader.scss'

class PageHeader extends React.PureComponent {
  render() {
    const { actions, organisation, title } = this.props

    return (
      <div className={`${styles.pageHeader} row`}>
        <div className="col-lg-6 col-md-9 col-sm-12">
          <small>{organisation}</small>
          <h1 className={`au-display-xl ${styles.title}`}>{title}</h1>
        </div>
        <div className="col-lg-6 col-md-3 col-sm-12">
          <div className={styles.actions}>{actions.map(action => action)}</div>
        </div>
      </div>
    )
  }
}

export default PageHeader
