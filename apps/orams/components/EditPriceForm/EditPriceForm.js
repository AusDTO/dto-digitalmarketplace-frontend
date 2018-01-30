/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import { Form, Control } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import { required, validDate, validPriceRange, validMonth } from 'shared/validators'
import Datefield from 'shared/form/Datefield'
import RadioList from 'shared/form/RadioList'
import SubmitForm from 'shared/form/SubmitForm'
import styles from './EditPriceForm.scss'
import StatefulError from 'shared/form/StatefulError'
import ErrorBox from 'shared/form/ErrorBox'
import isBefore from 'date-fns/is_before'

class EditPriceForm extends Component {
  render() {
    const {
      submitClicked,
      priceData,
      serviceToEdit,
      model,
      action,
      form,
      editPriceForm,
      handlePriceSubmit,
      buttonClick,
      supplierCode
    } = this.props
    const date = editPriceForm.date
    const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    const tomorrowDay = currentDate.getDate()
    const tomorrowMonth = currentDate.getMonth() + 1
    const tomorrowYear = currentDate.getFullYear()
    const tomorrowDate = tomorrowYear + '-' + tomorrowMonth + '-' + tomorrowDay
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }
    const onSubmitFailed = () => {
      window.scrollTo(0, 0)
    }

    return (
      <div className={styles.container}>
        <header>
          <h1 className="uikit-display-5" tabIndex="-1">
            Pricing for {serviceToEdit.serviceName}
            <span>{serviceToEdit.subCategoryName ? ' ' + '(' + serviceToEdit.subCategoryName + ')' : ''}</span>
          </h1>
          <div className={styles.stepTitle}>Step 3 of 4</div>
          <div
            className={styles.backLink}
            onClick={() =>
              this.props.loadPrices(
                supplierCode,
                serviceToEdit.serviceTypeId,
                serviceToEdit.categoryId,
                serviceToEdit.serviceName,
                serviceToEdit.subCategoryName ? serviceToEdit.subCategoryName : ''
              )
            }
          >
            Back to pricing information
          </div>
        </header>
        <article role="main">
          <div className="uikit-callout uikit-callout--calendar-event">
            <div>
              <strong>Region: {priceData.region.state + ' ' + priceData.region.name}</strong>
            </div>
            <div>
              Pricing must be a fixed fee and all inclusive of GST, travel, assessment and report. The negotiated cap
              for each region is specified inline, you are not able to exceed.
            </div>
          </div>
          <ErrorBox model={model} setFocus={setFocus} submitClicked={submitClicked} />
          <Form
            model={model}
            action={action}
            id="BusinessDetails__create"
            validateOn="submit"
            onSubmit={data => handlePriceSubmit(data, priceData.capPrice)}
            validators={{
              '': {
                // Form-level validator
                validSequenceOfDates: vals => (vals.date === 'custom' ? isBefore(vals.start_date, vals.end_date) : true)
              }
            }}
            onSubmitFailed={onSubmitFailed}
          >
            <Textfield
              model={`${model}.price`}
              name="price"
              id="price"
              htmlFor="price"
              label="Enter a new price including GST"
              description={'The new price must not exceed $' + priceData.capPrice}
              validators={{ validPriceRange: validPriceRange(priceData.capPrice) }}
              messages={{
                validPriceRange: 'Price must be valid and less than $' + priceData.capPrice
              }}
            />
            <div className="custom-radio">
              <RadioList
                model={`${model}.date`}
                name="date"
                id="date"
                label="How long is this price valid for?"
                options={[
                  {
                    value: `${tomorrowDate}`,
                    label: 'From tomorrow onwards'
                  },
                  {
                    value: 'custom',
                    label: 'Select a date range'
                  }
                ]}
                validators={{
                  required
                }}
                messages={{
                  required: 'You must select how long is the price valid for.'
                }}
              />
            </div>
            {date &&
              date === 'custom' && (
                <div>
                  <StatefulError
                    model={`${model}.start_date`}
                    id="start_date_error"
                    messages={{
                      validDate: 'Start date is required and must be in the future.',
                      validMonth: 'Month can only be from 1 to 12.'
                    }}
                  />
                  <StatefulError
                    model={`${model}`}
                    id="validSequenceOfDates"
                    messages={{
                      validSequenceOfDates: 'The start date must be prior to the end date.'
                    }}
                  />
                  <Control
                    model={`${model}.start_date`}
                    component={Datefield}
                    name="start_date"
                    id="start_date"
                    label="Start date"
                    controlProps={{
                      id: 'start_date',
                      model: `${model}.start_date`,
                      htmlFor: 'start_date',
                      label: 'Start date'
                    }}
                    validators={{
                      validDate,
                      validMonth
                    }}
                  />
                  <br />
                  <StatefulError
                    model={`${model}.end_date`}
                    id="end_date_error"
                    messages={{
                      validDate: 'End date is required and must be in the future.',
                      validMonth: 'Month can only be from 1 to 12.'
                    }}
                  />
                  <Control
                    model={`${model}.end_date`}
                    component={Datefield}
                    name="end_date"
                    id="end_date"
                    label="End date"
                    controlProps={{
                      id: 'end_date',
                      model: `${model}.end_date`,
                      htmlFor: 'end_date',
                      label: 'End date'
                    }}
                    validators={{
                      validDate
                    }}
                  />
                  <br />
                </div>
              )}
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-11">
                <button
                  type="submit"
                  onClick={() => {
                    buttonClick('saveAnother')
                  }}
                  className="uikit-btn right-button-margin"
                >
                  Save and edit another
                </button>
                <button type="submit" onClick={() => buttonClick('continueToFinalStep')} className="uikit-btn">
                  Continue to contract variation
                </button>
              </div>
            </div>
          </Form>
        </article>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...formProps(state, 'editPriceForm')
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export { mapStateToProps, EditPriceForm as Form }

export default connect(mapStateToProps, mapDispatchToProps)(EditPriceForm)
