import React, { Component } from 'react'

import AUheading from '@gov.au/headings'
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
        <div className={styles.briefOverviewSectionHeading}>
          <AUheading size="3" level="2" text={`${number}.`} />
          <AUheading size="3" level="2" text={title} />
        </div>
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
