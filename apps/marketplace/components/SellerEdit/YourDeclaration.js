import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input'
import { acceptAgreement, declineAgreement } from 'marketplace/actions/sellerEditActions'
import { logout } from 'marketplace/actions/appActions'
import { SellerEditFormReducer } from 'marketplace/reducers'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import styles from './YourDeclaration.scss'
import AgreementLinks from './AgreementLinks'

const processResponse = response => {
  // only accept data defined in the form reducer
  const data = { ...SellerEditFormReducer }
  if (response.data) {
    Object.keys(response.data).map(property => {
      if (Object.keys(SellerEditFormReducer).includes(property)) {
        data[property] = response.data[property]
      }
      return true
    })
  }
  return data
}

export class YourDeclaration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      acceptEnabled: false,
      showDeclineConfirmation: false,
      loading: false
    }

    this.acceptAgreementClick = this.acceptAgreementClick.bind(this)
    this.declineAgreementClick = this.declineAgreementClick.bind(this)
    this.doNotDeclineAgreementClick = this.doNotDeclineAgreementClick.bind(this)
    this.yesToDeclineClick = this.yesToDeclineClick.bind(this)
  }

  componentDidUpdate = () => {
    if (this.state.showDeclineConfirmation) {
      window.scrollTo(0, this.declineAlertRef.offsetTop)
      this.doNotDecline.focus()
    }
  }

  acceptAgreementClick() {
    const data = { ...this.props[this.props.model] }
    this.setState({
      loading: true
    })
    return this.props.acceptAgreement(data.supplier.code).then(response => {
      if (response.status === 200) {
        this.props.changeFormModel(processResponse(response))
      }
      this.setState({
        loading: false
      })
    })
  }

  declineAgreementClick() {
    this.setState({
      showDeclineConfirmation: true
    })
  }

  doNotDeclineAgreementClick() {
    this.setState({
      showDeclineConfirmation: false
    })
  }

  yesToDeclineClick() {
    const data = { ...this.props[this.props.model] }
    this.setState({
      loading: true,
      showDeclineConfirmation: false
    })
    return this.props.declineAgreement(data.supplier.code).then(response => {
      if (response.status === 200) {
        this.props.logout()
      }
    })
  }

  render() {
    const props = this.props
    const { model } = this.props

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }
    return (
      <React.Fragment>
        {this.state.showDeclineConfirmation ? (
          <React.Fragment>
            <AUpageAlert as="error">
              <AUheading level="1" size="xl">
                If you decline the Master Agreement:
              </AUheading>
              <ul
                ref={ref => {
                  this.declineAlertRef = ref
                }}
              >
                <li>You will not be able to apply for opportunities on the Digital Marketplace.</li>
                <li>Your account will be removed.</li>
                <li>Your business profile will be removed from the seller catalogue.</li>
              </ul>
            </AUpageAlert>
            <p>If you choose to return to the Digital Marketplace in future, you will need to:</p>
            <ul>
              <li>Contact the Marketplace team to sign up again.</li>
              <li>Submit new requests for assessment in any of your previously approved categories.</li>
            </ul>
            <p>
              <button className={`${styles.understandColour} au-btn`} onClick={this.yesToDeclineClick}>
                I understand, decline the agreement
              </button>
              <button
                className={`au-btn au-btn--secondary`}
                onClick={this.doNotDeclineAgreementClick}
                ref={ref => {
                  this.doNotDecline = ref
                }}
              >
                Return to Master Agreement
              </button>
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <AUheading level="1" size="xl">
              Your declaration
            </AUheading>
            <p>
              A new Master Agreement takes effect from{' '}
              <b>{format(parse(props[model].agreementStatus.startDate), 'D MMMM YYYY')}</b>. Your company must accept
              the new agreement to apply for work through the Digital Marketplace. If you choose to decline, your
              profile will be removed and you will not be able to apply for work.
            </p>
            <p>
              <AgreementLinks />
            </p>
            <iframe
              title="Master Agreement"
              className={styles.masterAgreementFrame}
              src="/static/media/documents/digital-marketplace-master-agreement-2019-07-01.html"
            />
            <p>
              <AUcheckbox
                id="cb-agree"
                onClick={e => {
                  this.setState({
                    acceptEnabled: e.target.checked
                  })
                }}
                label={`I am ${props[model].supplier.data.representative}, an authorised representativee of (ABN: ${
                  props[model].supplier.abn
                }) and I agree to the terms set out in the Marketplace Master Agreement.`}
              />
            </p>
            <p>
              <AUbutton
                type="submit"
                disabled={!this.state.acceptEnabled}
                onClick={e => {
                  e.preventDefault()
                  this.acceptAgreementClick()
                }}
              >
                Accept
              </AUbutton>
              <AUbutton
                as="secondary"
                onClick={e => {
                  e.preventDefault()
                  this.declineAgreementClick()
                }}
              >
                Decline
              </AUbutton>
            </p>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

YourDeclaration.defaultProps = {}

YourDeclaration.propTypes = {
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = dispatch => ({
  changeFormModel: data => dispatch(actions.merge('SellerEditFlowPage', data)),
  acceptAgreement: supplierCode => dispatch(acceptAgreement(supplierCode)),
  declineAgreement: supplierCode => dispatch(declineAgreement(supplierCode)),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(YourDeclaration)
