import React from 'react'
import PropTypes from 'prop-types'
import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'
import styles from './OpportunitySpecialistInfoCard.scss'

const OpportunitySpecialistInfoCard = props => (
  <div className={styles.container}>
    <div className="row">
      {!props.isOpenToAll && (
        <div className="col-xs-5">
          <strong className={styles.stat}>{props.sellersInvited}</strong>
          <br />
          seller{props.sellersInvited === 1 ? '' : 's'} invited
        </div>
      )}
      <div className="col-xs-7">
        <strong className={styles.stat}>{props.sellersApplied}</strong>
        <br />
        candidate{props.sellersApplied === 1 ? '' : 's'}
        {' submitted'}
      </div>
    </div>
    {props.isOpen && props.closingDate && (
      <div className="row">
        <div className="col-xs-12">
          <div>
            <span>Closes in</span>
            <br />
            <strong className={styles.stat}>
              <ClosedDate countdown date={props.closingDate} />
            </strong>
          </div>
        </div>
      </div>
    )}
    {props.isOpen && (
      <div className="row">
        <div className="col-xs-12">
          {props.isApprovedSeller && props.isInvited && props.isAssessedForCategory ? (
            <p>
              You can submit up to {props.numberOfSuppliers} candidate{props.numberOfSuppliers > 1 && 's'} before the
              opportunity closes.
              {props.supplierBriefResponseCountDraft > 0 && props.supplierBriefResponseCountSubmitted === 0 && (
                <span>
                  {' '}
                  You have {props.supplierBriefResponseCountDraft} candidate
                  {props.supplierBriefResponseCountDraft > 1 && 's'} in draft.
                </span>
              )}
              {props.supplierBriefResponseCountDraft === 0 && props.supplierBriefResponseCountSubmitted > 0 && (
                <span>
                  {' '}
                  You submitted {props.supplierBriefResponseCountSubmitted} candidate
                  {props.supplierBriefResponseCountSubmitted > 1 && 's'}.
                </span>
              )}
              {props.supplierBriefResponseCountDraft > 0 && props.supplierBriefResponseCountSubmitted > 0 && (
                <span>
                  {' '}
                  You submitted {props.supplierBriefResponseCountSubmitted} candidate
                  {props.supplierBriefResponseCountSubmitted > 1 && 's'} and have{' '}
                  {props.supplierBriefResponseCountDraft} candidate{props.supplierBriefResponseCountDraft > 1 && 's'} in
                  draft.
                </span>
              )}
            </p>
          ) : (
            <React.Fragment>
              {props.numberOfSuppliers > 1 ? (
                <React.Fragment>
                  Sellers can submit up to <b>{props.numberOfSuppliers} candidates</b> for this role.
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Sellers can submit <b>{props.numberOfSuppliers} candidate</b> for this role.
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    )}
    <div className="row">
      <div className="col-xs-12">
        {!props.isOpen && props.briefStatus !== 'draft' && (
          <p className={styles.invitedStatus}>This opportunity has closed.</p>
        )}
        {props.isOpen && !props.loggedIn && (
          <span>
            {props.isOpenToAll ? (
              <span>
                <p>You must be signed in and approved in {props.category} to respond</p>
                <p>
                  <a
                    href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000634456-Responding-to-an-opportunity"
                    className="au-btn au-btn--block"
                  >
                    How to respond
                  </a>
                  <a
                    href={`/login?next=${encodeURIComponent(
                      `${rootPath}/digital-marketplace/opportunities/${props.briefId}`
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
                      `${rootPath}/digital-marketplace/opportunities/${props.briefId}`
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
        {props.isBuyer && !props.isBriefOwner && (
          <a href={`mailto:${props.buyerEmail}`} className="au-btn au-btn--secondary au-btn--block">
            Contact the buyer
          </a>
        )}
        {props.isOpen && props.loggedIn && props.isApplicant && (
          <span>
            <p className={styles.invitedStatus}>
              You must complete your profile and be approved in {props.category} to respond.
              {props.isAwaitingApplicationAssessment && <span> Your application is currently being assessed.</span>}
            </p>
            {!props.isAwaitingApplicationAssessment && (
              <p>
                <a href="/sellers/application" className="au-btn au-btn--block">
                  Continue application
                </a>
              </p>
            )}
          </span>
        )}
        {props.isOpen &&
          props.loggedIn &&
          props.isApprovedSeller &&
          !props.hasSignedCurrentAgreement &&
          !props.hasResponded && (
            <span>
              <p className={styles.invitedStatus}>
                You must accept the new Master agreement before you can apply for an opportunity.
              </p>
              <p>
                <a href={`/2/seller-edit/${props.supplierCode}/representative`} className="au-btn au-btn--block">
                  View Master Agreement
                </a>
              </p>
            </span>
          )}
        {props.isOpen &&
          props.loggedIn &&
          props.isApprovedSeller &&
          props.hasSignedCurrentAgreement &&
          !props.isOpenToAll &&
          !props.isInvited && (
            <div className={styles.invitedStatus}>
              <p>Only invited sellers can apply.</p>
            </div>
          )}
        {props.isOpen &&
          props.loggedIn &&
          props.isApprovedSeller &&
          props.hasSignedCurrentAgreement &&
          props.isInvited &&
          !props.isAssessedForCategory && (
            <span>
              <p className={styles.invitedStatus}>
                Only sellers assessed and approved by the Marketplace in &quot;{props.category}&quot; can apply.
                {props.isRecruiterOnly && !props.isAwaitingDomainAssessment && (
                  <span>
                    {' '}
                    You must <a href="/sellers/edit">edit your profile</a> to add this category before you can apply.
                  </span>
                )}
                {props.isRecruiterOnly && props.isAwaitingApplicationAssessment && (
                  <span> Your application is currently being assessed.</span>
                )}
                {props.isAwaitingDomainAssessment && (
                  <span> Your application for this category is currently being assessed.</span>
                )}
                {!props.isAwaitingDomainAssessment &&
                  props.hasEvidenceInDraftForCategory &&
                  !props.isRecruiterOnly &&
                  props.draftEvidenceId && (
                    <span>
                      {' '}
                      You currently have a{' '}
                      <a href={`${rootPath}/seller-assessment/${props.draftEvidenceId}/introduction`}>
                        draft submission
                      </a>{' '}
                      for assessment in this category.
                    </span>
                  )}
                {!props.isAwaitingDomainAssessment &&
                  props.hasLatestEvidenceRejectedForCategory &&
                  props.rejectedEvidenceId && (
                    <span> Your submitted assessment has been reviewed by the Marketplace and was not successful.</span>
                  )}
              </p>
              {!props.isAwaitingDomainAssessment &&
                !props.hasEvidenceInDraftForCategory &&
                !props.hasLatestEvidenceRejectedForCategory &&
                !props.isRecruiterOnly && (
                  <p>
                    <a
                      href={`${rootPath}/seller-assessment/create/${props.sellerCategory}/${props.briefId}`}
                      className={`au-btn au-btn--block ${styles.redBtn}`}
                    >
                      Request assessment
                    </a>
                  </p>
                )}
              {!props.isAwaitingDomainAssessment &&
                props.hasLatestEvidenceRejectedForCategory &&
                props.rejectedEvidenceId && (
                  <p>
                    <a
                      href={`${rootPath}/seller-assessment/${props.rejectedEvidenceId}/feedback`}
                      className={`au-btn au-btn--block ${styles.redBtn}`}
                    >
                      View assessment feedback
                    </a>
                  </p>
                )}
            </span>
          )}
        {props.isOpen &&
          props.isApprovedSeller &&
          props.isAssessedForCategory &&
          (props.hasSignedCurrentAgreement || (!props.hasSignedCurrentAgreement && props.hasResponded)) &&
          props.canRespond && (
            <div>
              {props.hasSupplierErrors ? (
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
                  {!props.hasResponded && props.sellerResponses === 0 && (
                    <p>
                      <a
                        href={`${rootPath}/brief/${props.briefId}/${
                          props.briefLot === 'specialist' ? `${props.briefLot}2` : props.briefLot
                        }/respond`}
                        className={`${styles.button} au-btn`}
                      >
                        Apply for opportunity
                      </a>
                    </p>
                  )}
                  {props.sellerResponses > 0 && (
                    <p>
                      <a href={`${rootPath}/brief/${props.briefId}/responses`} className={`${styles.button} au-btn`}>
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
  supplierCode: null
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
  briefLot: PropTypes.string.isRequired,
  briefStatus: PropTypes.string.isRequired,
  category: PropTypes.string,
  sellerCategory: PropTypes.string.isRequired,
  numberOfSuppliers: PropTypes.string,
  hasSupplierErrors: PropTypes.bool,
  isInvited: PropTypes.bool,
  hasSignedCurrentAgreement: PropTypes.bool,
  supplierCode: PropTypes.number
}

export default OpportunitySpecialistInfoCard
