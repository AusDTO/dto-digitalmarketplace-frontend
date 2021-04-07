import React from 'react'
import format from 'date-fns/format'
import Feedback from 'marketplace/components/Feedback/Feedback'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import BriefResponseSubmittedSummary2 from './BriefResponseSubmittedSummary2'

const getSubmittedResponses = responses => responses.filter(response => response.status === 'submitted')

const getResponsesLeft = (allowed, briefResponses) =>
  parseInt(allowed, 10) - getSubmittedResponses(briefResponses).length

const BriefSpecialistResponseSubmitted2 = ({
  setFocus,
  briefResponse,
  briefResponses,
  briefResponsePreviousStatus,
  brief,
  match,
  app,
  handleSubmit
}) => (
  <div className="row">
    <DocumentTitle title="Opportunity Response Submitted - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12" role="region" aria-live="polite">
        <article role="main">
          <AUpageAlert as="success" setFocus={setFocus}>
            {briefResponse.specialistGivenNames && briefResponse.specialistSurname && briefResponsePreviousStatus && (
              <h1 className="au-display-lg">
                {briefResponsePreviousStatus === 'draft' && (
                  <span>
                    You have successfully submitted {briefResponse.specialistGivenNames}{' '}
                    {briefResponse.specialistSurname} for this opportunity.
                  </span>
                )}
                {briefResponsePreviousStatus === 'submitted' && (
                  <span>
                    You have successfully updated {briefResponse.specialistGivenNames} {briefResponse.specialistSurname}
                    &apos;s response
                  </span>
                )}
              </h1>
            )}
            <p>
              {getSubmittedResponses(briefResponses).length < parseInt(brief.numberOfSuppliers, 10) && (
                <React.Fragment>
                  You can{' '}
                  <a href={`/2/brief/${match.params.briefId}/responses`}>
                    submit {getResponsesLeft(brief.numberOfSuppliers, briefResponses)} more candidate
                    {getResponsesLeft(brief.numberOfSuppliers, briefResponses) > 1 && 's'}
                  </a>{' '}
                  before the closing date ({format(new Date(brief.applicationsClosedAt), 'MMMM Do, YYYY')})
                </React.Fragment>
              )}
              {getSubmittedResponses(briefResponses).length === parseInt(brief.numberOfSuppliers, 10) && (
                <React.Fragment>
                  You can <a href={`/2/brief/${match.params.briefId}/responses`}>edit your candidates</a> before the
                  closing date ({format(new Date(brief.applicationsClosedAt), 'MMMM Do, YYYY')})
                </React.Fragment>
              )}
            </p>
          </AUpageAlert>
          {getSubmittedResponses(briefResponses).length < parseInt(brief.numberOfSuppliers, 10) && (
            <p>
              <a className="au-btn right-button-margin" href={`/2/brief/${match.params.briefId}/responses`}>
                Edit or submit candidates
              </a>
            </p>
          )}
          {briefResponsePreviousStatus === 'draft' && (
            <React.Fragment>
              <h2 className="au-display-lg">What happens next?</h2>
              <br />
              <BriefResponseSubmittedSummary2 brief={brief} />
            </React.Fragment>
          )}
          <h2 className="au-display-lg">How did you find submitting this application?</h2>
          <br />
          <Feedback
            app={app}
            handleSubmit={handleSubmit}
            difficultyQuestion="How easy or difficult was it for you to respond to this opportunity?"
            commentQuestion="How would you improve this experience?"
            objectAction="responded_to"
          />
        </article>
      </div>
    </DocumentTitle>
  </div>
)

BriefSpecialistResponseSubmitted2.defaultProps = {
  setFocus: () => {},
  briefResponses: [],
  briefResponsePreviousStatus: '',
  specialistGivenNames: '',
  specialistSurname: '',
  brief: {},
  app: {},
  handleSubmit: () => {},
  match: { params: {} }
}

BriefSpecialistResponseSubmitted2.propTypes = {
  setFocus: PropTypes.func.isRequired,
  brief: PropTypes.object.isRequired,
  briefResponses: PropTypes.array.isRequired,
  briefResponsePreviousStatus: PropTypes.string,
  specialistGivenNames: PropTypes.string,
  specialistSurname: PropTypes.string,
  app: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default BriefSpecialistResponseSubmitted2
