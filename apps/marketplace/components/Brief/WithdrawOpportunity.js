import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import { rootPath } from 'marketplace/routes'

import styles from '../../main.scss'

export class WithdrawOpportunity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasAuthorityToWithdraw: false
    }
  }

  render = () => {
    const { brief, onWithdrawOpportunity } = this.props

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
        <AUcheckbox
          checked={this.state.hasAuthorityToWithdraw}
          className={styles.marginTop2}
          id="authorityToWithdraw"
          label="I have the authority to withdraw this opportunity and understand once I do so I will be unable to re-open it"
          name="authorityToWithdraw"
          onChange={() => {}}
          onClick={e => {
            this.setState({
              hasAuthorityToWithdraw: e.target.checked
            })
          }}
        />
        <div className={styles.marginTop2}>
          <AUbutton onClick={onWithdrawOpportunity}>Withdraw opportunity</AUbutton>
          <AUbutton as="tertiary" link={`${rootPath}/brief/${brief.id}/overview/${brief.lot}`}>
            Cancel request
          </AUbutton>
        </div>
      </React.Fragment>
    )
  }
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
