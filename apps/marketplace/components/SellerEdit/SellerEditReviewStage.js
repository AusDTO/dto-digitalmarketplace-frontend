import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formProps from 'shared/form/formPropsSelector'
import YourDeclaration from './YourDeclaration'
import ShareWithAuthRep from './ShareWithAuthRep'
import NewMasterAgreement from './NewMasterAgreement'
import SignedMasterAgreement from './SignedMasterAgreement'

export const done = v => v.agreementStatus.signed

export class SellerEditReviewStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      acceptEnabled: false
    }
  }

  render() {
    const props = this.props
    const { model } = this.props
    const { canSign, canUserSign, signed, startDate } = props[model].agreementStatus
    const { representative, email } = props[model].supplier.data
    const { abn, code, name } = props[model].supplier

    return (
      <React.Fragment>
        {signed ? (
          <SignedMasterAgreement />
        ) : (
          <React.Fragment>
            {!canSign && <NewMasterAgreement startDate={startDate} representative={representative} />}
            {canSign &&
              !canUserSign && (
                <ShareWithAuthRep representative={representative} name={name} email={email} supplierCode={code} />
              )}
            {canSign &&
              canUserSign && (
                <YourDeclaration representative={representative} abn={abn} startDate={startDate} supplierCode={code} />
              )}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

SellerEditReviewStage.defaultProps = {
  stagesTodo: []
}

SellerEditReviewStage.propTypes = {
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerEditReviewStage)
