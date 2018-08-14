import React from 'react'
import DocumentTitle from 'react-document-title'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

const BriefResponseSupplierError = props => (
  <div className="row">
    <DocumentTitle title="Seller Profile Error - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <h2 class="au-header__heading">
          Seller profile error
        </h2>
        <article role="main">
          <p>Please fix the following problems with your profile before responding to a brief</p>
          <AUpageAlert as="error"
                       setFocus={props.setFocus}>
            <h4 className="au-display-sm">
              The following problems were detect with your seller profile
            </h4>
            <ul>
              {Array.isArray(props.app.errorMessage) && props.app.errorMessage.map((err, i) => (
                <li key={`errorMessage${i}`}>{err.message}</li>)
              )}
          </ul>
          </AUpageAlert>
          <a link="/sellers/edit" class="au-btn">
            Update your profile
          </a>
        </article>
      </div>
    </DocumentTitle>
  </div>
)

export default BriefResponseSupplierError
