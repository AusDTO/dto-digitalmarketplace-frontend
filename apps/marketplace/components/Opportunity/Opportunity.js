import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import AUheading from '@gov.au/headings/lib/js/react.js'
import OpportunityDetail from './OpportunityDetail'
import EvaluationCriteria from './EvalutationCriteria'
import styles from './Opportunity.scss'

const Opportunity = props => (
  <div>
    <div className="row">
      <div className="col-xs-12">
        <small className={styles.organisation}>{props.brief.organisation}</small>
        <span>
          <AUheading level="1" size="xxl">
            {props.brief.title}
          </AUheading>
        </span>
        <OpportunityDetail label="Opportunity ID">{props.brief.id}</OpportunityDetail>
        <OpportunityDetail label="Deadline for asking questions">
          {format(new Date(props.brief.dates.questions_closing_date), 'D MMMM')}
        </OpportunityDetail>
        <OpportunityDetail label="Closing date for applications">
          {format(new Date(props.brief.dates.closing_date), 'D MMMM')}
        </OpportunityDetail>
        <OpportunityDetail label="Published">
          {format(new Date(props.brief.dates.published_date), 'D MMMM')}
        </OpportunityDetail>
        <AUheading level="2" size="xl">
          Overview
        </AUheading>
        <OpportunityDetail label="Summary" newLines>
          {props.brief.summary}
        </OpportunityDetail>
        <OpportunityDetail label="Estimated start date">{props.brief.startDate}</OpportunityDetail>
        <OpportunityDetail label="Location">
          {props.brief.location.map(location => (
            <span key={location}>
              {location}
              <br />
            </span>
          ))}
        </OpportunityDetail>
        <OpportunityDetail label="Contact length" newLines>
          {props.brief.contractLength}
        </OpportunityDetail>
        <OpportunityDetail label="Budget range" newLines>
          {props.brief.budgetRange}
        </OpportunityDetail>
        <AUheading level="2" size="xl">
          How to respond
        </AUheading>
        <OpportunityDetail label="Response format">
          {props.brief.evaluationType.map(evaluationType => (
            <span key={evaluationType}>
              {evaluationType}
              <br />
            </span>
          ))}
        </OpportunityDetail>
        <EvaluationCriteria evaluationCriteria={props.brief.evaluationCriteria} />
        <AUheading level="2" size="xl">
          Detailed information
        </AUheading>
        <OpportunityDetail label="RFQ document">
          {props.brief.requirementsDocument.map(requirementsDocument => (
            <span key={requirementsDocument}>
              <a href={`/api/2/brief/${props.brief.id}/attachments/${requirementsDocument}`}>Download document</a>
              <br />
            </span>
          ))}
        </OpportunityDetail>
        {props.brief.responseTemplate.length > 0 && (
          <OpportunityDetail label="Response template">
            {props.brief.responseTemplate.map(responseTemplate => (
              <span key={responseTemplate}>
                <a href={`/api/2/brief/${props.brief.id}/attachments/${responseTemplate}`}>Download template</a>
                <br />
              </span>
            ))}
          </OpportunityDetail>
        )}
        <OpportunityDetail label="Industry briefing" newLines>
          {props.brief.industryBriefing}
        </OpportunityDetail>
        <AUheading level="2" size="xl">
          Seller questions
        </AUheading>
        {props.brief.clarificationQuestions.length > 0 && (
          <div>
            {props.brief.clarificationQuestions.map((qa, i) => (
              <OpportunityDetail key={qa.question} label={`${i + 1}. ${qa.question}`} strongLabels={false} newLines>
                {qa.answer}
              </OpportunityDetail>
            ))}
          </div>
        )}
        {props.brief.clarificationQuestions.length === 0 && <p>No questions have been asked or answered yet.</p>}
      </div>
    </div>
  </div>
)

Opportunity.defaultProps = {
  brief: {
    id: 0,
    title: '',
    organisation: '',
    dates: {
      closing_date: '',
      questions_closing_date: '',
      published_date: ''
    },
    summary: '',
    startDate: '',
    location: [],
    contractLength: '',
    budgetRange: '',
    evaluationCriteria: [],
    evaluationType: [],
    requirementsDocument: [],
    responseTemplate: [],
    industryBriefing: '',
    clarificationQuestions: []
  }
}

Opportunity.propTypes = {
  brief: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    organisation: PropTypes.string,
    dates: PropTypes.shape({
      closing_date: PropTypes.string,
      questions_closing_date: PropTypes.string,
      published_date: PropTypes.string
    }),
    summary: PropTypes.string,
    startDate: PropTypes.string,
    Location: PropTypes.array,
    contractLength: PropTypes.string,
    budgetRange: PropTypes.string,
    evaluationCriteria: PropTypes.array,
    evaluationType: PropTypes.array,
    requirementsDocument: PropTypes.array,
    responseTemplate: PropTypes.array,
    industryBriefing: PropTypes.string,
    clarificationQuestions: PropTypes.array
  })
}

export default Opportunity
