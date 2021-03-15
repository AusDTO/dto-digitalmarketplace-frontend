import React from 'react'
// import { rootPath } from '../../../routes'

import CommonMobileLinks from './CommonMobileLinks'

const UnauthenticatedMobileLinks = () => (
  <React.Fragment>
    <div className="au-marketplace-header_mobile-link">
      <a href="/2/login">Sign in</a>
      {/* <a href={`${rootPath}/login`}>Sign in</a> */}
    </div>
    <div className="au-marketplace-header_mobile-link">
      <a href="/2/signup">Sign up</a>
    </div>
    <CommonMobileLinks />
  </React.Fragment>
)

export default UnauthenticatedMobileLinks
