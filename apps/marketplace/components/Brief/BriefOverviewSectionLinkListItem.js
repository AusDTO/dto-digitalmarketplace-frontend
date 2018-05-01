import React, { Component } from 'react'

import styles from './BriefOverviewSectionLinkListItem.scss'

export class BriefOverviewSectionLinkListItemComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { complete, path, text } = this.props

    return (
      <li>
        {complete === true &&
          <span className={styles.tick}>
            <img src="/static/svg/green-tick.svg" alt="Completed" />
          </span>}
        {path === undefined
          ? text
          : <a href={path}>
              {text}
            </a>}
      </li>
    )
  }
}

const BriefOverviewSectionLinkListItem = BriefOverviewSectionLinkListItemComponent

export default BriefOverviewSectionLinkListItem
