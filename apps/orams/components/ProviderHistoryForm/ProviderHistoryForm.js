/* eslint-disable */
import React, { Component } from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'
import PricingResultsTable from 'orams/components/PricingResultsTable/PricingResultsTable'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import formProps from 'shared/form/formPropsSelector'
import { required, validDateNotInFuture, validPriceRange } from 'shared/validators'
import Datefield from 'shared/form/Datefield'
import RadioList from 'shared/form/RadioList'
import SubmitForm from 'shared/form/SubmitForm'
import StatefulError from 'shared/form/StatefulError'
import ErrorBox from 'shared/form/ErrorBox'

import styles from './ProviderHistoryForm.scss'

class ProviderHistoryForm extends Component {
  tableSection() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.errorMessage) {
      return (
        <AUpageAlert as="error">
          <h4 className="au-display-sm">There was a problem loading your results</h4>
        </AUpageAlert>
      )
    }

    return <PricingResultsTable {...this.props} />
  }
  render() {
    const { serviceData, model, action, form, buttonClick, submitProviderHistoryForm } = this.props

    return (
      <main>
        <div className={styles.container}>
          <header>
            <h1 className="au-display-xl" tabIndex="-1">
              Invoice price check
            </h1>
            <div className={styles.stepTitle}>Step 2 of 2</div>
            <div className={styles.heading}>Check pricing for {serviceData.name}</div>
            <div
              tabIndex="0"
              className={styles.backLink}
              onClick={() => {
                this.props.goToStep(1)
              }}
            >
              Back to select a provider
            </div>
          </header>
          <article role="main">
            <div className="row">
              <div className="col-xs-12 col-sm-3">
                <Form
                  model={model}
                  action={action}
                  id="BusinessDetails__create"
                  validateOn="submit"
                  onSubmit={data => submitProviderHistoryForm(data)}
                >
                  <div className={styles.subTitle}>1. Select the service</div>
                  {serviceData.services.map((service, id = uniqueID()) => (
                    <div key={id}>
                      {service.subCategories.map((subCategory, subId = uniqueID()) => (
                        <div key={subId}>
                          <RadioList
                            model={`${model}.service`}
                            name="service"
                            id="service"
                            label=""
                            options={[
                              {
                                value: `${service.id + '-' + subCategory.id}`,
                                label: `${service.name} ${subCategory.name ? '- ' + subCategory.name : ''}`
                              }
                            ]}
                            validators={{
                              required
                            }}
                            messages={{
                              required: 'You must select a service type.'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                  <div>
                    <div className={styles.subTitle}>2. Enter the date of service</div>
                    <StatefulError
                      model={`${model}.date`}
                      id="date_error"
                      messages={{
                        validDate: 'Date is required.'
                      }}
                    />
                    <Control
                      model={`${model}.date`}
                      component={Datefield}
                      name="date"
                      id="date"
                      label=""
                      controlProps={{
                        id: 'date',
                        model: `${model}.date`,
                        htmlFor: 'date',
                        label: ''
                      }}
                      validators={{
                        validDateNotInFuture
                      }}
                    />
                    <br />
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-11">
                      <button type="submit" className="au-btn">
                        Filter date
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
              <div className="col-xs-12 col-sm-8 col-sm-push-1">{this.tableSection()}</div>
            </div>
          </article>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...formProps(state, 'providerHistoryForm')
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export { mapStateToProps, ProviderHistoryForm as Form }

export default connect(mapStateToProps, mapDispatchToProps)(ProviderHistoryForm)
