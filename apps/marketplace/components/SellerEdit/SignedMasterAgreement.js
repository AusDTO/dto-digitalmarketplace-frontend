import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'

const SignedMasterAgreement = () => (
  <React.Fragment>
    <AUheading level="1" size="xl">
      Master agreement accepted
    </AUheading>
    <p>Your authorised representative has already accepted the Master Agreement on behalf of your business</p>
    <p>
      <a href="/static/media/documents/digital-marketplace-master-agreement-2019-07-01.pdf" rel="noopener noreferrer" target="_blank">
        Download Master Agreement
      </a>
      <br />
      <a href="/static/media/documents/digital-marketplace-master-agreement-2019-07-01.html" rel="noopener noreferrer" target="_blank">
        View Master Agreement in HTML
      </a>
    </p>
  </React.Fragment>
)

export default SignedMasterAgreement
