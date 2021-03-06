import React from 'react'
import { rootPath } from 'marketplace/routes'
import CommonMobileLinks from './CommonMobileLinks'

const UnauthenticatedMobileLinks = () => (
  <React.Fragment>
    <div className="au-marketplace-header_mobile-link">
      <a href={`${rootPath}/login`}>Sign in</a>
    </div>
    <div className="au-marketplace-header_mobile-link">
      <a href={`${rootPath}/signup`}>Sign up</a>
    </div>
    <CommonMobileLinks />
  </React.Fragment>
)

export default UnauthenticatedMobileLinks
