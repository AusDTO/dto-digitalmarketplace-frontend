import React, { Component } from 'react'

import BriefOverviewSection from './BriefOverviewSection'

import styles from './BriefOverview.scss'

export class BriefOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { isOutcome, isSpecialist } = this.props

    const publishYourBriefPath = `/buyers/frameworks/${this.props.framework}/requirements/${this.props.lot}/${this.props
      .briefId}`

    const publishYourBriefLinks = [
      ...(isOutcome
        ? [
            {
              link: `${publishYourBriefPath}/edit/title/title`,
              text: 'Title'
            }
          ]
        : []),
      ...(isSpecialist
        ? [
            {
              link: `${publishYourBriefPath}/edit/role/title`,
              text: 'Role'
            }
          ]
        : []),
      {
        link: `${publishYourBriefPath}/edit/location/location`,
        text: 'Location'
      },
      {
        link: `${publishYourBriefPath}/description-of-work`,
        text: 'Description of work'
      },
      {
        link: `${publishYourBriefPath}/shortlist-and-evaluation-process`,
        text: 'Shortlist and evaluation process'
      },
      {
        link: `${publishYourBriefPath}/edit/how-long-your-brief-will-be-open/requirementsLength`,
        text: 'How long your brief will be open'
      },
      {
        link: `${publishYourBriefPath}/question-and-answer-session-details`,
        text: 'Question and answer session details'
      },
      {
        link: `${publishYourBriefPath}/edit/who-can-respond/specifySeller`,
        text: 'Who can respond'
      },
      {
        link: `${publishYourBriefPath}/publish`,
        text: 'Review and publish your requirements'
      }
    ]

    return (
      <div className={`${styles.header} row`}>
        <div className="col-md-12 col-sm-12">
          <small className={styles.organisation}>Overview</small>
          <h1 className="uikit-display-5">
            {this.props.title}
          </h1>
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-9">
              <BriefOverviewSection
                number="1"
                title="Publish your brief"
                status="In progress"
                links={publishYourBriefLinks}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BriefOverview
