import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AUheading from '@gov.au/headings/lib/js/react.js'
import BriefOverviewSectionList from './BriefOverviewSectionList'

import styles from './BriefOverviewSection.scss'

export class BriefOverviewSectionComponent extends Component {
  static defaultProps = {
    status: ''
  }

  static propTypes = {
    links: PropTypes.array.isRequired,
    status: PropTypes.string,
    title: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { links, status, title } = this.props

    return (
      <li>
        <AUheading size="lg" level="2">
          {title}
        </AUheading>
        <span className={styles.briefOverviewSectionStatus}>
          {status}
        </span>
        <BriefOverviewSectionList links={links} />
      </li>
    )
  }
}

const BriefOverviewSection = BriefOverviewSectionComponent

export default BriefOverviewSection
