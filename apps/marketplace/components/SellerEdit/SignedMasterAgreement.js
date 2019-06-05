import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'

const SignedMasterAgreement = () => (
  <React.Fragment>
    <AUheading level="1" size="xl">
      You have accepted the Master Agreement
    </AUheading>
    <p>You can download the agreement below</p>
    <p>
      <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">
        Download Master Agreement [TODO]
      </a>
      <br />
      <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">
        View Master Agreement in HTML [TODO]
      </a>
    </p>
  </React.Fragment>
)

export default SignedMasterAgreement
