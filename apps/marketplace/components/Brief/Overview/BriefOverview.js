import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AUheading from '@gov.au/headings/lib/js/react.js'
import BriefOverviewSection from './BriefOverviewSection'

import styles from './BriefOverview.scss'

export class BriefOverview extends Component {
  static propTypes = {
    sections: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { sections, title } = this.props

    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className={styles.overviewHeading}>
            <span className={styles.overview}>Overview</span>
            <AUheading className={styles.briefTitle} size="xl" level="1">
              {title}
            </AUheading>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-12">
              <ol className={`${styles.briefOverviewSections}`}>
                {sections.map(section =>
                  <BriefOverviewSection key={`section.${section.title}`} links={section.links} title={section.title} />
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BriefOverview
