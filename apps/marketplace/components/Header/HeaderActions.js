import React from 'react'

import BuyerHeaderActions from './BuyerHeaderActions'

const HeaderActions = props => {
  const { userType } = props
  return <div className="au-marketplace-header-actions">{userType === 'buyer' && <BuyerHeaderActions />}</div>
}

export default HeaderActions
