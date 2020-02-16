import React from 'react'
import PropTypes from 'prop-types'
import { isBefore, parse } from 'date-fns'
import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'
import styles from './OpportunitySpecialistInfoCard.scss'

const OpportunitySpecialistInfoCard = props => {
  const {
    briefId,
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
    hasSupplierErrors,
    isApplicant,
    isApprovedSeller,
    isAssessedForCategory,
    isAwaitingApplicationAssessment,
    isAwaitingDomainAssessment,
    isBriefOwner,
    isBuyer,
    isInvited,
    isOpen,
    isOpenToAll,
    isRecruiterOnly,
    loggedIn,
    numberOfSuppliers,
    originalClosedAt,
    rejectedEvidenceId,
    sellerCategory,
    sellerResponses,
    sellersApplied,
    sellersInvited,
    supplierBriefResponseCountDraft,
    supplierBriefResponseCountSubmitted,
    supplierCode
  } = props

  const closedEarly = isBefore(parse(closingDate), parse(originalClosedAt))

  return (
    <div className={styles.container}>
      <div className="row">
        {!isOpenToAll && (
          <div className="col-xs-5">
            <strong className={styles.stat}>{sellersInvited}</strong>
            <br />
            seller{sellersInvited === 1 ? '' : 's'} invited
          </div>
        )}
        <div className="col-xs-7">
          <strong className={styles.stat}>{sellersApplied}</strong>
          <br />
          candidate{sellersApplied === 1 ? '' : 's'}
          {' submitted'}
        </div>
      </div>
      {isOpen && closingDate && (
        <div className="row">
          <div className="col-xs-12">
            <div>
              <span>Closes in</span>
              <br />
              <strong className={styles.stat}>
                <ClosedDate countdown date={closingDate} />
              </strong>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="row">
          <div className="col-xs-12">
            {isApprovedSeller && isInvited && isAssessedForCategory ? (
              <p>
                You can submit up to {numberOfSuppliers} candidate{numberOfSuppliers > 1 && 's'} before the opportunity
                closes.
                {supplierBriefResponseCountDraft > 0 && supplierBriefResponseCountSubmitted === 0 && (
                  <span>
                    {' '}
                    You have {supplierBriefResponseCountDraft} candidate
                    {supplierBriefResponseCountDraft > 1 && 's'} in draft.
                  </span>
                )}
                {supplierBriefResponseCountDraft === 0 && supplierBriefResponseCountSubmitted > 0 && (
                  <span>
                    {' '}
                    You submitted {supplierBriefResponseCountSubmitted} candidate
                    {supplierBriefResponseCountSubmitted > 1 && 's'}.
                  </span>
                )}
                {supplierBriefResponseCountDraft > 0 && supplierBriefResponseCountSubmitted > 0 && (
                  <span>
                    {' '}
                    You submitted {supplierBriefResponseCountSubmitted} candidate
                    {supplierBriefResponseCountSubmitted > 1 && 's'} and have {supplierBriefResponseCountDraft}{' '}
                    candidate{supplierBriefResponseCountDraft > 1 && 's'} in draft.
                  </span>
                )}
              </p>
            ) : (
              <React.Fragment>
                {numberOfSuppliers > 1 ? (
                  <React.Fragment>
                    Sellers can submit up to <b>{numberOfSuppliers} candidates</b> for this role.
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    Sellers can submit <b>{numberOfSuppliers} candidate</b> for this role.
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      )}
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
                  <p>You must be signed in and approved in {category} to respond</p>
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
                  <p>You must be signed in and invited to respond</p>
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
          {isOpen && loggedIn && isApplicant && (
            <span>
              <p className={styles.invitedStatus}>
                You must complete your profile and be approved in {category} to respond.
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
          {isOpen && loggedIn && isApprovedSeller && hasSignedCurrentAgreement && !isOpenToAll && !isInvited && (
            <div className={styles.invitedStatus}>
              <p>Only invited sellers can apply.</p>
            </div>
          )}
          {isOpen && loggedIn && isApprovedSeller && hasSignedCurrentAgreement && isInvited && !isAssessedForCategory && (
            <span>
              <p className={styles.invitedStatus}>
                Only sellers assessed and approved by the Marketplace in &quot;{category}&quot; can apply.
                {isRecruiterOnly && !isAwaitingDomainAssessment && (
                  <span>
                    {' '}
                    You must <a href="/sellers/edit">edit your profile</a> to add this category before you can apply.
                  </span>
                )}
                {isRecruiterOnly && isAwaitingApplicationAssessment && (
                  <span> Your application is currently being assessed.</span>
                )}
                {isAwaitingDomainAssessment && (
                  <span> Your application for this category is currently being assessed.</span>
                )}
                {!isAwaitingDomainAssessment && hasEvidenceInDraftForCategory && !isRecruiterOnly && draftEvidenceId && (
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
                !hasLatestEvidenceRejectedForCategory &&
                !isRecruiterOnly && (
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
            isApprovedSeller &&
            isAssessedForCategory &&
            (hasSignedCurrentAgreement || (!hasSignedCurrentAgreement && hasResponded)) &&
            canRespond && (
              <div>
                {hasSupplierErrors ? (
                  <div>
                    <p className={styles.invitedStatus}>
                      There is at least one error in your profile. You must update your profile before you can apply for
                      this opportunity.
                    </p>
                    <p>
                      <a href="/sellers/edit" className="au-btn au-btn--block">
                        Update profile
                      </a>
                    </p>
                  </div>
                ) : (
                  <React.Fragment>
                    {!hasResponded && sellerResponses === 0 && (
                      <p>
                        <a href={`${rootPath}/brief/${briefId}/responses`} className={`${styles.button} au-btn`}>
                          Apply for opportunity
                        </a>
                      </p>
                    )}
                    {sellerResponses > 0 && (
                      <p>
                        <a href={`${rootPath}/brief/${briefId}/responses`} className={`${styles.button} au-btn`}>
                          Edit or submit candidates
                        </a>
                      </p>
                    )}
                  </React.Fragment>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

OpportunitySpecialistInfoCard.defaultProps = {
  buyerEmail: '',
  category: '',
  sellersInvited: 0,
  sellersApplied: 0,
  sellerResponses: 0,
  supplierBriefResponseCountSubmitted: 0,
  supplierBriefResponseCountDraft: 0,
  canRespond: false,
  isAssessedForCategory: false,
  hasEvidenceInDraftForCategory: false,
  hasLatestEvidenceRejectedForCategory: false,
  draftEvidenceId: undefined,
  rejectedEvidenceId: undefined,
  isOpenToAll: false,
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
  numberOfSuppliers: '6',
  hasSupplierErrors: false,
  isInvited: false,
  hasSignedCurrentAgreement: false,
  supplierCode: null,
  originalClosedAt: ''
}

OpportunitySpecialistInfoCard.propTypes = {
  buyerEmail: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  sellersInvited: PropTypes.number,
  sellersApplied: PropTypes.number,
  sellerResponses: PropTypes.number,
  supplierBriefResponseCountSubmitted: PropTypes.number,
  supplierBriefResponseCountDraft: PropTypes.number,
  canRespond: PropTypes.bool,
  isAssessedForCategory: PropTypes.bool,
  hasEvidenceInDraftForCategory: PropTypes.bool,
  hasLatestEvidenceRejectedForCategory: PropTypes.bool,
  draftEvidenceId: PropTypes.number,
  rejectedEvidenceId: PropTypes.number,
  isOpenToAll: PropTypes.bool,
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
  briefStatus: PropTypes.string.isRequired,
  category: PropTypes.string,
  sellerCategory: PropTypes.string.isRequired,
  numberOfSuppliers: PropTypes.string,
  hasSupplierErrors: PropTypes.bool,
  isInvited: PropTypes.bool,
  hasSignedCurrentAgreement: PropTypes.bool,
  supplierCode: PropTypes.number,
  originalClosedAt: PropTypes.string
}

export default OpportunitySpecialistInfoCard
