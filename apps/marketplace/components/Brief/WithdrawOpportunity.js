import React from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Textarea from 'shared/form/Textarea'

import { required } from 'marketplace/components/validators'
import { rootPath } from 'marketplace/routes'

import styles from '../../main.scss'

const WithdrawOpportunity = props => {
  const { brief, onWithdrawOpportunity } = props

  return (
    <React.Fragment>
      <AUheading size="xl" level="1">
        Withdraw &apos;{brief.title}&apos;
      </AUheading>
      <p>If you withdraw this opportunity:</p>
      <ul>
        <li>the Marketplace will notify all sellers who have been invited to apply</li>
        <li>your reason for withdrawing will be published on the (closed) opportunity</li>
        <li>you may not be able to re-open this opportunity</li>
      </ul>
      <div className={styles.marginTop2}>
        <AUbutton onClick={onWithdrawOpportunity}>Withdraw opportunity</AUbutton>
        <AUbutton as="tertiary" link={`${rootPath}/brief/${brief.id}/overview/${brief.lot}`}>
          Cancel request
        </AUbutton>
      </div>
    </React.Fragment>
  )
}

WithdrawOpportunity.defaultProps = {
  brief: {},
  onWithdrawOpportunity: () => {}
}

WithdrawOpportunity.propTypes = {
  brief: PropTypes.object.isRequired,
  onWithdrawOpportunity: PropTypes.func.isRequired
}

export default WithdrawOpportunity
