import React from 'react'
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
    loggedIn,
    originalClosedAt,
    rejectedEvidenceId,
    sellerCategory,
    sellersApplied,
    sellersInvited,
    supplierBriefResponseId,
    supplierBriefResponseIsDraft,
    supplierCode
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
                <ClosedDate countdown date={closingDate} />
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
          {isOpen && !loggedIn && (
            <span>
              {isOpenToAll ? (
                <span>
                  <p>Any assessed seller can respond.</p>
                  <p>
                    <a
                      href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000634456-Responding-to-an-opportunity"
                      className="au-btn au-btn--block"
                    >
                      How to respond
                    </a>
                    <a
                      href={`/login?next=${encodeURIComponent(
                        `${rootPath}/digital-marketplace/opportunities/${briefId}`
                      )}`}
                      className="au-btn au-btn--secondary au-btn--block"
                    >
                      Login
                    </a>
                  </p>
                </span>
              ) : (
                <span>
                  <p>Only signed in {!isOpenToCategory && 'invited'} sellers can apply.</p>
                  <p>
                    <a
                      href={`/login?next=${encodeURIComponent(
                        `${rootPath}/digital-marketplace/opportunities/${briefId}`
                      )}`}
                      className="au-btn au-btn--block"
                    >
                      Login
                    </a>
                  </p>
                </span>
              )}
            </span>
          )}
          {isBuyer && !isBriefOwner && (
            <a href={`mailto:${buyerEmail}`} className="au-btn au-btn--secondary au-btn--block">
              Contact the buyer
            </a>
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
          {isOpen && loggedIn && briefLot === 'atm' && hasSignedCurrentAgreement && (
            <span>
              <p className={styles.invitedStatus}>
                Only approved sellers can apply.
                {isAwaitingApplicationAssessment && <span> Your application is currently being assessed.</span>}
                {}
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
            (briefLot === 'atm' || ['rfx', 'training2'].includes(briefLot)) &&
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
                    <p>
                      <a
                        href={`${rootPath}/seller-assessment/create/${sellerCategory}/${briefId}`}
                        className={`au-btn au-btn--block ${styles.redBtn}`}
                      >
                        Request assessment
                      </a>
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
            isOpenToAll &&
            !isAssessedForAnyCategory && (
              <span>
                <p className={styles.invitedStatus}>
                  Only sellers with an assessed category can apply.
                  {isAwaitingDomainAssessment && <span> Your application is currently being assessed.</span>}
                  {!isAwaitingDomainAssessment && (
                    <span>
                      {' '}
                      You can request assessment for a category of your choosing{' '}
                      <a href={`${rootPath}/seller-dashboard`}>from your dashboard</a>.
                    </span>
                  )}
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
            (briefLot === 'atm' || (['rfx', 'training2'].includes(briefLot) && isAssessedForCategory)) &&
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
  loggedIn: false,
  hasResponded: false,
  isOpen: false,
  isBuyer: false,
  isApprovedSeller: false,
  isApplicant: false,
  isAwaitingApplicationAssessment: false,
  isAwaitingDomainAssessment: false,
  isBriefOwner: false,
  hasSignedCurrentAgreement: false,
  supplierCode: null,
  originalClosedAt: '',
  supplierBriefResponseId: 0
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
  loggedIn: PropTypes.bool,
  hasResponded: PropTypes.bool,
  isOpen: PropTypes.bool,
  isBuyer: PropTypes.bool,
  isApprovedSeller: PropTypes.bool,
  isApplicant: PropTypes.bool,
  isAwaitingApplicationAssessment: PropTypes.bool,
  isAwaitingDomainAssessment: PropTypes.bool,
  isBriefOwner: PropTypes.bool,
  closingDate: PropTypes.string.isRequired,
  briefId: PropTypes.number.isRequired,
  briefLot: PropTypes.string.isRequired,
  briefStatus: PropTypes.string.isRequired,
  category: PropTypes.string,
  sellerCategory: PropTypes.string.isRequired,
  hasSignedCurrentAgreement: PropTypes.bool,
  supplierCode: PropTypes.number,
  originalClosedAt: PropTypes.string,
  supplierBriefResponseId: PropTypes.number
}

export default OpportunityInfoCard
