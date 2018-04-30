import React, { Component } from 'react'

import styles from './BriefOverviewSectionLinkListItem.scss'

export class BriefOverviewSectionLinkListItemComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { complete, link, text } = this.props

    // const listItemStyle = (complete) => ({
    //   margin-left: complete ? '-2.1rem' : ''
    // })

    return (
      <li>
        {complete === true &&
          <span className={styles.tick}>
            <img src="/static/svg/green-tick.svg" alt="Completed" />
          </span>}
        {link === undefined
          ? text
          : <a href={link}>
              {text}
            </a>}
      </li>
    )
  }
}

const BriefOverviewSectionLinkListItem = BriefOverviewSectionLinkListItemComponent

export default BriefOverviewSectionLinkListItem
