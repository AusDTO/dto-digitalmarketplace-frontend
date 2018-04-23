import React, { Component } from 'react'

import Header from '@gov.au/headings/lib/js/react.js'
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
          <Header size="3" level="2" text={`${number}.`} />
          <Header size="3" level="2" text={title} />
          <span className={styles.briefOverviewSectionStatus}>
            {status}
          </span>
        </div>
        <BriefOverviewSectionList links={links} />
      </div>
    )
  }
}

const BriefOverviewSection = BriefOverviewSectionComponent

export default BriefOverviewSection
