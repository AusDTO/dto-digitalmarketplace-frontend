import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import EvaluationCriteria from './EvalutationCriteria'
import QuestionAnswer from './QuestionAnswer'
import OpportunityInfoCard from './OpportunityInfoCard'
import styles from './Opportunity.scss'

const Opportunity = props => (
  <div>
    <div className="row">
      <div className={`col-xs-12 ${props.brief.status === 'draft' ? `col-md-9` : `col-md-8`}`}>
        {props.brief.status === 'draft' && (
          <div className={styles.previewNotice}>
            <div className="row">
              <div className="col-xs-12 col-sm-7">
                <p>This is a preview of what invited sellers can see.</p>
              </div>
              <div className={`${styles.previewButtons} col-xs-12 col-sm-5`}>
                <a
                  href={`${rootPath}/buyer-rfx/${props.brief.id}/introduction`}
                  className={`${styles.publishBtn} au-btn au-btn--secondary`}
                >
                  Edit
                </a>
                <a href={`${rootPath}/buyer-rfx/${props.brief.id}/review`} className={`${styles.publishBtn} au-btn`}>
                  Proceed to publish
                </a>
              </div>
            </div>
          </div>
        )}
        <small className={styles.organisation}>{props.brief.organisation}</small>
        <span>
          <AUheading level="1" size="xl">
            {props.brief.title}
          </AUheading>
        </span>
        <div className={styles.details}>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <strong>Opportunity ID</strong>
            </div>
            <div className="col-xs-12 col-sm-8">{props.brief.id}</div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <strong>Estimated start date</strong>
            </div>
            <div className="col-xs-12 col-sm-8">{props.brief.startDate}</div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <strong>Length of contract</strong>
            </div>
            <div className="col-xs-12 col-sm-8">{props.brief.contractLength}</div>
          </div>
          {props.brief.contractExtensions && (
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <strong>Contract extensions</strong>
              </div>
              <div className="col-xs-12 col-sm-8">{props.brief.contractExtensions}</div>
            </div>
          )}
          {props.brief.budgetRange && (
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <strong>Budget range</strong>
              </div>
              <div className="col-xs-12 col-sm-8">{props.brief.budgetRange}</div>
            </div>
          )}
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <strong>Location of work</strong>
            </div>
            <div className="col-xs-12 col-sm-8">
              {props.brief.location.map(location => (
                <span key={location}>
                  {location}
                  <br />
                </span>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <strong>Working arrangements</strong>
            </div>
            <div className="col-xs-12 col-sm-8">{props.brief.workingArrangements}</div>
          </div>
        </div>
        <AUheading level="2" size="lg">
          Summary
        </AUheading>
        <p>{props.brief.summary}</p>
        <AUheading level="3" size="sm">
          Additional information
        </AUheading>
        <ul>
          {props.brief.requirementsDocument.map(requirementsDocument => (
            <li key={requirementsDocument}>
              <a href={`/api/2/brief/${props.brief.id}/attachments/${requirementsDocument}`}>Requirements document</a>
            </li>
          ))}
          {props.brief.attachments.map(attachment => (
            <li key={attachment}>
              <a href={`/api/2/brief/${props.brief.id}/attachments/${attachment}`}>{attachment}</a>
            </li>
          ))}
        </ul>
        <AUheading level="3" size="sm">
          What sellers need to submit
        </AUheading>
        <ul className={styles.submitList}>
          {props.brief.responseTemplate.map(responseTemplate => (
            <li key={responseTemplate}>
              <a href={`/api/2/brief/${props.brief.id}/attachments/${responseTemplate}`}>Response template</a>
            </li>
          ))}
          {props.brief.evaluationType.includes('Written proposal') &&
            props.brief.proposalType.length > 0 && (
              <li>
                Written proposal, including:
                <ul>{props.brief.proposalType.map(proposalType => <li key={proposalType}>{proposalType}</li>)}</ul>
              </li>
            )}
        </ul>
        {(props.brief.evaluationType.includes('Demonstration') ||
          props.brief.evaluationType.includes('Presentation')) && (
          <div>
            <AUheading level="3" size="sm">
              Buyers will later request
            </AUheading>
            <ul>
              {props.brief.evaluationType.includes('Demonstration') && <li>Demonstration</li>}
              {props.brief.evaluationType.includes('Presentation') && <li>Presentation</li>}
            </ul>
          </div>
        )}
        <EvaluationCriteria
          evaluationCriteria={props.brief.evaluationCriteria}
          showWeightings={props.brief.includeWeightings}
        />
        {props.brief.industryBriefing &&
          (props.isInvitedSeller || props.isBriefOwner) && (
            <div>
              <span />
              <AUheading level="2" size="lg">
                Industry briefing
              </AUheading>
              <p>{props.brief.industryBriefing}</p>
            </div>
          )}
        <QuestionAnswer
          questions={props.brief.clarificationQuestions}
          questionsClosingDate={props.brief.dates.questions_close}
          clarificationQuestionsAreClosed={props.brief.clarificationQuestionsAreClosed}
          briefId={props.brief.id}
          showAskQuestionInfo={props.isInvitedSeller}
        />
      </div>
      {props.brief.status !== 'draft' && (
        <div className="col-xs-12 col-md-4">
          <OpportunityInfoCard
            sellersInvited={props.invitedSellerCount}
            sellersApplied={props.briefResponseCount}
            closingDate={props.brief.dates.closing_time}
            isInvitedSeller={props.isInvitedSeller}
            briefId={props.brief.id}
          />
        </div>
      )}
    </div>
  </div>
)

Opportunity.defaultProps = {
  brief: {
    id: 0,
    title: '',
    organisation: '',
    dates: {
      closing_time: '',
      questions_closing_date: '',
      questions_close: '',
      published_date: ''
    },
    summary: '',
    startDate: '',
    location: [],
    contractLength: '',
    budgetRange: '',
    includeWeightings: false,
    evaluationCriteria: [],
    evaluationType: [],
    requirementsDocument: [],
    responseTemplate: [],
    attachments: [],
    proposalType: [],
    industryBriefing: '',
    clarificationQuestions: [],
    clarificationQuestionsAreClosed: true
  },
  briefResponseCount: 0,
  invitedSellerCount: 0,
  isInvitedSeller: false,
  isBriefOwner: false
}

Opportunity.propTypes = {
  brief: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    organisation: PropTypes.string,
    dates: PropTypes.shape({
      closing_time: PropTypes.string,
      questions_closing_date: PropTypes.string,
      questions_close: PropTypes.string,
      published_date: PropTypes.string
    }),
    summary: PropTypes.string,
    startDate: PropTypes.string,
    Location: PropTypes.array,
    contractLength: PropTypes.string,
    budgetRange: PropTypes.string,
    includeWeightings: PropTypes.bool,
    evaluationCriteria: PropTypes.array,
    evaluationType: PropTypes.array,
    requirementsDocument: PropTypes.array,
    responseTemplate: PropTypes.array,
    attachments: PropTypes.array,
    proposalType: PropTypes.array,
    industryBriefing: PropTypes.string,
    clarificationQuestions: PropTypes.array,
    clarificationQuestionsAreClosed: PropTypes.bool
  }),
  briefResponseCount: PropTypes.number,
  invitedSellerCount: PropTypes.number,
  isInvitedSeller: PropTypes.bool,
  isBriefOwner: PropTypes.bool
}

export default Opportunity
