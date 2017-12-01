/* eslint-disable */
import React from 'react'
import PageAlert from '@gov.au/page-alerts'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import styles from 'orams/components/Invitation/Invitation.scss'

const Invitation = props => {
  return (
    <main>
      { props.invitationData ?
        <div>
          <PageAlert as="success">
            <h4>ORAMS access has been given to {props.invitationData.email_address}</h4>
          </PageAlert>
          <div className="uikit-display-6">What happens next?</div>
          <div className={styles.spacer}>We have sent an email to {props.invitationData.email_address} to set a password and activate their account.</div>
        </div>
      : <LoadingIndicatorFullPage /> }
    </main>
  )
}

export default Invitation
