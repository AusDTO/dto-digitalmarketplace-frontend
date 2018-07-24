import React from 'react'
import format from 'date-fns/format'
import Feedback from 'marketplace/components/Feedback/Feedback'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import BriefResponseSubmittedSummary from './BriefResponseSubmittedSummary'

const BriefSpecialistResponseSubmitted = ({ setFocus, briefResponses, brief, match, app, handleSubmit }) => (
  <div className="row">
    <DocumentTitle title="Brief Response Submitted - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12" role="region" aria-live="polite">
        <article role="main">
          <AUpageAlert as="success" setFocus={setFocus}>
            <h1 className="au-display-lg">
              <strong>
                You have submitted {briefResponses.length} specialist{briefResponses.length === 1 ? '' : 's'} for this
                opportunity.
              </strong>
            </h1>
            <p>
              {briefResponses.length < 3
                ? `You can submit ${3 - briefResponses.length} more before the closing date (${format(
                    new Date(brief.applicationsClosedAt),
                    'MMMM Do, YYYY'
                  )})`
                : `This opportunity closes on ${format(new Date(brief.applicationsClosedAt), 'MMMM Do, YYYY')}`}
            </p>
          </AUpageAlert>
          {briefResponses.length < 3 && (
            <p>
              <a className="au-btn right-button-margin" href={`/2/brief/${match.params.briefId}/specialist/respond`}>
                Add another specialist
              </a>
            </p>
          )}
          <h2 className="au-display-lg">What happens next?</h2>
          <br />
          <BriefResponseSubmittedSummary brief={brief} />
          <h2 className="au-display-lg">How did you find submitting this application?</h2>
          <br />
          <Feedback
            app={app}
            handleSubmit={handleSubmit}
            difficultyQuestion="How easy or difficult was it for you to respond to this brief?"
            commentQuestion="How would you improve this experience?"
            objectAction="responded_to"
          />
        </article>
      </div>
    </DocumentTitle>
  </div>
)

BriefSpecialistResponseSubmitted.defaultProps = {
  setFocus: () => {},
  briefResponses: [],
  brief: {},
  app: {},
  handleSubmit: () => {},
  match: { params: {} }
}

BriefSpecialistResponseSubmitted.propTypes = {
  setFocus: PropTypes.func.isRequired,
  brief: PropTypes.object.isRequired,
  briefResponses: PropTypes.array.isRequired,
  app: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default BriefSpecialistResponseSubmitted
