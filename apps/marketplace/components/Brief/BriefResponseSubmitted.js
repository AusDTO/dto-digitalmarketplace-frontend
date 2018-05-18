import React from 'react'
import Feedback from 'marketplace/components/Feedback/Feedback'
import DocumentTitle from 'react-document-title'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import BriefResponseSubmittedSummary from './BriefResponseSubmittedSummary'

const BriefResponseSubmitted = props => (
  <div className="row">
    <DocumentTitle title="Brief Response Submitted - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          <AUpageAlert as="success" setFocus={props.setFocus}>
            <h4>Thanks for your application, your brief response has been sent to the buyer</h4>
          </AUpageAlert>
          <h1 className="au-display-lg">
            <b>What happens next?</b>
          </h1>
          <BriefResponseSubmittedSummary {...props} />
          <h2 className="au-display-lg">
            <b>Help make this service simpler, clearer, faster.</b>
          </h2>
          <Feedback
            app={props.app}
            handleSubmit={props.handleSubmit}
            difficultyQuestion="How easy or difficult was it for you to respond to this brief?"
            commentQuestion="How would you improve responding to a brief?"
            objectAction="responded_to"
          />
        </article>
      </div>
    </DocumentTitle>
  </div>
)

export default BriefResponseSubmitted
