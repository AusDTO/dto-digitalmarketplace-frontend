import React from 'react'

const SellerHeaderActions = props => {
  const { notificationCount } = props

  return (
    <ul data-reactroot="" id="main-navigation" className="au-marketplace-header-inline-links">
      <li>
        <a href="/2/seller-dashboard">Dashboard</a>
        {notificationCount && notificationCount > 0 ? <div className="notification">{notificationCount}</div> : ''}
      </li>
      <li>
        <a href="/logout">Sign out</a>
      </li>
    </ul>
  )
}

export default SellerHeaderActions
