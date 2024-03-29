import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isBefore, parse } from 'date-fns'
import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'
import styles from './OpportunityInfoCard.scss'

const OpportunityInfoCard = props => {
  const {
    briefId,
    briefLot,
    briefStatus,
    buyerEmail,
    canRespond,
    category,
    closingDate,
    draftEvidenceId,
    hasEvidenceInDraftForCategory,
    hasLatestEvidenceRejectedForCategory,
    hasResponded,
    hasSignedCurrentAgreement,
    isApplicant,
    isApprovedSeller,
    isAssessedForAnyCategory,
    isAssessedForCategory,
    isAwaitingApplicationAssessment,
    isAwaitingDomainAssessment,
    isBriefOwner,
    isBuyer,
    isOpen,
    isOpenToAll,
    isOpenToCategory,
    isRecruiterOnly,
    location,
    loggedIn,
    originalClosedAt,
    rejectedEvidenceId,
    sellersApplied,
    sellersInvited,
    supplierBriefResponseId,
    supplierBriefResponseIsDraft,
    supplierCode,
    isNewClosingTime
  } = props
  const closedEarly = isBefore(parse(closingDate), parse(originalClosedAt))

  return (
    <div className={styles.container}>
      <div className="row">
        {!isOpenToAll && !isOpenToCategory && (
          <div className="col-xs-6">
            <strong className={styles.stat}>{sellersInvited}</strong>
            <br />
            seller{sellersInvited === 1 ? '' : 's'} invited
          </div>
        )}
        <div className="col-xs-6">
          <strong className={styles.stat}>{sellersApplied}</strong>
          <br />
          seller{sellersApplied === 1 ? '' : 's'}
          {briefLot === 'atm' ? ' responded' : ' applied'}
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          {isOpen && closingDate && (
            <div>
              <span>Closes in</span>
              <br />
              <strong className={styles.stat}>
                <ClosedDate countdown date={closingDate} isNewClosingTime={isNewClosingTime} />
              </strong>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          {!isOpen && briefStatus !== 'draft' && closedEarly && (
            <p className={styles.invitedStatus}>
              {hasResponded
                ? 'This opportunity closed early as you already submitted your response.'
                : 'This opportunity has closed early as the invited seller has already submitted their response.'}
            </p>
          )}
          {!isOpen && briefStatus !== 'draft' && !closedEarly && (
            <p className={styles.invitedStatus}>This opportunity has closed.</p>
          )}
          {isBuyer && !isBriefOwner && (
            <a href={`mailto:${buyerEmail}`} className="au-btn au-btn--secondary au-btn--block">
              Contact the buyer
            </a>
          )}
          {isOpen && isBuyer && isBriefOwner && (
            <Link
              className="au-btn au-btn--block"
              to={{
                pathname: `${rootPath}/brief/${briefId}/edit`,
                state: { from: location.pathname }
              }}
            >
              Edit your opportunity
            </Link>
          )}
          {isOpen && loggedIn && isApprovedSeller && !hasSignedCurrentAgreement && !hasResponded && (
            <span>
              <p className={styles.invitedStatus}>
                You must accept the new Master agreement before you can apply for an opportunity.
              </p>
              <p>
                <a href={`/2/seller-edit/${supplierCode}/representative`} className="au-btn au-btn--block">
                  View Master Agreement
                </a>
              </p>
            </span>
          )}
          {isOpen && loggedIn && isApplicant && (
            <span>
              <p className={styles.invitedStatus}>
                Only approved sellers can apply.
                {isAwaitingApplicationAssessment && <span> Your application is currently being assessed.</span>}
              </p>
              {!isAwaitingApplicationAssessment && (
                <p>
                  <a href="/sellers/application" className="au-btn au-btn--block">
                    Continue application
                  </a>
                </p>
              )}
            </span>
          )}
          {isOpen && loggedIn && briefLot === 'atm' && isRecruiterOnly && hasSignedCurrentAgreement && (
            <span>
              <p className={styles.invitedStatus}>
                Only approved sellers can apply.
                {isAwaitingApplicationAssessment && <span> Your application is currently being assessed.</span>}
                {!isAwaitingApplicationAssessment && (
                  <span>
                    {' '}
                    You must edit your profile to indicate you are a consultancy (or both a consultancy and a recruiter)
                    to be able to apply for this opportunity.
                  </span>
                )}
              </p>
              {!isAwaitingApplicationAssessment && (
                <p>
                  <a href="/sellers/edit" className="au-btn au-btn--block">
                    Edit profile
                  </a>
                </p>
              )}
            </span>
          )}
          {isOpen &&
            loggedIn &&
            isApprovedSeller &&
            hasSignedCurrentAgreement &&
            ((briefLot === 'atm' && !isRecruiterOnly) || ['rfx', 'training2'].includes(briefLot)) &&
            (!isOpenToAll && !isOpenToCategory) &&
            !canRespond && (
              <div className={styles.invitedStatus}>
                <p>Only invited sellers can apply.</p>
              </div>
            )}
          {isOpen &&
            loggedIn &&
            isApprovedSeller &&
            hasSignedCurrentAgreement &&
            briefLot === 'atm' &&
            !isRecruiterOnly &&
            isOpenToCategory &&
            category &&
            !isAssessedForCategory && (
              <span>
                <p className={styles.invitedStatus}>
                  Only sellers assessed and approved by the Marketplace in &quot;{category}&quot; can apply.
                  {isAwaitingDomainAssessment && (
                    <span> Your application for this category is currently being assessed.</span>
                  )}
                  {!isAwaitingDomainAssessment && hasEvidenceInDraftForCategory && (
                    <span>
                      {' '}
                      You currently have a{' '}
                      <a href={`${rootPath}/seller-assessment/${draftEvidenceId}/introduction`}>draft submission</a> for
                      assessment in this category.
                    </span>
                  )}
                  {!isAwaitingDomainAssessment && hasLatestEvidenceRejectedForCategory && rejectedEvidenceId && (
                    <span> Your submitted assessment has been reviewed by the Marketplace and was not successful.</span>
                  )}
                </p>
                {!isAwaitingDomainAssessment &&
                  !hasEvidenceInDraftForCategory &&
                  !hasLatestEvidenceRejectedForCategory && (
                    <p className={styles.invitedStatus}>
                      Requesting a category assessment is currently unavailable due to the move to BuyICT.
                    </p>
                  )}
                {!isAwaitingDomainAssessment && hasLatestEvidenceRejectedForCategory && rejectedEvidenceId && (
                  <p>
                    <a
                      href={`${rootPath}/seller-assessment/${rejectedEvidenceId}/feedback`}
                      className={`au-btn au-btn--block ${styles.redBtn}`}
                    >
                      View assessment feedback
                    </a>
                  </p>
                )}
              </span>
            )}
          {isOpen &&
            loggedIn &&
            isApprovedSeller &&
            hasSignedCurrentAgreement &&
            briefLot === 'atm' &&
            !isRecruiterOnly &&
            isOpenToAll &&
            !isAssessedForAnyCategory && (
              <span>
                <p className={styles.invitedStatus}>
                  Only sellers with an assessed category can apply.
                  {isAwaitingDomainAssessment && <span> Your application is currently being assessed.</span>}
                </p>
              </span>
            )}
          {isOpen &&
            loggedIn &&
            isApprovedSeller &&
            hasSignedCurrentAgreement &&
            ['rfx', 'training2'].includes(briefLot) &&
            canRespond &&
            !isAssessedForCategory && (
              <span>
                <p className={styles.invitedStatus}>
                  Only sellers with an assessed category can apply.
                  {isAwaitingDomainAssessment && <span> Your application is currently being assessed.</span>}
                </p>
              </span>
            )}
          {isOpen &&
            isApprovedSeller &&
            (hasSignedCurrentAgreement || (!hasSignedCurrentAgreement && hasResponded)) &&
            ((briefLot === 'atm' && !isRecruiterOnly) ||
              (['rfx', 'training2'].includes(briefLot) && isAssessedForCategory)) &&
            canRespond && (
              <div>
                {hasResponded && (
                  <React.Fragment>
                    <p className={styles.invitedStatus}>You have already submitted a response.</p>
                    {supplierBriefResponseId && (
                      <p>
                        <a
                          href={`${rootPath}/brief/${briefId}/${briefLot}/respond/${supplierBriefResponseId}`}
                          className={`${styles.button} au-btn`}
                        >
                          Edit submission
                        </a>
                      </p>
                    )}
                  </React.Fragment>
                )}
                {!hasResponded && supplierBriefResponseIsDraft && supplierBriefResponseId && (
                  <React.Fragment>
                    <p className={styles.invitedStatus}>You have started your submission.</p>
                    <p>
                      <a
                        href={`${rootPath}/brief/${briefId}/${briefLot}/respond/${supplierBriefResponseId}`}
                        className={`${styles.button} au-btn`}
                      >
                        Edit draft submission
                      </a>
                    </p>
                  </React.Fragment>
                )}
                {!hasResponded && !supplierBriefResponseIsDraft && (
                  <div>
                    <a href={`${rootPath}/brief/${briefId}/${briefLot}/respond`} className={`${styles.button} au-btn`}>
                      Apply for opportunity
                    </a>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

OpportunityInfoCard.defaultProps = {
  buyerEmail: '',
  category: '',
  sellersInvited: 0,
  sellersApplied: 0,
  canRespond: false,
  isAssessedForCategory: false,
  isAssessedForAnyCategory: false,
  hasEvidenceInDraftForCategory: false,
  hasLatestEvidenceRejectedForCategory: false,
  draftEvidenceId: undefined,
  rejectedEvidenceId: undefined,
  isOpenToCategory: false,
  isOpenToAll: false,
  location: {},
  loggedIn: false,
  hasResponded: false,
  isOpen: false,
  isBuyer: false,
  isApprovedSeller: false,
  isApplicant: false,
  isRecruiterOnly: false,
  isAwaitingApplicationAssessment: false,
  isAwaitingDomainAssessment: false,
  isBriefOwner: false,
  hasSignedCurrentAgreement: false,
  supplierCode: null,
  originalClosedAt: '',
  supplierBriefResponseId: 0,
  isNewClosingTime: false
}

OpportunityInfoCard.propTypes = {
  buyerEmail: PropTypes.string,
  sellersInvited: PropTypes.number,
  sellersApplied: PropTypes.number,
  canRespond: PropTypes.bool,
  isAssessedForCategory: PropTypes.bool,
  isAssessedForAnyCategory: PropTypes.bool,
  hasEvidenceInDraftForCategory: PropTypes.bool,
  hasLatestEvidenceRejectedForCategory: PropTypes.bool,
  draftEvidenceId: PropTypes.number,
  rejectedEvidenceId: PropTypes.number,
  isOpenToCategory: PropTypes.bool,
  isOpenToAll: PropTypes.bool,
  location: PropTypes.object,
  loggedIn: PropTypes.bool,
  hasResponded: PropTypes.bool,
  isOpen: PropTypes.bool,
  isBuyer: PropTypes.bool,
  isApprovedSeller: PropTypes.bool,
  isApplicant: PropTypes.bool,
  isRecruiterOnly: PropTypes.bool,
  isAwaitingApplicationAssessment: PropTypes.bool,
  isAwaitingDomainAssessment: PropTypes.bool,
  isBriefOwner: PropTypes.bool,
  closingDate: PropTypes.string.isRequired,
  briefId: PropTypes.number.isRequired,
  briefLot: PropTypes.string.isRequired,
  briefStatus: PropTypes.string.isRequired,
  category: PropTypes.string,
  hasSignedCurrentAgreement: PropTypes.bool,
  supplierCode: PropTypes.number,
  originalClosedAt: PropTypes.string,
  supplierBriefResponseId: PropTypes.number,
  isNewClosingTime: PropTypes.bool
}

export default OpportunityInfoCard
