import React                from 'react';
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
import { findValidServices } from '../../redux/helpers'
import { required, notNegativeNumber, onlyNumbers }         from '../../../../validators';

import './PricingForm.css';

class PricingForm extends BaseForm {

  render() {
    const { model, form, action, csrf_token, title, buttonText, services, children,  onSubmit, nextRoute, submitClicked } = this.props;
    let validServices = findValidServices(services);

    if (isEmpty(validServices)) {
      return (
        <Layout>
          <header>
            <h1 tabIndex="-1">{title}</h1>
          </header>
          <article role="main">
            <p>You must select some domains before specifying pricing!</p>
            <p><Link to="/domains">Select domains</Link></p>
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
            <h1 tabIndex="-1">{title}</h1>
            <p>Indicate the maximum daily rate you would normally charge for each service.</p>
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
                    required: `You must provide a max price for ${service}. `,
                    notNegativeNumber: `Price can't have negative numbers. `,
                    onlyNumbers: `Price can only be numbers. `
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
                      validators={{ required, notNegativeNumber, onlyNumbers }}
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
    domainSelectorForm: state.domainSelectorForm
  }
}

export default connect(mapStateToProps)(PricingForm);
