import React from 'react'
import PropTypes from 'prop-types'
import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'
import styles from './OpportunityInfoCard.scss'

const OpportunityInfoCard = props => (
  <div className={styles.container}>
    <div className="row">
      {!props.isOpenToAll && !props.isOpenToCategory && (
        <div className="col-xs-6">
          <strong className={styles.stat}>{props.sellersInvited}</strong>
          <br />
          seller{props.sellersInvited === 1 ? '' : 's'} invited
        </div>
      )}
      <div className="col-xs-6">
        <strong className={styles.stat}>{props.sellersApplied}</strong>
        <br />
        seller{props.sellersApplied === 1 ? '' : 's'}
        {props.briefLot === 'atm' ? ' responded' : ' applied'}
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        {props.isOpen && props.closingDate && (
          <div>
            <span>Closes in</span>
            <br />
            <strong className={styles.stat}>
              <ClosedDate countdown date={props.closingDate} />
            </strong>
          </div>
        )}
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        {!props.isOpen && props.briefStatus !== 'draft' && (
          <p className={styles.invitedStatus}>This opportunity has closed.</p>
        )}
        {props.isOpen && !props.loggedIn && (
          <span>
            {props.isOpenToAll ? (
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
                <p>Only signed in {!props.isOpenToCategory && 'invited'} sellers can apply.</p>
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
        {props.isOpen && props.loggedIn && props.isApplicant && (
          <span>
            <p className={styles.invitedStatus}>
              Only approved sellers can apply.
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
          (props.briefLot === 'atm' && props.isRecruiterOnly) &&
          props.hasSignedCurrentAgreement && (
            <span>
              <p className={styles.invitedStatus}>
                Only approved sellers can apply.
                {props.isAwaitingApplicationAssessment && <span> Your application is currently being assessed.</span>}
                {!props.isAwaitingApplicationAssessment && (
                  <span>
                    {' '}
                    You must edit your profile to indicate you are a consultancy (or both a consultancy and a recruiter)
                    to be able to apply for this brief.
                  </span>
                )}
                {}
              </p>
              {!props.isAwaitingApplicationAssessment && (
                <p>
                  <a href="/sellers/edit" className="au-btn au-btn--block">
                    Edit profile
                  </a>
                </p>
              )}
            </span>
          )}
        {props.isOpen &&
          props.loggedIn &&
          props.isApprovedSeller &&
          props.hasSignedCurrentAgreement &&
          ((props.briefLot === 'atm' && !props.isRecruiterOnly) || ['rfx', 'training2'].includes(props.briefLot)) &&
          (!props.isOpenToAll && !props.isOpenToCategory) &&
          !props.canRespond && (
            <div className={styles.invitedStatus}>
              <p>Only invited sellers can apply.</p>
            </div>
          )}
        {props.isOpen &&
          props.loggedIn &&
          props.isApprovedSeller &&
          props.hasSignedCurrentAgreement &&
          (props.briefLot === 'atm' && !props.isRecruiterOnly) &&
          props.isOpenToCategory &&
          props.category &&
          !props.isAssessedForCategory && (
            <span>
              <p className={styles.invitedStatus}>
                Only sellers assessed and approved by the Marketplace in &quot;{props.category}&quot; can apply.
                {props.isAwaitingDomainAssessment && (
                  <span> Your application for this category is currently being assessed.</span>
                )}
                {!props.isAwaitingDomainAssessment && props.hasEvidenceInDraftForCategory && (
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
                !props.hasLatestEvidenceRejectedForCategory && (
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
          props.loggedIn &&
          props.isApprovedSeller &&
          props.hasSignedCurrentAgreement &&
          props.briefLot === 'atm' &&
          !props.isRecruiterOnly &&
          props.isOpenToAll &&
          !props.isAssessedForAnyCategory && (
            <span>
              <p className={styles.invitedStatus}>
                Only sellers with an assessed category can apply.
                {props.isAwaitingDomainAssessment && <span> Your application is currently being assessed.</span>}
                {!props.isAwaitingDomainAssessment && (
                  <span>
                    {' '}
                    You can request assessment for a category of your choosing{' '}
                    <a href={`${rootPath}/seller-dashboard`}>from your dashboard</a>.
                  </span>
                )}
              </p>
            </span>
          )}

        {props.isOpen &&
          props.loggedIn &&
          props.isApprovedSeller &&
          props.hasSignedCurrentAgreement &&
          ['rfx', 'training2'].includes(props.briefLot) &&
          props.canRespond &&
          !props.isAssessedForCategory && (
            <span>
              <p className={styles.invitedStatus}>
                Only sellers with an assessed category can apply.
                {props.isAwaitingDomainAssessment && <span> Your application is currently being assessed.</span>}
              </p>
            </span>
          )}
        {props.isOpen &&
          props.isApprovedSeller &&
          (props.hasSignedCurrentAgreement || (!props.hasSignedCurrentAgreement && props.hasResponded)) &&
          ((props.briefLot === 'atm' && !props.isRecruiterOnly) ||
            (['rfx', 'training2'].includes(props.briefLot) && props.isAssessedForCategory)) &&
          props.canRespond && (
            <div>
              {props.hasResponded && (
                <React.Fragment>
                  <p className={styles.invitedStatus}>You have already submitted a response.</p>
                  {props.supplierBriefResponseId && (
                    <p>
                      <a
                        href={`${rootPath}/brief/${props.briefId}/${props.briefLot}/respond/${props.supplierBriefResponseId}`}
                        className={`${styles.button} au-btn`}
                      >
                        Edit submission
                      </a>
                    </p>
                  )}
                </React.Fragment>
              )}
              {!props.hasResponded && props.supplierBriefResponseIsDraft && props.supplierBriefResponseId && (
                <React.Fragment>
                  <p className={styles.invitedStatus}>You have started your submission.</p>
                  <p>
                    <a
                      href={`${rootPath}/brief/${props.briefId}/${props.briefLot}/respond/${props.supplierBriefResponseId}`}
                      className={`${styles.button} au-btn`}
                    >
                      Edit draft submission
                    </a>
                  </p>
                </React.Fragment>
              )}
              {!props.hasResponded && !props.supplierBriefResponseIsDraft && (
                <div>
                  <a
                    href={`${rootPath}/brief/${props.briefId}/${props.briefLot}/respond`}
                    className={`${styles.button} au-btn`}
                  >
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
  isRecruiterOnly: false,
  isAwaitingApplicationAssessment: false,
  isAwaitingDomainAssessment: false,
  isBriefOwner: false,
  hasSignedCurrentAgreement: false,
  supplierCode: null,
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
  hasSignedCurrentAgreement: PropTypes.bool,
  supplierCode: PropTypes.number,
  supplierBriefResponseId: PropTypes.number
}

export default OpportunityInfoCard
