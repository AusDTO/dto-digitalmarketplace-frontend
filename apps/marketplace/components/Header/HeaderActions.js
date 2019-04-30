import React from 'react'
import PropTypes from 'prop-types'

import ApplicantHeaderActions from './ApplicantHeaderActions'
import BuyerHeaderActions from './BuyerHeaderActions'
import SellerHeaderActions from './SellerHeaderActions'

const HeaderActions = props => {
  const { userType } = props
  return (
    <div className="au-marketplace-header-actions">
      {userType === 'applicant' && <ApplicantHeaderActions />}
      {userType === 'buyer' && <BuyerHeaderActions />}
      {userType === 'seller' && <SellerHeaderActions />}
    </div>
  )
}

HeaderActions.propTypes = {
  userType: PropTypes.string.isRequired
}

export default HeaderActions
