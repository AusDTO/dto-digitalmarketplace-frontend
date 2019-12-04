import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formProps from 'shared/form/formPropsSelector'
import YourDeclaration from './YourDeclaration'
import ShareWithAuthRep from './ShareWithAuthRep'
import NewMasterAgreement from './NewMasterAgreement'
import SignedMasterAgreement from './SignedMasterAgreement'

export const done = v => (v.agreementStatus.newAgreement ? false : v.agreementStatus.signed)

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
    const { canUserSign, signed, newAgreement, currentAgreement } = props[model].agreementStatus
    const { representative, email } = props[model].supplier.data
    const { abn, code, name } = props[model].supplier

    return (
      <React.Fragment>
        {!signed && (
          <React.Fragment>
            {canUserSign ? (
              <YourDeclaration
                representative={representative}
                abn={abn}
                startDate={currentAgreement && currentAgreement.startDate}
                supplierCode={`${code}`}
                agreementHtmlUrl={currentAgreement && currentAgreement.htmlUrl}
                agreementPdfUrl={currentAgreement && currentAgreement.pdfUrl}
              />
            ) : (
              <ShareWithAuthRep
                representative={representative}
                name={name}
                email={email}
                supplierCode={`${code}`}
                agreementHtmlUrl={currentAgreement && currentAgreement.htmlUrl}
                agreementPdfUrl={currentAgreement && currentAgreement.pdfUrl}
              />
            )}
          </React.Fragment>
        )}
        {signed && !newAgreement && <SignedMasterAgreement />}
        {signed && newAgreement && canUserSign && (
          <NewMasterAgreement
            startDate={newAgreement.startDate}
            representative={representative}
            agreementHtmlUrl={newAgreement.htmlUrl}
            agreementPdfUrl={newAgreement.pdfUrl}
          />
        )}
        {signed && newAgreement && !canUserSign && (
          <ShareWithAuthRep
            representative={representative}
            name={name}
            email={email}
            supplierCode={`${code}`}
            agreementHtmlUrl={newAgreement.htmlUrl}
            agreementPdfUrl={newAgreement.pdfUrl}
          />
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
