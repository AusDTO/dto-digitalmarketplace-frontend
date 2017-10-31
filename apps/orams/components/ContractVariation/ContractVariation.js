/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import { required } from 'shared/validators'
import formProps from 'shared/form/formPropsSelector'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import styles from './ContractVariation.scss'

class ContractVariation extends Component {
  render() {
    const { form, serviceToEdit, priceData, priceObj, model, action, contractVariationForm } = this.props
    return (
      <div className={styles.container}>
        <header>
          <h1 className="uikit-display-5" tabIndex="-1">
            Pricing for {serviceToEdit.serviceName}
            <span>{serviceToEdit.subCategoryName ? ' ' + '(' + serviceToEdit.subCategoryName + ')' : ''}</span>
          </h1>
          <div className={styles.stepTitle}>Step 4 of 4</div>
          <div className={styles.backLink} onClick={() => this.props.goToStep(3)}>
            Back to pricing information
          </div>
        </header>
        <article role="main">
          <div className="uikit-callout uikit-callout--calendar-event">
            <div className="uikit-display-3">
              <strong>Contract variation</strong>
            </div>
            <div>
              Check the pricing changes listed in this section before agreeing to the terms and conditions. After your
              changes are submitted a verification document will be emailed to <strong>kris.kringle@test.gov.au</strong>{' '}
              and your profile updated.
            </div>
          </div>
          <div className={styles.headingRow}>
            <div className="row">
              <div className="col-md-3 col-sm-3">Region</div>
              <div className="col-md-2 col-sm-2">
                New Price <span className={styles.gstTitle}>inc GST</span>
              </div>
              <div className="col-md-2 col-sm-2">Start date</div>
              <div className="col-md-2 col-sm-2">End date</div>
              <div className="col-md-2 col-sm-2">Reverts to</div>
              <div className="col-md-1 col-sm-1" />
            </div>
          </div>
          <div className={styles.priceRow}>
            <div className="row">
              <div className="col-md-3 col-sm-3">
                {priceData.region.state + ' ' + priceData.region.name}
              </div>
              <div className="col-md-2 col-sm-2">
                <span className={styles.price}>
                  {'$' + priceObj.price}
                </span>
              </div>
              <div className="col-md-2 col-sm-2">
                {priceObj.start_date}
              </div>
              <div className="col-md-2 col-sm-2">
                {priceObj.end_date ? priceObj.end_date : 'Ongoing'}
              </div>
              <div className="col-md-2 col-sm-2">
                {priceData.capPrice}
              </div>
              <div className="col-md-1 col-sm-1">
                <div
                  className={styles.link}
                  onClick={() => {
                    this.props.goToStep(3)
                    window.scrollTo(0, 0)
                  }}
                >
                  <strong>Edit</strong>
                </div>
              </div>
            </div>
          </div>
          <br />
          <Form model={model} id="submitprice" onSubmit={data => handleSubmit(data)}>
            <CheckboxDetailsField
              model={`${model}.agree`}
              id="agree"
              name="agree"
              value="agree"
              label={
                <span>
                  I am Kris Kringle of Konekt (43 096 505 123) and I agree to the terms set out in the ORAMS agreement
                </span>
              }
              description="The terms of use"
              detailsModel={model}
              validators={{ required: val => val }}
              messages={{ required: 'Accept Terms of Use' }}
            />
            <br />
            <br />
            <button type="submit" className="uikit-btn">
              Update profile
            </button>
          </Form>
        </article>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...formProps(state, 'contractVariationForm')
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export { mapStateToProps, ContractVariation as Form }

export default connect(mapStateToProps, mapDispatchToProps)(ContractVariation)
