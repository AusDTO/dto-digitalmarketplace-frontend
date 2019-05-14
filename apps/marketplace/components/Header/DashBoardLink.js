/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import { rootPath } from 'marketplace/routes'

const DashBoardLink = props => {
  const { userType, notificationCount } = props
  return (
    <span>
      {userType === 'buyer' ? (
        <a href={`${rootPath}/buyer-dashboard`}>Dashboard</a>
      ) : userType === 'applicant' ? (
        <a href="/sellers/application">Continue application</a>
      ) : (
        <span>
          <a href="/2/seller-dashboard">Dashboard</a>
          {notificationCount && notificationCount !== 0 ? <div className="notification">{notificationCount}</div> : ''}
        </span>
      )}
    </span>
  )
}

DashBoardLink.propTypes = {
  userType: PropTypes.string.isRequired
}

export default DashBoardLink
