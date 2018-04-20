import React, { Component } from 'react'

import AULinkList from '@gov.au/link-list'

import styles from './BriefOverviewSectionList.scss'

export class BriefOverviewSectionListComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { links } = this.props

    return (
      <div className={styles.briefOverviewSectionLinks}>
        <AULinkList items={links} />
      </div>
    )
  }
}

const BriefOverviewSectionList = BriefOverviewSectionListComponent

export default BriefOverviewSectionList
