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
import { findValidServices, isDailyRateMissing } from '../../redux/helpers'
import { missingDailyRates } from '../../redux/modules/application'
import { required, notNegativeNumber, onlyWholeNumbers }         from '../../../../validators';

import PageAlert from '@gov.au/page-alerts'

import './PricingForm.css';

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

  componentDidMount() {
    if (this.props.pricingForm.pricing && isDailyRateMissing(this.props.pricingForm.pricing, this.props.services)) {
      this.props.hasMissingDailyRates(isDailyRateMissing(this.props.pricingForm.pricing, this.props.services))
    } else {
      this.props.hasMissingDailyRates(false)
    }
  }

  render() {
    const { model, form, action, csrf_token, title, buttonText, services, children,  onSubmit, nextRoute, submitClicked, domains } = this.props;
    let validServices = findValidServices(services);

    if (isEmpty(validServices)) {
      return (
        <Layout>
          <header>
            <h1 tabIndex="-1">{title}</h1>
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
        <header>
            { this.props.missingDailyRates ?
              <PageAlert as="error"><p><strong>Maximum daily rates are missing. Please add the daily rates to continue.</strong></p></PageAlert>
            : '' }
            <h1 tabIndex="-1">{title}</h1>
            <p>Indicate the maximum daily rate you normally charge for services.</p>
            <p>Please use the <a href="https://www.sfia-online.org/en/sfia-6/busskills/lr5" rel="external nofollow">SFIA Foundation framework level 5</a> as the skill level you are quoting for.</p>
            <p>We use this information to confirm your business offers value for money to government buyers.</p>
            <p>For more information, you can read our <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000054595-Seller-pricing" rel="external">Seller Pricing FAQs</a> and view the <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000080555-Daily-rates-trend-charts" rel="external">daily rates trend charts</a>.</p>
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
                  <span styleName="inline-input">
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
    missingDailyRates: state.application.missingDailyRates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hasMissingDailyRates: (bool) => {
      return dispatch(missingDailyRates(bool))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingForm)
