import React                from 'react';
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux';
import { Link }             from 'react-router-dom';
import { Form, Control }    from 'react-redux-form';
import isEmpty              from 'lodash/isEmpty';
import kebabCase            from 'lodash/kebabCase';

import Layout               from '../../../../shared/Layout';
import BaseForm             from '../../../../shared/form/BaseForm';
import ErrorBox             from '../../../../shared/form/ErrorBox';
import StatefulError        from '../../../../shared/form/StatefulError';
import formProps            from '../../../../shared/reduxModules/formPropsSelector';
import SubmitForm           from '../../../../shared/form/SubmitForm';

import StepNav              from '../StepNav';
import { findValidServices } from '../../redux/helpers';
import { required, notNegativeNumber, onlyWholeNumbers }         from '../../../../validators';

import PageAlert from '@gov.au/page-alerts'

import styles from '../SellerRegistration.css';
import pricing from './PricingForm.css';

class PricingForm extends BaseForm {

  static propTypes = {
    model: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    action: PropTypes.string.isRequired,
    csrf_token: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    services: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    nextRoute: PropTypes.string.isRequired,
    submitClicked: PropTypes.bool,
  }

  render() {
    const { model, form, action, csrf_token, title, buttonText, services, children,  onSubmit, nextRoute, submitClicked, domains, applicationErrors } = this.props;
    let validServices = findValidServices(services);

    if (isEmpty(validServices)) {
      return (
        <Layout>
          <header>
            <h1 className="au-display-xl" tabIndex="-1">{title}</h1>
          </header>
          <article role="main">
            <p>You must select the services you offer before specifying pricing!</p>
            <p><Link to="/domains">Select services</Link></p>
          </article>
        </Layout>
      )
    }

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <Layout>
        <header styleName="styles.content">
            { (form.submitFailed === false) && applicationErrors.length > 0 ? (
              <PageAlert as="error">
                  <h3>Errors</h3>
                  <ul>
                  {applicationErrors.map(ae => {
                      return <li key="{ae.message}">{ae.message}</li>
                  })}
                  </ul>
              </PageAlert> ) : ''
            }
            <h1 className="au-display-xl" styleName="styles.content-heading" tabIndex="-1">{title}</h1>
            <p>
              The Marketplace asks for a comparable level of pricing across all sellers. This helps ensure that your 
              business offers value for money.
            </p>
            <p>
              To do this, we ask sellers to list their maximum daily rate (including GST) for each service, using {' '}
              <a href="https://www.sfia-online.org/en/sfia-6/busskills/lr5" rel="external nofollow">
                 Skills Framework for the Information Age (SFIA) level 5
              </a>as a guide.
            </p>
            <p>
              For more information, you can also read our {' '}
              <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000054595-Seller-pricing" rel="external">
                 Seller Pricing FAQs
              </a>
              and view the 
              <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000080555-Daily-rates-trend-charts" rel="external">
                daily rates trend charts
              </a>.
            </p>
        </header>
        <article role="main">
          <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus}/>
          <Form
            model={model}
            action={action}
            method="post"
            id="DomainSelector__create"
            component={SubmitForm}
            onCustomSubmit={onSubmit}
            valid={form.valid}
            >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
            )}

            {Object.keys(validServices).map((service, i) => (
              <fieldset key={`pricing.${service}.${i}`} className="field">
                <legend>{service}</legend>
                <label>
                  We have set a price threshold for this area of expertise: {`$${parseFloat(domains.prices.maximum[service] || 0)}`} (GST inclusive). If you nominate a price above this threshold we will assess your case studies at a higher standard to verify that your service offers value for money. 
                </label>
                <StatefulError
                  model={`${model}.pricing.${service}.maxPrice`}
                  messages={{
                    required: `You must provide a max price for ${service}.`,
                    notNegativeNumber: `Price can't have negative number for ${service}.`,
                    onlyWholeNumbers: `Price must be whole dollars for ${service}.`
                  }}
                  id={`${kebabCase(service)}-maxprice`}
                />
                <div>
                  <span><strong>$</strong></span>
                  <span styleName="pricing.inline-input">
                    <Control.text
                      type="text"
                      id={`${kebabCase(service)}-maxprice`}
                      name={`services.${service}.maxPrice`}
                      model={`${model}.pricing.${service}.maxPrice`}
                      validators={{ required, notNegativeNumber, onlyWholeNumbers }}
                    />
                  </span>
                  <span>(including GST)</span>
                </div>
              </fieldset>
            ))}

            {children}

            <StepNav buttonText={buttonText} to={nextRoute}/>
          </Form>
        </article>
      </Layout>
    )
  }
}

PricingForm.defaultProps = {
  buttonText: 'Save &amp; Continue',
  title: 'Pricing',
  services: {}
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'pricingForm'),
    domainSelectorForm: state.domainSelectorForm,
    applicationErrors: state.application_errors.filter(ae => ae.step === 'pricing')
  }
}

export default connect(mapStateToProps)(PricingForm)
