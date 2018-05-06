import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BriefOverviewSectionLinkList from './BriefOverviewSectionLinkList'

import styles from './BriefOverviewSectionList.scss'

export class BriefOverviewSectionListComponent extends Component {
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
        <div className={`${!this.state.showLinks && styles.hidden}`}>
          <BriefOverviewSectionLinkList items={links} />
        </div>
      </div>
    )
  }
}

BriefOverviewSectionListComponent.propTypes = {
  links: PropTypes.array.isRequired
}

const BriefOverviewSectionList = BriefOverviewSectionListComponent

export default BriefOverviewSectionList
