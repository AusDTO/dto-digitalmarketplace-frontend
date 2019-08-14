import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import { rootPath } from 'marketplace/routes'
import NotVisible from 'marketplace/components/Icons/NotVisible/NotVisible'
import { getBriefLastQuestionDate, hasPermission } from 'marketplace/components/helpers'
import { AUcallout } from '@gov.au/callout/lib/js/react.js'
import EvaluationCriteria from './EvaluationCriteria'
import QuestionAnswer from './QuestionAnswer'
import OpportunityInfoCard from './OpportunityInfoCard'
import OpportunitySpecialistInfoCard from './OpportunitySpecialistInfoCard'
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
  workAlreadyDone: '',
  endUsers: '',
  backgroundInformation: '',
  outcome: '',
  timeframeConstraints: '',
  clarificationQuestions: [],
  clarificationQuestionsAreClosed: true,
  contactEmail: ''
}

const getClosingTime = brief => {
  if (brief.dates.closing_time) {
    return brief.dates.closing_time
  } else if (brief.closedAt) {
    return brief.closedAt
  }
  return ''
}

const getTrimmedFilename = fileName => {
  let newFileName = fileName
  if (fileName && fileName.length > 32) {
    // build a limited version of the file name, taking out chars from the middle
    newFileName = `${fileName.substring(0, 14)}...${fileName.substring(fileName.length - 15)}`
  }
  return newFileName
}

const getBriefCategory = (domains, briefCategory) => {
  const category = domains.find(domain => domain.id === briefCategory)
  return category ? category.name : null
}

const showATMObjectives = (lotSlug, isBuyer, canRespond) => {
  if (lotSlug === 'atm' && (isBuyer || canRespond)) {
    return true
  }
  return false
}

const Opportunity = props => {
  const {
    briefResponseCount,
    invitedSellerCount,
    supplierBriefResponseCount,
    canRespond,
    isAssessedForCategory,
    isAssessedForAnyCategory,
    hasEvidenceInDraftForCategory,
    hasLatestEvidenceRejectedForCategory,
    draftEvidenceId,
    rejectedEvidenceId,
    isOpenToAll,
    isOpenToCategory,
    isBriefOwner,
    loggedIn,
    hasResponded,
    isBuyer,
    isApprovedSeller,
    isApplicant,
    isRecruiterOnly,
    isAwaitingApplicationAssessment,
    isAwaitingDomainAssessment,
    hasBeenAssessedForBrief,
    domains,
    hasSupplierErrors,
    isInvited,
    hasSignedCurrentAgreement,
    supplierCode,
    isPartOfTeam,
    isTeamLead,
    teams
  } = props
  const brief = { ...defaultBriefProps, ...props.brief }
  const category = getBriefCategory(domains, brief.sellerCategory)
  if (brief.status === 'draft') {
    if (
      !(
        hasPermission(isPartOfTeam, isTeamLead, teams, 'create_drafts') ||
        hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities')
      )
    ) {
      return <Redirect to={`${rootPath}/request-access/create_drafts`} />
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-md-8">
          {brief.status === 'draft' && (
            <AUcallout description="" className={styles.previewNotice}>
              <div>
                <p>This is a preview of what invited sellers will see.</p>
              </div>
              <div className={styles.previewButtons}>
                <a href={`${rootPath}/buyer-${brief.lotSlug}/${brief.id}/review`} className="au-btn au-btn--secondary">
                  Edit
                </a>
                <a href={`${rootPath}/buyer-${brief.lotSlug}/${brief.id}/review`} className="au-btn">
                  Proceed to publish
                </a>
              </div>
            </AUcallout>
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
                <strong>Deadline for asking questions</strong>
              </div>
              <div className="col-xs-12 col-sm-8">
                {format(
                  brief.dates.questions_close
                    ? new Date(brief.dates.questions_close)
                    : getBriefLastQuestionDate(new Date(getClosingTime(brief) || new Date())),
                  'dddd D MMMM YYYY'
                )}{' '}
                at 6PM (in Canberra)
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <strong>Application closing date</strong>
              </div>
              <div className="col-xs-12 col-sm-8">
                {format(getClosingTime(brief) || new Date(), 'dddd D MMMM YYYY')} at 6PM (in Canberra)
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <strong>Published</strong>
              </div>
              <div className="col-xs-12 col-sm-8">
                {format(brief.dates.published_date ? brief.dates.published_date : new Date(), 'dddd D MMMM YYYY')}
              </div>
            </div>
            {category && (
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <strong>{brief.lotSlug === 'specialist' ? 'Category' : 'Panel category'}</strong>
                </div>
                <div className="col-xs-12 col-sm-8">{category}</div>
              </div>
            )}
            {brief.comprehensiveTerms && (
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <strong>Additional terms</strong>
                </div>
                <div className="col-xs-12 col-sm-8">
                  <a href="/api/2/r/comprehensive-terms-current.pdf">Comprehensive terms</a> apply
                </div>
              </div>
            )}
            <AUheading level="2" size="lg">
              Overview
            </AUheading>
            <p className={styles.newLines}>{brief.summary}</p>
            <br />
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <strong>Estimated start date</strong>
              </div>
              <div className="col-xs-12 col-sm-8">
                {brief.lotSlug === 'specialist' ? format(brief.startDate, 'D-MM-YYYY') : brief.startDate}
              </div>
            </div>
            {brief.lotSlug === 'specialist' &&
              brief.maxRate && (
                <div className="row">
                  <div className="col-xs-12 col-sm-4">
                    <strong>
                      {'Maximum '}
                      {brief.preferredFormatForRates ? '' : 'rate'}
                      {brief.preferredFormatForRates === 'dailyRate' ? 'daily' : 'hourly'}
                      {' rate'}
                    </strong>
                  </div>
                  <div className="col-xs-12 col-sm-8">
                    {'$'}
                    {brief.maxRate}
                    {' per '}
                    {brief.preferredFormatForRates === 'dailyRate' ? 'day' : 'hour'}
                    {', including GST'}
                  </div>
                </div>
              )}
            {brief.lotSlug === 'specialist' &&
              brief.budgetRange && (
                <div className="row">
                  <div className="col-xs-12 col-sm-4">
                    <strong>Budget information</strong>
                  </div>
                  <div className="col-xs-12 col-sm-8">{brief.budgetRange}</div>
                </div>
              )}
            {['rfx', 'training2'].includes(brief.lotSlug) && (
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <strong>Budget range</strong>
                </div>
                <div className="col-xs-12 col-sm-8">{brief.budgetRange || 'None specified'}</div>
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
            {['rfx', 'training2'].includes(brief.lotSlug) && (
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <strong>Working arrangements</strong>
                </div>
                <div className="col-xs-12 col-sm-8">{brief.workingArrangements}</div>
              </div>
            )}
            {['rfx', 'training2', 'specialist'].includes(brief.lotSlug) && (
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <strong>Length of contract</strong>
                </div>
                <div className="col-xs-12 col-sm-8">{brief.contractLength}</div>
              </div>
            )}
            {['rfx', 'training2', 'specialist'].includes(brief.lotSlug) &&
              brief.contractExtensions && (
                <div className="row">
                  <div className="col-xs-12 col-sm-4">
                    <strong>Contract extensions</strong>
                  </div>
                  <div className="col-xs-12 col-sm-8">{brief.contractExtensions}</div>
                </div>
              )}
            {['rfx', 'training2'].includes(brief.lotSlug) &&
              brief.securityClearance && (
                <div className="row">
                  <div className="col-xs-12 col-sm-4">
                    <strong>Security clearance</strong>
                  </div>
                  <div className="col-xs-12 col-sm-8">{brief.securityClearance}</div>
                </div>
              )}
            {brief.lotSlug === 'specialist' &&
              brief.securityClearance && (
                <div className="row">
                  <div className="col-xs-12 col-sm-4">
                    <strong>Security clearance</strong>
                  </div>
                  <div className={`col-xs-12 col-sm-8 ${styles.newLines}`}>
                    {brief.securityClearance === 'noneRequired' && 'None required'}
                    {brief.securityClearance === 'abilityToObtain' && (
                      <span>
                        {'Ability to obtain '}
                        {brief.securityClearanceObtain === 'baseline' && 'baseline'}
                        {brief.securityClearanceObtain === 'nv1' && 'negative vetting level 1'}
                        {brief.securityClearanceObtain === 'nv2' && 'negative vetting level 2'}
                        {brief.securityClearanceObtain === 'pv' && 'positive vetting'}
                        {' clearance'}
                      </span>
                    )}
                    {brief.securityClearance === 'mustHave' && (
                      <span>
                        {'Must have current '}
                        {brief.securityClearanceCurrent === 'baseline' && 'baseline'}
                        {brief.securityClearanceCurrent === 'nv1' && 'negative vetting level 1'}
                        {brief.securityClearanceCurrent === 'nv2' && 'negative vetting level 2'}
                        {brief.securityClearanceCurrent === 'pv' && 'positive vetting'}
                        {' clearance'}
                      </span>
                    )}
                    {brief.securityClearance === 'other' && brief.securityClearanceOther}
                  </div>
                </div>
              )}
          </div>
          {showATMObjectives(brief.lotSlug, isBuyer, canRespond) && (
            <AUheading level="2" size="lg">
              Objectives
            </AUheading>
          )}
          {showATMObjectives(brief.lotSlug, isBuyer, canRespond) && (
            <AUheading level="3" size="md">
              Why is the work being done?
            </AUheading>
          )}
          {showATMObjectives(brief.lotSlug, isBuyer, canRespond) && <p>{brief.backgroundInformation}</p>}
          {showATMObjectives(brief.lotSlug, isBuyer, canRespond) && (
            <AUheading level="3" size="md">
              What&apos;s the key problem you need to solve?
            </AUheading>
          )}
          {showATMObjectives(brief.lotSlug, isBuyer, canRespond) && <p>{brief.outcome}</p>}
          {showATMObjectives(brief.lotSlug, isBuyer, canRespond) && (
            <AUheading level="3" size="md">
              Describe the users and their needs
            </AUheading>
          )}
          {showATMObjectives(brief.lotSlug, isBuyer, canRespond) && <p>{brief.endUsers}</p>}
          {showATMObjectives(brief.lotSlug, isBuyer, canRespond) && (
            <AUheading level="3" size="md">
              What work has already been done?
            </AUheading>
          )}
          {showATMObjectives(brief.lotSlug, isBuyer, canRespond) && <p>{brief.workAlreadyDone}</p>}
          {loggedIn &&
            (canRespond || isInvited || isBuyer) &&
            (brief.lotSlug !== 'specialist' || brief.attachments.length > 0) && (
              <AUheading level="2" size="lg">
                Additional information
              </AUheading>
            )}
          {isBriefOwner &&
            !isOpenToAll &&
            brief.lotSlug !== 'specialist' &&
            brief.attachments.length > 0 && (
              <div className={styles.noticeBar}>
                <NotVisible colour="#00698F" className={styles.noticeBarIcon} />
                <span>
                  {'Only invited sellers and other buyers can view attached documents. '}
                  {'Only invited sellers can view industry briefing details you provide.'}
                </span>
              </div>
            )}
          {isBriefOwner &&
            brief.lotSlug === 'specialist' &&
            brief.attachments.length > 0 && (
              <div className={styles.noticeBar}>
                <NotVisible colour="#00698F" className={styles.noticeBarIcon} />
                <span>{'Only invited sellers and other buyers can view attached documents. '}</span>
              </div>
            )}
          {loggedIn &&
            (isOpenToAll || canRespond || isInvited || isBuyer) && (
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
                {brief.lotSlug !== 'specialist' &&
                  (brief.responseTemplate.length > 0 || brief.evaluationType.length > 0) && (
                    <AUheading level="3" size="sm">
                      What sellers need to submit
                    </AUheading>
                  )}
                {brief.lotSlug !== 'specialist' &&
                  (brief.responseTemplate.length > 0 || brief.evaluationType.length > 0) && (
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
                            <ul>
                              {brief.proposalType.map(proposalType => <li key={proposalType}>{proposalType}</li>)}
                            </ul>
                          </li>
                        )}
                      {brief.evaluationType.includes('500 word responses to your criteria') && (
                        <li>500 word responses to your criteria</li>
                      )}
                      {brief.evaluationType.includes('Responses to selection criteria') && (
                        <li>Responses to selection criteria</li>
                      )}
                      {brief.evaluationType.includes('Case study') && <li>Case study</li>}
                      {brief.evaluationType.includes('References') && <li>References</li>}
                      {brief.evaluationType.includes('Résumés') && <li>Résumés</li>}
                    </ul>
                  )}
                {(brief.evaluationType.includes('Demonstration') || brief.evaluationType.includes('Presentation')) && (
                  <AUheading level="3" size="sm">
                    Buyers will later request
                  </AUheading>
                )}
                {(brief.evaluationType.includes('Demonstration') ||
                  brief.evaluationType.includes('Interview') ||
                  brief.evaluationType.includes('Presentation') ||
                  brief.evaluationType.includes('Prototype')) && (
                  <ul>
                    {brief.evaluationType.includes('Demonstration') && <li>Demonstration</li>}
                    {brief.evaluationType.includes('Interview') && <li>Interview</li>}
                    {brief.evaluationType.includes('Presentation') && <li>Presentation</li>}
                    {brief.evaluationType.includes('Prototype') && <li>Prototype</li>}
                  </ul>
                )}
                {brief.industryBriefing &&
                  (canRespond || isInvited || isBriefOwner) && (
                    <AUheading level="3" size="sm">
                      Industry briefing
                    </AUheading>
                  )}
                {brief.industryBriefing && (canRespond || isInvited || isBriefOwner) && <p>{brief.industryBriefing}</p>}
              </div>
            )}
          {brief.evaluationCriteria && brief.evaluationCriteria.length > 0 ? (
            <EvaluationCriteria
              title={brief.lotSlug === 'atm' ? 'Response criteria' : 'Evaluation criteria'}
              evaluationCriteria={brief.evaluationCriteria}
              showWeightings={brief.includeWeightings}
            />
          ) : (
            <React.Fragment>
              <AUheading level="2" size="lg">
                {brief.lotSlug === 'specialist' ? 'Selection' : 'Evaluation'}{' '}criteria
              </AUheading>
              <EvaluationCriteria
                title={'Essential criteria'}
                titleLevel="3"
                titleSize="sm"
                evaluationCriteria={brief.essentialRequirements}
                showWeightings={brief.includeWeightingsEssential}
              />
              {brief.niceToHaveRequirements &&
               brief.niceToHaveRequirements.length > 0 &&
               brief.niceToHaveRequirements[0].criteria && (
                <EvaluationCriteria
                  title={'Desirable criteria'}
                  titleLevel="3"
                  titleSize="sm"
                  evaluationCriteria={brief.niceToHaveRequirements}
                  showWeightings={brief.includeWeightingsNiceToHave}
                />
              )}
            </React.Fragment>
          )}
          {brief.lotSlug === 'specialist' && (
            <React.Fragment>
              <AUheading level="2" size="lg">
                What to submit
              </AUheading>
              <AUheading level="3" size="sm">
                For each candidate, you must include:
              </AUheading>
              <ul>
                <li>start date</li>
                <li>
                  {brief.preferredFormatForRates === 'dailyRate' ? 'daily' : 'hourly'}
                  {' rate (excluding GST)'}
                </li>
                <li>résumé</li>
                <li>responses to the selection criteria (up to 500 words per criteria)</li>
                <li>references (this can be included in their résumé)</li>
                <li>any additional information if requested by {brief.organisation}</li>
              </ul>
              <AUheading level="3" size="sm">
                Candidates will be asked if they:
              </AUheading>
              <ul>
                <li>are eligible to work in Australia</li>
                {brief.securityClearance === 'mustHave' && (
                  <li>
                    {'hold a '}
                    {brief.securityClearanceCurrent === 'baseline' && 'baseline'}
                    {brief.securityClearanceCurrent === 'nv1' && 'negative vetting level 1'}
                    {brief.securityClearanceCurrent === 'nv2' && 'negative vetting level 2'}
                    {brief.securityClearanceCurrent === 'pv' && 'positive vetting'}
                    {' clearance'}
                  </li>
                )}
                <li>have worked for {brief.organisation} in the past</li>
              </ul>
              {(brief.evaluationType.includes('Interviews') ||
                brief.evaluationType.includes('Scenario or tests') ||
                brief.evaluationType.includes('Presentations')) && (
                <React.Fragment>
                  <AUheading level="3" size="sm">
                    Buyers may request:
                  </AUheading>
                  <ul>
                    {brief.evaluationType.includes('Interviews') && <li>interviews</li>}
                    {brief.evaluationType.includes('Scenario or tests') && <li>scenario or tests</li>}
                    {brief.evaluationType.includes('Presentations') && <li>presentations</li>}
                  </ul>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
          <QuestionAnswer
            questions={brief.clarificationQuestions}
            clarificationQuestionsAreClosed={brief.clarificationQuestionsAreClosed}
            briefId={brief.id}
            showAskQuestionInfo={canRespond || isInvited}
          />
        </div>
        <div className="col-xs-12 col-md-4">
          {brief.lotSlug === 'specialist' ? (
            <OpportunitySpecialistInfoCard
              sellersInvited={invitedSellerCount}
              sellersApplied={briefResponseCount}
              sellerResponses={supplierBriefResponseCount}
              isOpen={brief.status === 'live'}
              closingDate={getClosingTime(brief)}
              canRespond={canRespond}
              isInvited={isInvited}
              isOpenToAll={isOpenToAll}
              isAssessedForCategory={isAssessedForCategory}
              hasEvidenceInDraftForCategory={hasEvidenceInDraftForCategory}
              hasLatestEvidenceRejectedForCategory={hasLatestEvidenceRejectedForCategory}
              draftEvidenceId={draftEvidenceId}
              rejectedEvidenceId={rejectedEvidenceId}
              isOpenToCategory={isOpenToCategory}
              hasResponded={hasResponded}
              briefId={brief.id}
              briefLot={brief.lotSlug}
              briefStatus={brief.status}
              loggedIn={loggedIn}
              isBuyer={isBuyer}
              isApprovedSeller={isApprovedSeller}
              isApplicant={isApplicant}
              isRecruiterOnly={isRecruiterOnly}
              isAwaitingApplicationAssessment={isAwaitingApplicationAssessment}
              isAwaitingDomainAssessment={isAwaitingDomainAssessment}
              hasBeenAssessedForBrief={hasBeenAssessedForBrief}
              isBriefOwner={isBriefOwner}
              buyerEmail={brief.contactEmail}
              category={category}
              sellerCategory={brief.sellerCategory}
              evaluationType={brief.evaluationType}
              numberOfSuppliers={brief.numberOfSuppliers}
              hasSupplierErrors={hasSupplierErrors}
              hasSignedCurrentAgreement={hasSignedCurrentAgreement}
              supplierCode={supplierCode}
            />
          ) : (
            <OpportunityInfoCard
              sellersInvited={invitedSellerCount}
              sellersApplied={briefResponseCount}
              isOpen={brief.status === 'live'}
              closingDate={getClosingTime(brief)}
              canRespond={canRespond}
              isOpenToAll={isOpenToAll}
              isAssessedForCategory={isAssessedForCategory}
              isAssessedForAnyCategory={isAssessedForAnyCategory}
              hasEvidenceInDraftForCategory={hasEvidenceInDraftForCategory}
              hasLatestEvidenceRejectedForCategory={hasLatestEvidenceRejectedForCategory}
              draftEvidenceId={draftEvidenceId}
              rejectedEvidenceId={rejectedEvidenceId}
              isOpenToCategory={isOpenToCategory}
              hasResponded={hasResponded}
              briefId={brief.id}
              briefLot={brief.lotSlug}
              briefStatus={brief.status}
              loggedIn={loggedIn}
              isBuyer={isBuyer}
              isApprovedSeller={isApprovedSeller}
              isApplicant={isApplicant}
              isRecruiterOnly={isRecruiterOnly}
              isAwaitingApplicationAssessment={isAwaitingApplicationAssessment}
              isAwaitingDomainAssessment={isAwaitingDomainAssessment}
              hasBeenAssessedForBrief={hasBeenAssessedForBrief}
              isBriefOwner={isBriefOwner}
              buyerEmail={brief.contactEmail}
              category={category}
              sellerCategory={brief.sellerCategory}
              hasSignedCurrentAgreement={hasSignedCurrentAgreement}
              supplierCode={supplierCode}
            />
          )}
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
  supplierBriefResponseCount: 0,
  canRespond: false,
  isInvited: false,
  isAssessedForCategory: false,
  isAssessedForAnyCategory: false,
  hasEvidenceInDraftForCategory: false,
  hasLatestEvidenceRejectedForCategory: false,
  draftEvidenceId: undefined,
  rejectedEvidenceId: undefined,
  isOpenToCategory: false,
  isOpenToAll: false,
  isBriefOwner: false,
  isBuyer: false,
  isApprovedSeller: false,
  isApplicant: false,
  isRecruiterOnly: false,
  isAwaitingApplicationAssessment: false,
  isAwaitingDomainAssessment: false,
  hasBeenAssessedForBrief: false,
  hasResponded: false,
  loggedIn: false,
  hasSupplierErrors: false,
  hasSignedCurrentAgreement: false,
  supplierCode: null
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
    securityClearance: PropTypes.string,
    sellerCategory: PropTypes.string,
    includeWeightings: PropTypes.bool,
    evaluationCriteria: PropTypes.array,
    evaluationType: PropTypes.array,
    requirementsDocument: PropTypes.array,
    responseTemplate: PropTypes.array,
    attachments: PropTypes.array,
    proposalType: PropTypes.array,
    industryBriefing: PropTypes.string,
    workAlreadyDone: PropTypes.string,
    endUsers: PropTypes.string,
    backgroundInformation: PropTypes.string,
    outcome: PropTypes.string,
    timeframeConstraints: PropTypes.string,
    clarificationQuestions: PropTypes.array,
    clarificationQuestionsAreClosed: PropTypes.bool,
    maxRate: PropTypes.string,
    budgetRange: PropTypes.string,
    preferredFormatForRates: PropTypes.string,
    securityClearanceObtain: PropTypes.string,
    securityClearanceCurrent: PropTypes.string,
    securityClearanceOther: PropTypes.string,
    includeWeightingsEssential: PropTypes.bool,
    essentialRequirements: PropTypes.array,
    includeWeightingsNiceToHave: PropTypes.bool,
    niceToHaveRequirements: PropTypes.array,
    numberOfSuppliers: PropTypes.string
  }),
  domains: PropTypes.array,
  briefResponseCount: PropTypes.number,
  invitedSellerCount: PropTypes.number,
  supplierBriefResponseCount: PropTypes.number,
  canRespond: PropTypes.bool,
  isInvited: PropTypes.bool,
  isAssessedForCategory: PropTypes.bool,
  isAssessedForAnyCategory: PropTypes.bool,
  hasEvidenceInDraftForCategory: PropTypes.bool,
  hasLatestEvidenceRejectedForCategory: PropTypes.bool,
  draftEvidenceId: PropTypes.number,
  rejectedEvidenceId: PropTypes.number,
  isOpenToCategory: PropTypes.bool,
  isOpenToAll: PropTypes.bool,
  isBriefOwner: PropTypes.bool,
  isBuyer: PropTypes.bool,
  isApprovedSeller: PropTypes.bool,
  isApplicant: PropTypes.bool,
  isRecruiterOnly: PropTypes.bool,
  isAwaitingApplicationAssessment: PropTypes.bool,
  isAwaitingDomainAssessment: PropTypes.bool,
  hasBeenAssessedForBrief: PropTypes.bool,
  hasResponded: PropTypes.bool,
  loggedIn: PropTypes.bool,
  hasSupplierErrors: PropTypes.bool,
  hasSignedCurrentAgreement: PropTypes.bool,
  supplierCode: PropTypes.number
}

const mapStateToProps = state => ({
  teams: state.app.teams,
  isTeamLead: state.app.isTeamLead,
  isPartOfTeam: state.app.isPartOfTeam
})

export default connect(mapStateToProps)(Opportunity)
