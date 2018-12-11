import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import NoticeBar from 'marketplace/components/NoticeBar/NoticeBar'
import NotVisible from 'marketplace/components/Icons/NotVisible/NotVisible'
import { getLastQuestionDate } from 'marketplace/components/BuyerRFX/BuyerRFXReviewStage'
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
  status: '',
  summary: '',
  startDate: '',
  location: [],
  contractLength: '',
  budgetRange: '',
  keyDates: '',
  securityClearance: '',
  sellerCategory: '',
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

const getBriefCategory = (domains, briefCategory) => {
  const category = domains.find(domain => domain.id === briefCategory)
  return category ? category.name : null
}

const Opportunity = props => {
  const {
    briefResponseCount,
    invitedSellerCount,
    isInvitedSeller,
    isBriefOwner,
    loggedIn,
    hasResponded,
    isBuyer,
    domains
  } = props
  const brief = { ...defaultBriefProps, ...props.brief }
  const category = getBriefCategory(domains, brief.sellerCategory)
  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-md-8">
          {brief.status === 'draft' && (
            <NoticeBar className={styles.previewNotice}>
              <div>
                <p>This is a preview of what invited sellers will see.</p>
              </div>
              <div className={styles.previewButtons}>
                <a href={`${rootPath}/buyer-rfx/${brief.id}/review`} className="au-btn au-btn--secondary">
                  Edit
                </a>
                <a href={`${rootPath}/buyer-rfx/${brief.id}/review`} className="au-btn">
                  Proceed to publish
                </a>
              </div>
            </NoticeBar>
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
                <strong>Budget range</strong>
              </div>
              <div className="col-xs-12 col-sm-8">{brief.budgetRange || 'None specified'}</div>
            </div>
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
            {brief.keyDates && (
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <strong>Key dates or milestones</strong>
                </div>
                <div className="col-xs-12 col-sm-8">{brief.keyDates}</div>
              </div>
            )}
            {brief.securityClearance && (
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <strong>Security clearance</strong>
                </div>
                <div className="col-xs-12 col-sm-8">{brief.securityClearance}</div>
              </div>
            )}
            {category && (
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <strong>Panel category</strong>
                </div>
                <div className="col-xs-12 col-sm-8">{category}</div>
              </div>
            )}
          </div>
          <AUheading level="2" size="lg">
            Summary
          </AUheading>
          <p>{brief.summary}</p>
          {loggedIn &&
            (isInvitedSeller || isBuyer) && (
              <AUheading level="2" size="lg">
                Additional information
              </AUheading>
            )}
          {isBriefOwner && (
            <div className={styles.noticeBar}>
              <NotVisible colour="#00698F" className={styles.noticeBarIcon} />
              <span>
                Only invited sellers and other buyers can view attached documents. Only invited sellers can view
                industry briefing details you provide.
              </span>
            </div>
          )}
          {loggedIn &&
            (isInvitedSeller || isBuyer) && (
              <div className={isBriefOwner ? styles.additionalInfoOwner : styles.additionalInfo}>
                {(brief.requirementsDocument.length > 0 || brief.attachments.length > 0) && (
                  <ul>
                    {brief.requirementsDocument.map(requirementsDocument => (
                      <li key={requirementsDocument}>
                        <a href={`/api/2/brief/${brief.id}/attachments/${requirementsDocument}`}>
                          Requirements document
                        </a>
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
                {(brief.responseTemplate.length > 0 || brief.evaluationType.length > 0) && (
                  <AUheading level="3" size="sm">
                    What sellers need to submit
                  </AUheading>
                )}
                {(brief.responseTemplate.length > 0 || brief.evaluationType.length > 0) && (
                  <ul className={styles.submitList}>
                    {brief.responseTemplate.map(responseTemplate => (
                      <li key={responseTemplate}>
                        Completed{' '}
                        <a href={`/api/2/brief/${brief.id}/attachments/${responseTemplate}`}>response template</a>
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
                {(brief.evaluationType.includes('Demonstration') || brief.evaluationType.includes('Presentation')) && (
                  <AUheading level="3" size="sm">
                    Buyers will later request
                  </AUheading>
                )}
                {(brief.evaluationType.includes('Demonstration') || brief.evaluationType.includes('Presentation')) && (
                  <ul>
                    {brief.evaluationType.includes('Demonstration') && <li>Demonstration</li>}
                    {brief.evaluationType.includes('Presentation') && <li>Presentation</li>}
                  </ul>
                )}
                {brief.industryBriefing &&
                  (isInvitedSeller || isBriefOwner) && (
                    <AUheading level="3" size="sm">
                      Industry briefing
                    </AUheading>
                  )}
                {brief.industryBriefing && (isInvitedSeller || isBriefOwner) && <p>{brief.industryBriefing}</p>}
              </div>
            )}
          <EvaluationCriteria evaluationCriteria={brief.evaluationCriteria} showWeightings={brief.includeWeightings} />
          <QuestionAnswer
            questions={brief.clarificationQuestions}
            questionsClosingDate={
              brief.dates.questions_close
                ? new Date(brief.dates.questions_close)
                : getLastQuestionDate(new Date(getClosingTime(brief) || ''))
            }
            clarificationQuestionsAreClosed={brief.clarificationQuestionsAreClosed}
            briefId={brief.id}
            showAskQuestionInfo={isInvitedSeller}
          />
        </div>
        <div className="col-xs-12 col-md-4">
          <OpportunityInfoCard
            sellersInvited={invitedSellerCount}
            sellersApplied={briefResponseCount}
            isClosed={brief.status === 'closed'}
            closingDate={getClosingTime(brief)}
            isInvitedSeller={isInvitedSeller}
            hasResponded={hasResponded}
            briefId={brief.id}
            loggedIn={loggedIn}
          />
        </div>
      </div>
    </div>
  )
}

Opportunity.defaultProps = {
  brief: defaultBriefProps,
  domains: [],
  briefResponseCount: 0,
  invitedSellerCount: 0,
  isInvitedSeller: false,
  isBriefOwner: false,
  isBuyer: false,
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
    status: PropTypes.string,
    summary: PropTypes.string,
    startDate: PropTypes.string,
    location: PropTypes.array,
    contractLength: PropTypes.string,
    keyDates: PropTypes.string,
    securityClearance: PropTypes.string,
    sellerCategory: PropTypes.string,
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
  domains: PropTypes.array,
  briefResponseCount: PropTypes.number,
  invitedSellerCount: PropTypes.number,
  isInvitedSeller: PropTypes.bool,
  isBriefOwner: PropTypes.bool,
  isBuyer: PropTypes.bool,
  hasResponded: PropTypes.bool,
  loggedIn: PropTypes.bool
}

export default Opportunity
