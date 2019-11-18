import React from 'react'
import format from 'date-fns/format'
import Feedback from 'marketplace/components/Feedback/Feedback'
import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import BriefResponseSubmittedSummary2 from './BriefResponseSubmittedSummary2'

const getSubmittedResponses = responses => responses.filter(response => response.status === 'submitted')

const BriefSpecialistResponseSubmitted2 = ({
  setFocus,
  briefResponses,
  briefResponseStatus,
  specialistGivenNames,
  specialistSurname,
  brief,
  match,
  app,
  handleSubmit
}) => (
  <div className="row">
    <DocumentTitle title="Brief Response Submitted - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12" role="region" aria-live="polite">
        <article role="main">
          <AUpageAlert as="success" setFocus={setFocus}>
            {specialistGivenNames && specialistSurname && briefResponseStatus && (
              <h1 className="au-display-lg">
                {briefResponseStatus === 'draft' && (
                  <span>
                    You have submitted {getSubmittedResponses(briefResponses).length} specialist
                    {getSubmittedResponses(briefResponses).length === 1 ? '' : 's'} for this opportunity.
                  </span>
                )}
                {briefResponseStatus === 'submitted' && (
                  <span>
                    You have successfully updated {specialistGivenNames} {specialistSurname}&apos;s response
                  </span>
                )}
              </h1>
            )}
            <p>
              {getSubmittedResponses(briefResponses).length < parseInt(brief.numberOfSuppliers, 10)
                ? `You can submit ${parseInt(brief.numberOfSuppliers, 10) -
                    getSubmittedResponses(briefResponses).length} more before the closing date (${format(
                    new Date(brief.applicationsClosedAt),
                    'MMMM Do, YYYY'
                  )})`
                : `This opportunity closes on ${format(new Date(brief.applicationsClosedAt), 'MMMM Do, YYYY')}`}
            </p>
          </AUpageAlert>
          {getSubmittedResponses(briefResponses).length < parseInt(brief.numberOfSuppliers, 10) && (
            <p>
              <a className="au-btn right-button-margin" href={`/2/brief/${match.params.briefId}/specialist2/respond`}>
                Add another specialist
              </a>
            </p>
          )}
          <h2 className="au-display-lg">What happens next?</h2>
          <br />
          <BriefResponseSubmittedSummary2 brief={brief} />
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

BriefSpecialistResponseSubmitted2.defaultProps = {
  setFocus: () => {},
  briefResponses: [],
  briefResponseStatus: '',
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
  briefResponseStatus: PropTypes.string,
  specialistGivenNames: PropTypes.string,
  specialistSurname: PropTypes.string,
  app: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default BriefSpecialistResponseSubmitted2
