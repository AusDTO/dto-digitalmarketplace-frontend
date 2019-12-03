import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import { required } from 'marketplace/components/validators'
import { rootPath } from 'marketplace/routes'
import Textarea from 'shared/form/Textarea'

import styles from '../../main.scss'

export class WithdrawOpportunity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasAuthorityToWithdraw: false,
      hasErrors: false
    }

    this.handleWithdrawButtonClick = this.handleWithdrawButtonClick.bind(this)
  }

  handleWithdrawButtonClick = () => {
    this.setState({
      hasErrors: false
    })

    this.props.resetFormValidity()
  }

  render = () => {
    const { brief, model, onSubmitFailed, onWithdrawOpportunity } = this.props

    const requiredReasonToWithdraw = formValues => {
      const validReason = required(formValues.reasonToWithdraw)
      if (!validReason) {
        this.setState({
          hasErrors: true
        })
      }

      return validReason
    }

    const requiredAuthorityToWithdraw = () => {
      const validAuthority = this.state.hasAuthorityToWithdraw === true
      if (!validAuthority) {
        this.setState({
          hasErrors: true
        })
      }

      return validAuthority
    }

    return (
      <Form
        model={model}
        onSubmit={onWithdrawOpportunity}
        onSubmitFailed={onSubmitFailed}
        validateOn="submit"
        validators={{
          '': {
            requiredReasonToWithdraw,
            requiredAuthorityToWithdraw
          }
        }}
      >
        <AUheading size="xl" level="1">
          Withdraw &apos;{brief.title}&apos;
        </AUheading>
        {this.state.hasErrors && (
          <ErrorAlert
            model={model}
            messages={{
              requiredReasonToWithdraw: 'You must enter a reason for withdrawal',
              requiredAuthorityToWithdraw:
                'Select the checkbox to confirm you have authority to withdraw this opportunity'
            }}
          />
        )}
        <p>If you withdraw this opportunity:</p>
        <ul>
          <li>the Marketplace will notify all sellers who have been invited to apply</li>
          <li>your reason for withdrawing will be published on the (closed) opportunity</li>
          <li>you may not be able to re-open this opportunity</li>
        </ul>
        <div className={styles.marginTop2}>
          <Textarea
            controlProps={{
              limit: 25,
              rows: '2'
            }}
            description="Your reason will be published on the (closed) opportunity"
            id="reasonToWithdraw"
            label="Reason for withdrawing"
            key="reasonToWithdraw"
            messages={{
              required: `You must enter a withdrawal reason`
            }}
            model={`${model}.reasonToWithdraw`}
            name="reasonToWithdraw"
            validators={{ required }}
          />
        </div>
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
          <AUbutton onClick={this.handleWithdrawButtonClick} type="submit">
            Withdraw opportunity
          </AUbutton>
          <AUbutton as="tertiary" link={`${rootPath}/brief/${brief.id}/overview/${brief.lot}`}>
            Cancel request
          </AUbutton>
        </div>
      </Form>
    )
  }
}

WithdrawOpportunity.defaultProps = {
  brief: {},
  model: '',
  onSubmitFailed: () => {},
  onWithdrawOpportunity: () => {}
}

WithdrawOpportunity.propTypes = {
  brief: PropTypes.object.isRequired,
  model: PropTypes.string,
  onSubmitFailed: PropTypes.func,
  onWithdrawOpportunity: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  brief: state.brief.brief
})

const mapDispatchToProps = (dispatch, props) => ({
  resetFormValidity: () => dispatch(actions.resetValidity(props.model))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawOpportunity)
