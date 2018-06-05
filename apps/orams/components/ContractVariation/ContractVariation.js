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
    const {
      form,
      serviceToEdit,
      priceData,
      priceObj,
      model,
      action,
      contractVariationForm,
      pricesArray,
      submitUpdatePrice,
      supplier,
      hideNav
    } = this.props

    return (
      <div className={styles.container}>
        <header>
          <h1 className="au-display-xl" tabIndex="-1">
            Pricing for {serviceToEdit.serviceName}
            <span>{serviceToEdit.subCategoryName ? ' ' + '(' + serviceToEdit.subCategoryName + ')' : ''}</span>
          </h1>
          <div className={styles.stepTitle}>Step 4 of 4</div>
          <div tabIndex="0" className={styles.backLink} onClick={() => this.props.goToStep(3)}>
            Back to pricing information
          </div>
        </header>
        <article role="main">
          <div className="au-callout au-callout--calendar-event">
            <div className="au-display-lg">
              <strong>Contract variation</strong>
            </div>
            <div>
              Check the pricing changes listed in this section before agreeing to the terms and conditions. After your
              changes are submitted a verification document will be emailed to <strong>{supplier.email}</strong> and
              your profile updated.
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
          {pricesArray &&
            pricesArray.map((priceObj, id = uniqueID()) =>
              <div key={id}>
                <div className={styles.priceRow}>
                  <div className="row">
                    <div className="col-md-3 col-sm-3">
                      {priceObj.regionState + ' ' + priceObj.regionName}
                    </div>
                    <div className="col-md-2 col-sm-2">
                      <span className={styles.price}>
                        {'$' + priceObj.price}
                      </span>
                    </div>
                    <div className="col-md-2 col-sm-2">
                      {priceObj.startDate}
                    </div>
                    <div className="col-md-2 col-sm-2">
                      {priceObj.endDate ? priceObj.endDate : 'Ongoing'}
                    </div>
                    <div className="col-md-2 col-sm-2">
                      {priceObj.capPrice}
                    </div>
                    <div className="col-md-1 col-sm-1">
                      <div
                        tabIndex="0"
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
              </div>
            )}
          <br />
          <Form
            model={model}
            id="submitprice"
            onSubmit={data => {
              hideNav(null)
              submitUpdatePrice(data)
            }}
          >
            <CheckboxDetailsField
              model={`${model}.agree`}
              id="agree"
              name="agree"
              value="agree"
              label={
                <span>
                  I am <strong>{supplier.representative}</strong> of <strong>{supplier.name}</strong> ({supplier.abn})
                  and I agree to the terms set out in the ORAMS agreement
                </span>
              }
              description="The terms of use"
              detailsModel={model}
              validators={{ required: val => val }}
              messages={{ required: 'Accept Terms of Use' }}
            />
            <br />
            <br />
            <button type="submit" className="au-btn">
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
