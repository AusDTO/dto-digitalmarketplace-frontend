import React from 'react'

import DashBoardLink from './DashBoardLink'

const HeaderActions = props => (
  <ul data-reactroot="" id="main-navigation" className="au-marketplace-header-inline-links">
    <li>
      {props.loggedIn ? (
        <DashBoardLink userType={props.userType} />
      ) : (
        <a href="/2/signup" className="au-btn au-btn--secondary au-btn--dark">
          Sign up
        </a>
      )}
    </li>
    <li>
      {props.loggedIn ? (
        <a href="/logout">Sign out</a>
      ) : (
        <a href="/login" className="au-btn au-btn--dark">
          Log in
        </a>
      )}
    </li>
  </ul>
)

export default HeaderActions
