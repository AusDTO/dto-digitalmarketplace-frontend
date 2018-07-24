import React from 'react'

const SellerOnboarding = () => (
  <div className="row">
    <div className="col-sm-push-2 col-sm-8 col-xs-12">
      <h1 className="au-display-xl" title="Welcome to the Marketplace">
        Welcome to the Marketplace
      </h1>
      <p>What do you want to do next?</p>
      <h2 className="au-display-lg">List my digital offering on the Marketplace</h2>
      <span>
        <a href="/sellers/application">Set up my shopfront</a>
      </span>
      <h2 className="au-display-lg">Apply for an opportunity listed on the Marketplace</h2>
      <span>
        <a href="/2/opportunities">Browse opportunities</a>
      </span>
      <h2 className="au-display-lg">Learn about adding case studies to your shopfront</h2>
      <span>
        <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/115011407668-Adding-case-studies">
          Adding a case study
        </a>
      </span>
    </div>
  </div>
)

export default SellerOnboarding
