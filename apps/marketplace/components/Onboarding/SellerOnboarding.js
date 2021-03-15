import React from 'react'
import { rootPath } from '../../routes'

const SellerOnboarding = () => (
  <div className="row">
    <div className="col-xs-12">
      <h1 className="au-display-xl" title="Welcome to the Marketplace">
        Welcome to the Marketplace
      </h1>
      <p>
        <a href={`${rootPath}/login`}>Log in</a> to set up your seller profile on the Marketplace.
      </p>
    </div>
  </div>
)
export default SellerOnboarding
