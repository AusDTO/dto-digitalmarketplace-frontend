import React from 'react'
import PropTypes from 'prop-types'

import ApplicantHeaderActions from './ApplicantHeaderActions'
import BuyerHeaderActions from './BuyerHeaderActions'
import SellerHeaderActions from './SellerHeaderActions'
import UnauthenticatedHeaderActions from './UnauthenticatedHeaderActions'

const HeaderActions = props => {
  const { loggedIn, notificationCount, userType } = props

  return (
    <div className="au-marketplace-header-actions">
      {loggedIn ? (
        (userType === 'applicant' && <ApplicantHeaderActions />) ||
        (userType === 'buyer' && <BuyerHeaderActions />) ||
        (userType === 'supplier' && <SellerHeaderActions notificationCount={notificationCount} />)
      ) : (
        <UnauthenticatedHeaderActions />
      )}
    </div>
  )
}

HeaderActions.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired
}

export default HeaderActions
