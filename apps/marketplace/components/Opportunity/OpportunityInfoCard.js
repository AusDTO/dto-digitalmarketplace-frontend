import React from 'react'
import PropTypes from 'prop-types'
import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'
import styles from './OpportunityInfoCard.scss'

const OpportunityInfoCard = props => (
  <div className={styles.container}>
    <div className="row">
      {!props.isOpenToAll &&
        !props.isOpenToCategory && (
          <div className="col-xs-6">
            <strong className={styles.stat}>{props.sellersInvited}</strong>
            <br />
            seller{props.sellersInvited === 1 ? '' : 's'} invited
          </div>
        )}
      <div className="col-xs-6">
        <strong className={styles.stat}>{props.sellersApplied}</strong>
        <br />
        seller{props.sellersApplied === 1 ? '' : 's'} applied
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        {props.isOpen &&
          props.closingDate && (
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
        {!props.isOpen && <p className={styles.invitedStatus}>This opportunity has closed.</p>}
        {props.isOpen &&
          !props.loggedIn && (
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
                  </p>
                </span>
              ) : (
                <span>
                  <p>Only signed in invited sellers can apply.</p>
                  <p>
                    <a href={`${rootPath}/signup`} className="au-btn au-btn--secondary au-btn--block">
                      Create an account
                    </a>
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
        {props.isBuyer &&
          !props.isBriefOwner && (
            <a href={`mailto:${props.buyerEmail}`} className="au-btn au-btn--block">
              Contact the buyer
            </a>
          )}
        {props.isOpen &&
          props.loggedIn &&
          !props.isBuyer &&
          (!props.isOpenToAll && !props.isOpenToCategory) &&
          !props.isInvitedSeller && (
            <div className={styles.invitedStatus}>
              <p>Only invited sellers can apply.</p>
            </div>
          )}
        {props.isOpen &&
          props.loggedIn &&
          !props.isBuyer &&
          props.isOpenToCategory &&
          !props.isAssessedForCategory && (
            <span>
              <p className={styles.invitedStatus}>Only sellers approved in {props.category} can apply.</p>
              <p>
                <a href="#help" className="au-btn au-btn--block">
                  Request assessment
                </a>
              </p>
            </span>
          )}
        {props.isOpen &&
          !props.isBuyer &&
          (props.isOpenToAll || props.isInvitedSeller) && (
            <div>
              {props.hasResponded ? (
                <p className={styles.invitedStatus}>You have already applied for this opportunity.</p>
              ) : (
                <div>
                  {props.loggedIn && (
                    <a
                      href={`${rootPath}/brief/${props.briefId}/${props.briefLot}/respond`}
                      className={`${styles.button} au-btn`}
                    >
                      Apply for opportunity
                    </a>
                  )}
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
  sellersInvited: 0,
  sellersApplied: 0,
  isInvitedSeller: false,
  isAssessedForCategory: false,
  isOpenToCategory: false,
  isOpenToAll: false,
  loggedIn: false,
  hasResponded: false,
  isOpen: false,
  isBuyer: false,
  isBriefOwner: false
}

OpportunityInfoCard.propTypes = {
  buyerEmail: PropTypes.string,
  sellersInvited: PropTypes.number,
  sellersApplied: PropTypes.number,
  isInvitedSeller: PropTypes.bool,
  isAssessedForCategory: PropTypes.bool,
  isOpenToCategory: PropTypes.bool,
  isOpenToAll: PropTypes.bool,
  loggedIn: PropTypes.bool,
  hasResponded: PropTypes.bool,
  isOpen: PropTypes.bool,
  isBuyer: PropTypes.bool,
  isBriefOwner: PropTypes.bool,
  closingDate: PropTypes.string.isRequired,
  briefId: PropTypes.number.isRequired,
  briefLot: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
}

export default OpportunityInfoCard
