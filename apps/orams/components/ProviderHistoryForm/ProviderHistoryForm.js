/* eslint-disable */
import React, { Component } from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'
import PricingResultsTable from 'orams/components/PricingResultsTable/PricingResultsTable'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import PageAlert from '@gov.au/page-alerts'
import formProps from 'shared/form/formPropsSelector'
import { required, validDate, validPriceRange } from 'shared/validators'
import Datefield from 'shared/form/Datefield'
import RadioList from 'shared/form/RadioList'
import SubmitForm from 'shared/form/SubmitForm'
import StatefulError from 'shared/form/StatefulError'
import ErrorBox from 'shared/form/ErrorBox'

import styles from './ProviderHistoryForm.scss'

class ProviderHistoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  tableSection() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.errorMessage) {
      return (
        <PageAlert as="error">
          <h4>There was a problem loading your results</h4>
        </PageAlert>
      )
    }

    return <PricingResultsTable {...this.props} />
  }
  render() {
    const { serviceData, model, action, form, buttonClick } = this.props
    console.log('serviceData', serviceData)

    return (
      <main>
        <div className={styles.container}>
          <header>
            <h1 className="uikit-display-5" tabIndex="-1">
              Invoice price check
            </h1>
            <div className={styles.stepTitle}>Step 2 of 2</div>
            <div className={styles.heading}>
              Check pricing for {serviceData.supplier.name}
            </div>
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
                  onSubmit={data => handlePriceSubmit(data, priceData.capPrice)}
                >
                  <div className={styles.subTitle}>1. Select the service</div>
                  {serviceData.services.map((service, id = uniqueID()) =>
                    <div key={id}>
                      <RadioList
                        model={`${model}.service`}
                        name="service"
                        id="service"
                        label=""
                        options={[
                          {
                            value: `${service.id}`,
                            label: `${service.name}`
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
                  )}
                  <div>
                    <div className={styles.subTitle}>2. Enter the date of service</div>
                    <StatefulError
                      model={`${model}.start_date`}
                      id="start_date_error"
                      messages={{
                        validDate: 'Start date is required and must be in the future.'
                      }}
                    />
                    <Control
                      model={`${model}.start_date`}
                      component={Datefield}
                      name="start_date"
                      id="start_date"
                      label=""
                      controlProps={{
                        id: 'start_date',
                        model: `${model}.start_date`,
                        htmlFor: 'start_date',
                        label: ''
                      }}
                      validators={{
                        validDate
                      }}
                    />
                    <br />
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-11">
                      <button
                        type="submit"
                        onClick={() => buttonClick('continueToFinalStep')}
                        className={`${styles.yellowButton} uikit-btn`}
                      >
                        Filter date
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
              <div className="col-xs-12 col-sm-8 col-sm-push-1">
                {this.tableSection()}
              </div>
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
