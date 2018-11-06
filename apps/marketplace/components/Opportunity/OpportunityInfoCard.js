import React from 'react'
import PropTypes from 'prop-types'
import isFuture from 'date-fns/is_future'
import ClosedDate from 'shared/ClosedDate'
import styles from './OpportunityInfoCard.scss'

const OpportunityInfoCard = props => (
  <div className={styles.container}>
    <div className="row">
      <div className="col-xs-6">
        <strong className={styles.stat}>{props.sellersInvited}</strong>
        <br />
        sellers invited
      </div>
      <div className="col-xs-6">
        <strong className={styles.stat}>{props.sellersApplied}</strong>
        <br />
        sellers applied
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <strong className={styles.stat}>
          <ClosedDate countdown date={props.closingDate} />
        </strong>
        {isFuture(props.closingDate) && (
          <span>
            <br />
            until closing
          </span>
        )}
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <p>Only invited sellers can apply.</p>
      </div>
    </div>
  </div>
)

OpportunityInfoCard.defaultProps = {
  sellersInvited: 0,
  sellersApplied: 0
}

OpportunityInfoCard.propTypes = {
  sellersInvited: PropTypes.number,
  sellersApplied: PropTypes.number,
  closingDate: PropTypes.string.isRequired
}

export default OpportunityInfoCard
