import React from 'react'

import CommonMobileLinks from './CommonMobileLinks'
import DashBoardLink from '../DashBoardLink'

const AuthenticatedMobileLinks = props => {
  const { notificationCount, userType } = props

  return (
    <React.Fragment>
      <div className="au-marketplace-header_mobile-link">
        <DashBoardLink userType={userType} notificationCount={notificationCount} />
      </div>
      {userType === 'buyer' && (
        <div className="au-marketplace-header_mobile-link">
          <a href="/2/teams">Teams and People</a>
        </div>
      )}
      {userType === 'buyer' && (
        <div className="au-marketplace-header_mobile-link">
          <a href="/2/download-reports">Download Reports</a>
        </div>
      )}
      <CommonMobileLinks />
      <div className="au-marketplace-header_mobile-link">
        <a href="/logout">Sign out</a>
      </div>
    </React.Fragment>
  )
}

export default AuthenticatedMobileLinks
