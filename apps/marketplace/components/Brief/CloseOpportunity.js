import React from 'react'
import PropTypes from 'prop-types'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'

import styles from '../../main.scss'

const CloseOpportunity = props => {
  const { brief, onCloseOpportunity } = props
  let seller = {
    name: ''
  }

  if (brief.sellers) {
    seller = Object.values(brief.sellers).pop()
  }

  return (
    <React.Fragment>
      <AUheading size="xl" level="1">
        Close &apos;{brief.title}&apos; ({brief.id})
      </AUheading>
      <p>If you close this opportunity now:</p>
      <ul>
        <li>{seller.name} will no longer be able to edit their submission</li>
        <li>
          you will be able to download{' '}
          {seller.name.toLowerCase().endsWith('s') ? `${seller.name}'` : `${seller.name}'s`} response straight away
        </li>
      </ul>
      <div className={styles.marginTop2}>
        <AUbutton onClick={onCloseOpportunity}>Close opportunity</AUbutton>
        <AUbutton as="tertiary" link={`${rootPath}/brief/${brief.id}/overview/${brief.lot}`}>
          Cancel request
        </AUbutton>
      </div>
    </React.Fragment>
  )
}

CloseOpportunity.defaultProps = {
  brief: {},
  onCloseOpportunity: () => {}
}

CloseOpportunity.propTypes = {
  brief: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lot: PropTypes.string.isRequired,
    sellers: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  onCloseOpportunity: PropTypes.func.isRequired
}

export default CloseOpportunity
