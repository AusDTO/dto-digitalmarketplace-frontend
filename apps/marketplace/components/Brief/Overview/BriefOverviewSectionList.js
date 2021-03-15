import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AUlinklist from '@gov.au/link-list/lib/js/react.js'

import styles from './BriefOverviewSectionList.scss'

export class BriefOverviewSectionListComponent extends Component {
  static propTypes = {
    links: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      showLinks: true
    }
  }

  preventDefault = e => {
    e.preventDefault()
  }

  toggle = () => {
    this.setState(prevState => ({
      showLinks: !prevState.showLinks
    }))
  }

  buildLinkListItem = link => {
    const item = {
      li: {
        'data-complete': link.complete
      },
      text: link.text
    }

    if (link.path) {
      if (link.permissionNeeded) {
        item.link = `${rootPath}/request-access/${link.permissionNeeded}`
      } else {
        item.link = link.path
      }
    }

    return item
  }

  render() {
    const { links } = this.props

    return (
      <div className={styles.briefOverviewSectionLinks}>
        <button
          className={styles.linkListToggle}
          onClick={this.toggle}
          onMouseDown={this.preventDefault}
          title={this.state.showLinksText}
        >
          {this.state.showLinks ? 'Hide' : 'Show'}
        </button>
        {this.state.showLinks && (
          <AUlinklist className={styles.linkList} items={links.map(link => this.buildLinkListItem(link))} />
        )}
      </div>
    )
  }
}

const BriefOverviewSectionList = BriefOverviewSectionListComponent

export default BriefOverviewSectionList
