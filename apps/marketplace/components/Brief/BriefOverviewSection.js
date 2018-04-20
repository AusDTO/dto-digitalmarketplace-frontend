import React, { Component } from 'react'

import BriefOverviewSectionList from './BriefOverviewSectionList'

import styles from './BriefOverviewSection.scss'

export class BriefOverviewSectionComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { links, number, status, title } = this.props

    return (
      <div className={styles.briefOverviewSection}>
        <h2 className={styles.briefOverviewSectionNumber}>
          {number}.
        </h2>
        <h2>
          {title}
        </h2>
        <span className={styles.briefOverviewSectionStatus}>
          {status}
        </span>
        <BriefOverviewSectionList links={links} />
      </div>
    )
  }
}

const BriefOverviewSection = BriefOverviewSectionComponent

export default BriefOverviewSection
