import React from 'react'

import AUheading from '@gov.au/headings/lib/js/react.js'

import styles from '../../main.scss'

const EditOpportunity = props => (
  <div>
    <AUheading level="1" size="xl">
      Edit live opportunity
    </AUheading>
    <p className={styles.fontSizeMd}>
      If you&apos;re having issues making the changes you need, <a href="/contact-us">contact us</a>.
    </p>
  </div>
)

export default EditOpportunity
