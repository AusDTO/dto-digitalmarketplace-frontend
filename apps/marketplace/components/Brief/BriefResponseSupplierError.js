import React from 'react'
import DocumentTitle from 'react-document-title'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

const BriefResponseSupplierError = props => (
  <div className="row">
    <DocumentTitle title="Before you can apply - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <h2 class="au-header__heading">
          Before you can apply
        </h2>
        <br />
        <article role="main">
          <p>
            <AUpageAlert as="error"
                        setFocus={props.setFocus}>
              <h4 className="au-display-sm">
                Please update your profile with:
              </h4>
              <ul>
                {Array.isArray(props.app.errorMessage) && props.app.errorMessage.map((err, i) => (
                  <li key={`errorMessage${i}`}>{err.message}</li>)
                )}
              </ul>
            </AUpageAlert>
          </p>
          <p>
            <a link="/sellers/edit" class="au-btn">
              Update your profile
            </a>
          </p>
        </article>
      </div>
    </DocumentTitle>
  </div>
)

export default BriefResponseSupplierError
