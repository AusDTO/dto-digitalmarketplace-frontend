import React from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import { rootPath } from 'marketplace/routes'
import EditOpportunityTable from './EditOpportunityTable'

import styles from '../../../main.scss'

const EditOpportunity = props => {
  const { brief, edits, isOpenToAll, location } = props

  return (
    <div className="col-xs-12">
      <div className="row">
        <AUheading level="1" size="xl">
          Edit live opportunity
        </AUheading>
        <p className={styles.fontSizeMd}>
          If you&apos;re having issues making the changes you need, <a href="/contact-us">contact us</a>.
        </p>
      </div>
      <div className="row">
        <EditOpportunityTable brief={brief} edits={edits} isOpenToAll={isOpenToAll} location={location} />
      </div>
      <div className="row">
        <AUcheckbox
          className={`${styles.marginTop2}`}
          id="understandsEditProcess"
          label={
            isOpenToAll
              ? 'I understand if I submit these changes, sellers will be able to view previous versions of my updates.'
              : 'I understand if I submit these changes, invited sellers will be notified and can view previous versions of my updates.'
          }
          name="understandsEditProcess"
          onChange={() => {}}
          onClick={() => {}}
        />
      </div>
      <div className={`row ${styles.marginTop2}`}>
        <AUbutton>Submit changes</AUbutton>
        <AUbutton as="tertiary" link={`${rootPath}/brief/${brief.id}/overview/${brief.lot}`}>
          Cancel all updates
        </AUbutton>
      </div>
    </div>
  )
}

export default EditOpportunity
