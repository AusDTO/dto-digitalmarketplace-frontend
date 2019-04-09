import React from 'react'
import format from 'date-fns/format'
import Feedback from 'marketplace/components/Feedback/Feedback'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

const BriefATMResponseSubmitted = props => (
  <div className="row">
    <DocumentTitle title="Brief Response Submitted - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          <AUpageAlert as="success">
            <AUheading level="4" size="md">
              Thanks, your response has been successfully submitted.
            </AUheading>
            <p>
              The buyer receives all submitted responses once the brief closes
              {props.brief.applicationsClosedAt && (
                <span> on {format(new Date(props.brief.applicationsClosedAt), 'dddd D MMMM YYYY')}</span>
              )}
              .
            </p>
          </AUpageAlert>
          <br />
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

export default BriefATMResponseSubmitted
