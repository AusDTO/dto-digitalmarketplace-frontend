/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import { rootPath } from 'marketplace/routes'

const DashBoardLink = props => {
  const { userType } = props
  return (
    <span>
      {userType === 'buyer' ? (
        <a href={`${rootPath}/buyer-dashboard`}>Dashboard</a>
      ) : userType === 'applicant' ? (
        <a href="/sellers/application">Continue application</a>
      ) : (
        <a href="/sellers">Dashboard</a>
      )}
    </span>
  )
}

DashBoardLink.propTypes = {
  userType: PropTypes.string.isRequired
}

export default DashBoardLink
