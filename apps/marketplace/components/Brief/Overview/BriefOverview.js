import React, { Component } from 'react'

import Header from '@gov.au/headings/lib/js/react.js'
import BriefOverviewSection from './BriefOverviewSection'

import styles from './BriefOverview.scss'

export class BriefOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { sections } = this.props

    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <span className={styles.overview}>Overview</span>
          <Header size="5" level="1" text={this.props.title} />
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-12">
              <ol className={`${styles.briefOverviewSections}`}>
                {sections.map(section =>
                  <BriefOverviewSection
                    key={`section.${section.title}`}
                    links={section.links}
                    status=""
                    title={section.title}
                  />
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
