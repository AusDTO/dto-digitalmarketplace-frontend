/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import { Form, Control } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import { required, limitNumbers, validDate } from 'shared/validators'
import Datefield from 'shared/form/Datefield'
import RadioList from 'shared/form/RadioList'
import styles from './EditPriceForm.scss'

class EditPriceForm extends Component {
  render() {
    console.log('editPriceForm', editPriceForm)
    const { priceData, serviceToEdit, model, action, form, editPriceForm } = this.props
    const date = editPriceForm.date
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
                serviceToEdit.serviceTypeId,
                serviceToEdit.categoryId,
                serviceToEdit.serviceName,
                serviceToEdit.subCategoryName ? serviceToEdit.subCategoryName : ''
              )}
          >
            Back to pricing information
          </div>
        </header>
        <article role="main">
          <div className="uikit-callout uikit-callout--calendar-event">
            <div>
              <strong>
                Region: {priceData.region.state + ' ' + priceData.region.name}
              </strong>
            </div>
            <div>
              Pricing must be a fixed fee and all inclusive of GST, travel, assessment and report. The negotiated cap
              for each region is specified inline, you are not able to exceed.
            </div>
          </div>
          <Form
            model={model}
            action={action}
            valid={form.valid}
            validateOn="submit"
            onSubmit={data => handleSubmit(data)}
          >
            <Textfield
              model={`${model}.price`}
              name="price"
              id="price"
              htmlFor="price"
              label="Enter a new price including GST"
              description={'The new price must not exceed $' + priceData.capPrice}
              validators={{ required, limitNumbers }}
              messages={{
                required: 'Price is required'
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
                    value: 'date',
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
              date === 'custom' &&
              <div>
                <Control
                  model={`${model}.start_date`}
                  component={Datefield}
                  name="start_date"
                  id="start-date"
                  label="Start date"
                  validators={{ validDate }}
                />
                <br />
                <Control
                  model={`${model}.end_date`}
                  component={Datefield}
                  name="end_date"
                  id="end-date"
                  label="End date"
                  validators={{ validDate }}
                />
                <br />
              </div>}
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-11">
                <button className={styles.button}>Save and edit another</button>
                <button className={styles.button}>Continue to contract variation</button>
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
