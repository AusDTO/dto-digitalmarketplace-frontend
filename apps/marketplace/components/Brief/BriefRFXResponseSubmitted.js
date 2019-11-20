import React from 'react'
import Feedback from 'marketplace/components/Feedback/Feedback'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'

const BriefRFXResponseSubmitted = props => (
  <div className="row">
    <DocumentTitle title="Brief Response Submitted - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          {!props.app.feedbackSuccess && (
            <AUpageAlert as="success">
              <AUheading level="4" size="md">
                {props.briefResponseStatus === 'draft' && <span>Your response has been successfully submitted.</span>}
                {props.briefResponseStatus === 'submitted' && <span>Your have updated your response.</span>}
              </AUheading>
              <p>
                The buyer receives all submitted responses after the opportunity closes. You can{' '}
                <a href={`${rootPath}/brief/${props.briefId}/rfx/respond/${props.briefResponseId}`}>
                  update your response
                </a>{' '}
                any time before the closing date.
              </p>
              <p>
                <a href={`${rootPath}/brief/${props.briefId}/rfx/respond/${props.briefResponseId}`} className="au-btn">
                  Edit your response
                </a>
              </p>
            </AUpageAlert>
          )}
          <br />
          <Feedback
            app={props.app}
            handleSubmit={props.handleSubmit}
            difficultyQuestion="How easy or difficult was it for you to respond to this opportunity?"
            commentQuestion="How would you improve responding to an opportunity?"
            objectAction="responded_to"
          />
        </article>
      </div>
    </DocumentTitle>
  </div>
)

export default BriefRFXResponseSubmitted
