import React from 'react'
import styles from './PageHeader.scss'

class PageHeader extends React.PureComponent {
  render() {
    const { actions, organisation, title } = this.props

    return (
      <div className={`${styles.pageHeader} row`}>
        <div className="col-sm-6">
          <small>{organisation}</small>
          <h1 className={`au-display-xl ${styles.title}`}>{title}</h1>
        </div>
        <div className="col-sm-6">
          <div className={styles.actions}>{actions.map(action => action)}</div>
        </div>
      </div>
    )
  }
}

export default PageHeader
