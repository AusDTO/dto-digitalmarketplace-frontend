import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { AUcallout } from '@gov.au/callout/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import EvaluationCriteria from './EvalutationCriteria'
import QuestionAnswer from './QuestionAnswer'
import OpportunityInfoCard from './OpportunityInfoCard'
import styles from './Opportunity.scss'

const Opportunity = props => (
  <div>
    <div className="row">
      <div className={`col-xs-12 ${props.brief.status === 'draft' ? `col-sm-12` : `col-sm-8`}`}>
        {props.brief.status === 'draft' && (
          <AUcallout description="This is a preview of what invited sellers can see.">
            This is a preview of what invited sellers can see.
            <a href={`${rootPath}/buyer-rfq/${props.brief.id}/introduction`} className={styles.publishBtn}>
              Publish brief
            </a>
          </AUcallout>
        )}
        <small className={styles.organisation}>{props.brief.organisation}</small>
        <span>
          <AUheading level="1" size="xl">
            {props.brief.title}
          </AUheading>
        </span>
        <div className={styles.details}>
          <div className="row">
            <div className="col-xs-12 col-sm-3">
              <strong>Estimated start date</strong>
            </div>
            <div className="col-xs-12 col-sm-9">{props.brief.startDate}</div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-3">
              <strong>Length of contract</strong>
            </div>
            <div className="col-xs-12 col-sm-9">{props.brief.contractLength}</div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-3">
              <strong>Budget range</strong>
            </div>
            <div className="col-xs-12 col-sm-9">{props.brief.budgetRange}</div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-3">
              <strong>Location of work</strong>
            </div>
            <div className="col-xs-12 col-sm-9">
              {props.brief.location.map(location => (
                <span key={location}>
                  {location}
                  <br />
                </span>
              ))}
            </div>
          </div>
        </div>
        <AUheading level="2" size="lg">
          Summary
        </AUheading>
        <p className={styles.newLines}>{props.brief.summary}</p>
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
        <ul>
          {props.brief.responseTemplate.map(responseTemplate => (
            <li key={responseTemplate}>
              <a href={`/api/2/brief/${props.brief.id}/attachments/${responseTemplate}`}>Response template</a>
            </li>
          ))}
        </ul>
        <AUheading level="3" size="sm">
          Buyers will later request
        </AUheading>
        <ul>
          {props.brief.evaluationType.map(evaluationType => {
            if (evaluationType === 'Response template') {
              return null
            }
            return <li key={evaluationType}>{evaluationType}</li>
          })}
          {props.brief.proposalType.map(proposalType => <li key={proposalType}>{proposalType}</li>)}
        </ul>
        <EvaluationCriteria
          evaluationCriteria={props.brief.evaluationCriteria}
          showWeightings={props.brief.includeWeightings}
        />
        <QuestionAnswer questions={props.brief.clarificationQuestions} />
      </div>
      {props.brief.status !== 'draft' && (
        <div className="col-xs-12 col-sm-4">
          <OpportunityInfoCard
            sellersInvited={props.invitedSellerCount}
            sellersApplied={props.briefResponseCount}
            closingDate={props.brief.dates.closing_time}
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
    clarificationQuestions: []
  },
  briefResponseCount: 0,
  invitedSellerCount: 0
}

Opportunity.propTypes = {
  brief: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    organisation: PropTypes.string,
    dates: PropTypes.shape({
      closing_time: PropTypes.string,
      questions_closing_date: PropTypes.string,
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
    clarificationQuestions: PropTypes.array
  }),
  briefResponseCount: PropTypes.number,
  invitedSellerCount: PropTypes.number
}

export default Opportunity
