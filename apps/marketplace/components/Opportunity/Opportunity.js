import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import format from 'date-fns/format'
import EvaluationCriteria from './EvalutationCriteria'
import QuestionAnswer from './QuestionAnswer'
import OpportunityInfoCard from './OpportunityInfoCard'
import styles from './Opportunity.scss'

// defining default brief data up here so render() has access to it
const defaultBriefProps = {
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
}

const getClosingTime = brief => {
  if (brief.dates.closing_time) {
    return brief.dates.closing_time
  } else if (brief.closedAt) {
    return brief.closedAt
  }
  return null
}

const getTrimmedFilename = fileName => {
  let newFileName = fileName
  if (fileName.length > 32) {
    // build a limited version of the file name, taking out chars from the middle
    newFileName = `${fileName.substring(0, 14)}...${fileName.substring(fileName.length - 15)}`
  }
  return newFileName
}

const Opportunity = props => {
  const { briefResponseCount, invitedSellerCount, isInvitedSeller, isBriefOwner, loggedIn, hasResponded } = props
  const brief = { ...defaultBriefProps, ...props.brief }
  return (
    <div>
      <div className="row">
        <div className={`col-xs-12 ${brief.status === 'draft' ? `col-md-9` : `col-md-8`}`}>
          {brief.status === 'draft' && (
            <div className={styles.previewNotice}>
              <div>
                <p>This is a preview of what invited sellers can see.</p>
              </div>
              <div className={styles.previewButtons}>
                <a href={`${rootPath}/buyer-rfx/${brief.id}/review`} className="au-btn au-btn--secondary">
                  Edit
                </a>
                <a href={`${rootPath}/buyer-rfx/${brief.id}/review`} className="au-btn">
                  Proceed to publish
                </a>
              </div>
            </div>
          )}
          <small className={styles.organisation}>{brief.organisation}</small>
          <span>
            <AUheading level="1" size="xl">
              {brief.title}
            </AUheading>
          </span>
          <div className={styles.details}>
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <strong>Opportunity ID</strong>
              </div>
              <div className="col-xs-12 col-sm-8">{brief.id}</div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <strong>Estimated start date</strong>
              </div>
              <div className="col-xs-12 col-sm-8">{brief.startDate}</div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <strong>Length of contract</strong>
              </div>
              <div className="col-xs-12 col-sm-8">{brief.contractLength}</div>
            </div>
            {brief.contractExtensions && (
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <strong>Contract extensions</strong>
                </div>
                <div className="col-xs-12 col-sm-8">{brief.contractExtensions}</div>
              </div>
            )}
            {brief.budgetRange && (
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <strong>Budget range</strong>
                </div>
                <div className="col-xs-12 col-sm-8">{brief.budgetRange}</div>
              </div>
            )}
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <strong>Location of work</strong>
              </div>
              <div className="col-xs-12 col-sm-8">
                {brief.location.map(location => (
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
              <div className="col-xs-12 col-sm-8">{brief.workingArrangements}</div>
            </div>
            {getClosingTime(brief) && (
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <strong>Application closing date</strong>
                </div>
                <div className="col-xs-12 col-sm-8">
                  {format(getClosingTime(brief), 'dddd D MMMM YYYY')} at 6PM (in Canberra)
                </div>
              </div>
            )}
          </div>
          <AUheading level="2" size="lg">
            Summary
          </AUheading>
          <p>{brief.summary}</p>
          {loggedIn &&
            (isInvitedSeller || isBriefOwner) && (
              <AUheading level="3" size="sm">
                Additional information
              </AUheading>
            )}
          {isBriefOwner && <p className={styles.buyerNotice}>Only invited sellers can view documents:</p>}
          {loggedIn &&
            (isInvitedSeller || isBriefOwner) && (
              <ul>
                {brief.requirementsDocument.map(requirementsDocument => (
                  <li key={requirementsDocument}>
                    <a href={`/api/2/brief/${brief.id}/attachments/${requirementsDocument}`}>Requirements document</a>
                  </li>
                ))}
                {brief.attachments.map(attachment => (
                  <li key={attachment}>
                    <a
                      href={`/api/2/brief/${brief.id}/attachments/${attachment}`}
                      aria-label={attachment}
                      title={attachment}
                    >
                      {getTrimmedFilename(attachment)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          {loggedIn &&
            (isInvitedSeller || isBriefOwner) && (
              <AUheading level="3" size="sm">
                What sellers need to submit
              </AUheading>
            )}
          {loggedIn &&
            (isInvitedSeller || isBriefOwner) && (
              <ul className={styles.submitList}>
                {brief.responseTemplate.map(responseTemplate => (
                  <li key={responseTemplate}>
                    <a href={`/api/2/brief/${brief.id}/attachments/${responseTemplate}`}>Response template</a>
                  </li>
                ))}
                {brief.evaluationType.includes('Written proposal') &&
                  brief.proposalType.length > 0 && (
                    <li>
                      Written proposal, including:
                      <ul>{brief.proposalType.map(proposalType => <li key={proposalType}>{proposalType}</li>)}</ul>
                    </li>
                  )}
              </ul>
            )}
          {loggedIn &&
            (isInvitedSeller || isBriefOwner) &&
            (brief.evaluationType.includes('Demonstration') || brief.evaluationType.includes('Presentation')) && (
              <div>
                <AUheading level="3" size="sm">
                  Buyers will later request
                </AUheading>
                <ul>
                  {brief.evaluationType.includes('Demonstration') && <li>Demonstration</li>}
                  {brief.evaluationType.includes('Presentation') && <li>Presentation</li>}
                </ul>
              </div>
            )}
          <EvaluationCriteria evaluationCriteria={brief.evaluationCriteria} showWeightings={brief.includeWeightings} />
          {brief.industryBriefing &&
            (isInvitedSeller || isBriefOwner) && (
              <div>
                <span />
                <AUheading level="2" size="lg">
                  Industry briefing
                </AUheading>
                {isBriefOwner && (
                  <p className={styles.buyerNotice}>Only invited sellers can view details of the industry briefing:</p>
                )}
                <p>{brief.industryBriefing}</p>
              </div>
            )}
          <QuestionAnswer
            questions={brief.clarificationQuestions}
            questionsClosingDate={brief.dates.questions_close}
            clarificationQuestionsAreClosed={brief.clarificationQuestionsAreClosed}
            briefId={brief.id}
            showAskQuestionInfo={isInvitedSeller}
          />
        </div>
        {brief.status !== 'draft' && (
          <div className="col-xs-12 col-md-4">
            <OpportunityInfoCard
              sellersInvited={invitedSellerCount}
              sellersApplied={briefResponseCount}
              closingDate={brief.dates.closing_time}
              isInvitedSeller={isInvitedSeller}
              hasResponded={hasResponded}
              briefId={brief.id}
              loggedIn={loggedIn}
            />
          </div>
        )}
      </div>
    </div>
  )
}

Opportunity.defaultProps = {
  brief: defaultBriefProps,
  briefResponseCount: 0,
  invitedSellerCount: 0,
  isInvitedSeller: false,
  isBriefOwner: false,
  hasResponded: false,
  loggedIn: false
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
    location: PropTypes.array,
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
  isBriefOwner: PropTypes.bool,
  hasResponded: PropTypes.bool,
  loggedIn: PropTypes.bool
}

export default Opportunity
