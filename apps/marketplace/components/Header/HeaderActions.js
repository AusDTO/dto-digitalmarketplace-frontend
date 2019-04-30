import React from 'react'

import BuyerHeaderActions from './BuyerHeaderActions'
import SellerHeaderActions from './SellerHeaderActions'

const HeaderActions = props => {
  const { userType } = props
  return (
    <div className="au-marketplace-header-actions">
      {userType === 'buyer' && <BuyerHeaderActions />}
      {userType === 'seller' && <SellerHeaderActions />}
    </div>
  )
}

export default HeaderActions
