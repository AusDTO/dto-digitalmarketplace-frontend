import React, { Component } from 'react'

import BriefOverviewSectionLinkListItem from './BriefOverviewSectionLinkListItem'

import styles from './BriefOverviewSectionLinkList.scss'

export class BriefOverviewSectionLinkListComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { items } = this.props

    return (
      <ul className={styles.briefOverviewSectionLinkList}>
        {items.map(item => <BriefOverviewSectionLinkListItem key={`item.${item.text}`} {...item} />)}
      </ul>
    )
  }
}

const BriefOverviewSectionLinkList = BriefOverviewSectionLinkListComponent

export default BriefOverviewSectionLinkList
