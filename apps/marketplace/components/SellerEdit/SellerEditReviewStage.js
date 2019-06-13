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
    return (
      <React.Fragment>
        {props[model].agreementStatus.signed ? (
          <SignedMasterAgreement {...props} />
        ) : (
          <React.Fragment>
            {!props[model].agreementStatus.canSign && <NewMasterAgreement {...props} />}
            {props[model].agreementStatus.canSign &&
              !props[model].agreementStatus.canUserSign && <ShareWithAuthRep {...props} />}
            {props[model].agreementStatus.canSign &&
              props[model].agreementStatus.canUserSign && <YourDeclaration {...props} />}
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
