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
      <CommonMobileLinks />
      <div className="au-marketplace-header_mobile-link">
        <a href="/logout">Sign out</a>
      </div>
    </React.Fragment>
  )
}

export default AuthenticatedMobileLinks
