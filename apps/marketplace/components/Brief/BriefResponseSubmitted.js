/* eslint-disable */
import React from 'react'
import format from 'date-fns/format'
import Icon from 'shared/Icon'
import Feedback from 'marketplace/components/Feedback/Feedback'
import DocumentTitle from 'react-document-title'

import PageAlert from '@gov.au/page-alerts'
import styles from './BriefResponseSubmitted.scss'

const BriefResponseSubmitted = props =>
  <div className="row">
    <DocumentTitle title="Brief Response Submitted - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          <PageAlert as="success" setFocus={props.setFocus}>
            <h1 className="uikit-display-3"><strong>You have submitted {props.specialistNumber} specialist for this opportunity.</strong></h1>
            <p>You can submit {3 - props.specialistNumber} more before the closing date ({format(new Date(props.brief.applicationsClosedAt), 'MMMM Do, YYYY')})</p>
          </PageAlert>
          <a href="/2/seller-dashboard" className="uikit-btn right-button-margin">
            Track your submission
          </a>
          <a href="#">
            Add another specialist
          </a>
          <h2 className="uikit-display-2">
            <br/>
            <br/>
            <b>How did you find submitting this application?</b>
          </h2>
          <Feedback
            app={props.app}
            handleSubmit={props.handleSubmit}
            commentQuestion="How would you improve this experience?"
            objectAction="responded_to"
          />
        </article>
      </div>
    </DocumentTitle>
  </div>

export default BriefResponseSubmitted
