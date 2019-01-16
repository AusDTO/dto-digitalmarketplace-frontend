import React from 'react'
import PropTypes from 'prop-types'
import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'
import styles from './OpportunityInfoCard.scss'

const OpportunityInfoCard = props => (
  <div className={styles.container}>
    <div className="row">
      {!props.isOpenToAll && (
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
        {!props.isClosed &&
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
        {props.isClosed && <p className={styles.invitedStatus}>This opportunity has closed.</p>}
        {!props.isClosed &&
          (props.isOpenToAll || props.isInvitedSeller) && (
            <div>
              {props.hasResponded ? (
                <p className={styles.invitedStatus}>You have already applied for this opportunity.</p>
              ) : (
                <div>
                  {props.loggedIn &&
                    !props.isBuyer && (
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
        {!props.isClosed &&
          !props.isInvitedSeller && (
            <div className={styles.invitedStatus}>
              {props.loggedIn ? (
                <p>Only {!props.isOpenToAll && `invited`} sellers can apply.</p>
              ) : (
                <span>
                  <p>Only signed in {!props.isOpenToAll && `invited`} sellers can apply.</p>
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
            </div>
          )}
      </div>
    </div>
  </div>
)

OpportunityInfoCard.defaultProps = {
  sellersInvited: 0,
  sellersApplied: 0,
  isInvitedSeller: false,
  isOpenToAll: false,
  loggedIn: false,
  hasResponded: false,
  isClosed: false,
  isBuyer: false
}

OpportunityInfoCard.propTypes = {
  sellersInvited: PropTypes.number,
  sellersApplied: PropTypes.number,
  isInvitedSeller: PropTypes.bool,
  isOpenToAll: PropTypes.bool,
  loggedIn: PropTypes.bool,
  hasResponded: PropTypes.bool,
  isClosed: PropTypes.bool,
  isBuyer: PropTypes.bool,
  closingDate: PropTypes.string.isRequired,
  briefId: PropTypes.number.isRequired,
  briefLot: PropTypes.string.isRequired
}

export default OpportunityInfoCard
