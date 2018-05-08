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
      showLinks: false
    }
  }

  preventDefault = e => {
    e.preventDefault()
  }

  toggle = () => {
    this.setState({
      showLinks: !this.state.showLinks
    })
  }

  buildLinkListItem = link => {
    const item = {
      li: {
        className: 'linkListItem',
        'data-complete': link.complete
      },
      text: link.text
    }

    if (link.path) item.link = link.path

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
        <AUlinklist
          className={`${styles.linkList} ${!this.state.showLinks && styles.hidden}`}
          items={links.map(link => this.buildLinkListItem(link))}
        />
      </div>
    )
  }
}

const BriefOverviewSectionList = BriefOverviewSectionListComponent

export default BriefOverviewSectionList
