import React from 'react'

import AUheading from '@gov.au/headings/lib/js/react.js'
import EditOpportunityTable from './EditOpportunityTable'

import styles from '../../main.scss'

const EditOpportunity = props => {
  const { brief, isOpenToAll, location } = props

  return (
    <div>
      <div className="row">
        <AUheading level="1" size="xl">
          Edit live opportunity
        </AUheading>
        <p className={styles.fontSizeMd}>
          If you&apos;re having issues making the changes you need, <a href="/contact-us">contact us</a>.
        </p>
      </div>
      <div className="row">
        <EditOpportunityTable brief={brief} isOpenToAll={isOpenToAll} location={location} />
      </div>
    </div>
  )
}

export default EditOpportunity
