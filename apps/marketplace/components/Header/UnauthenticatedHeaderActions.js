import React from 'react'
import { rootPath } from 'marketplace/routes'

const UnauthenticatedHeaderActions = () => (
  <ul data-reactroot="" id="main-navigation" className="au-marketplace-header-inline-links">
    <li>
      <a href={`${rootPath}/signup`} className="au-btn au-btn--secondary au-btn--dark">
        Sign up
      </a>
    </li>
    <li>
      <a href={`${rootPath}/login`} className="au-btn au-btn--dark">
        Log in
      </a>
    </li>
  </ul>
)

export default UnauthenticatedHeaderActions
