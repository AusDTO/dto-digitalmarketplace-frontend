import React from 'react'
import format from 'date-fns/format'
import Feedback from 'marketplace/components/Feedback/Feedback'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

const BriefRFXResponseSubmitted = props => (
  <div className="row">
    <DocumentTitle title="Brief Response Submitted - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          {!props.app.feedbackSuccess && (
            <AUpageAlert as="success">
              <AUheading level="4" size="md">
                Thanks, your response has been successfully submitted.
              </AUheading>
              <p>
                {props.brief.sellerSelector && props.brief.sellerSelector === 'oneSeller' ? (
                  <span>
                    The buyer will receive your response once the brief closes{props.brief.applicationsClosedAt && (
                      <span> on {format(new Date(props.brief.applicationsClosedAt), 'DD MMMM YYYY')}</span>
                    )}.
                  </span>
                ) : (
                  <span>
                    The buyer will receive all responses once the brief closes{props.brief.applicationsClosedAt && (
                      <span> on {format(new Date(props.brief.applicationsClosedAt), 'DD MMMM YYYY')}</span>
                    )}.
                  </span>
                )}
              </p>
              <br />
            </AUpageAlert>
          )}
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

export default BriefRFXResponseSubmitted
