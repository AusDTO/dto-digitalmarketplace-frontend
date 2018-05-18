/* eslint-disable */
import React from 'react'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import styles from 'orams/components/Invitation/Invitation.scss'

const Invitation = props => {
  return (
    <main>
      {props.invitationData ? (
        <div>
          <AUpageAlert as="success">
            <h4>ORAMS access has been given to {props.invitationData.email_address}</h4>
          </AUpageAlert>
          <div className="au-display-xl">What happens next?</div>
          <div className={styles.spacer}>
            We have sent an email to {props.invitationData.email_address} to set a password and activate their account.
          </div>
        </div>
      ) : (
        <LoadingIndicatorFullPage />
      )}
    </main>
  )
}

export default Invitation
