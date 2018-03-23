/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'

const DashBoardLink = props => {
  const { userType } = props
  return (
    <span>
      {userType === 'buyer'
        ? <a href="/2/buyer-dashboard">Dashboard</a>
        : userType === 'applicant'
          ? <a href="/sellers/application">Continue application</a>
          : <a href="/sellers">Dashboard</a>}
    </span>
  )
}

DashBoardLink.propTypes = {
  userType: PropTypes.string.isRequired
}

export default DashBoardLink
