import React from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'

import styles from '../../main.scss'

const CloseOpportunity = props => {
  const { brief } = props
  let seller = {}

  if (brief.sellers) {
    seller = Object.values(brief.sellers).pop()
  }

  return (
    <React.Fragment>
      <AUheading size="xl" level="1">
        Close &apos;{brief.title}&apos;
      </AUheading>
      <p>If you close this opportunity now:</p>
      <ul>
        <li>{seller.name} will no longer be able to edit their submission</li>
        <li>
          you will be able to download {seller.name.endsWith('s') ? `${seller.name}'` : `${seller.name}'s`} response
          straight away
        </li>
      </ul>
      <div className={styles.marginTop2}>
        <AUbutton>Close opportunity</AUbutton>
        <AUbutton as="tertiary">Cancel request</AUbutton>
      </div>
    </React.Fragment>
  )
}

export default CloseOpportunity
