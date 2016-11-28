import React                from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router';
import { Form, Control }    from 'react-redux-form';
import isEmpty              from 'lodash/isEmpty';
import kebabCase            from 'lodash/kebabCase';

import Layout               from '../../../../shared/Layout';
import BaseForm             from '../../../../shared/form/BaseForm';
import ErrorBox             from '../../../../shared/form/ErrorBox';
import StatefulError        from '../../../../shared/form/StatefulError';
import formProps            from '../../../../shared/reduxModules/formPropsSelector';

import { findValidServices } from '../../redux/helpers'
import { required }         from '../../../../validators';

class PricingForm extends BaseForm {

  render() {
    const { model, action, csrf_token, title, buttonText, services, children,  onSubmit } = this.props;
    let validServices = findValidServices(services);

    if (isEmpty(validServices)) {
      return (
        <Layout>
          <header>
            <h1>{title}</h1>
          </header>
          <article role="main">
            <p>You must select some domains before specifying pricing!</p>
            <p><Link to="/domains">Select domains</Link></p>
          </article>
        </Layout>
      )
    }

    return (
      <Layout>
        <header>
            <h1>{title}</h1>
            <p>This will only be visible to government buyers, not to other sellers on the Marketplace.</p>
        </header>
        <article role="main">
          <ErrorBox focusOnMount={true} model={model}/>
          <Form 
            model={model}
            action={action}
            method="post"
            id="DomainSelector__create"
            onSubmit={onSubmit}>

            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
            )}
            
            {Object.keys(validServices).map((service, i) => (
              <fieldset key={`pricing.${service}.${i}`} className="field">
                <legend>{service}</legend>
                <div className="row">
                  <div className="col-sm-5 col-xs-12">
                    <label htmlFor={`${kebabCase(service)}-minprice`}>Min. Daily Price</label>

                    <StatefulError
                      model={`${model}.pricing.${service}.minPrice`}
                      messages={{
                        required: `You must provide a min price for ${service}`
                      }}
                      id={`${kebabCase(service)}-minprice`}
                    />

                    <Control.text 
                      type="number"
                      id={`${kebabCase(service)}-minprice`}
                      name={`services.${service}.minPrice`}
                      model={`${model}.pricing.${service}.minPrice`}
                      validators={{ required }}
                    />
                  </div>
                  <div className="col-sm-push-1 col-sm-5 col-xs-12">
                    <label htmlFor={`${kebabCase(service)}-maxprice`}>Max. Daily Price</label>

                    <StatefulError
                      model={`${model}.pricing.${service}.maxPrice`}
                      messages={{
                        required: `You must provide a max price for ${service}`
                      }}
                      id={`${kebabCase(service)}-maxprice`}
                    />

                    <Control.text 
                      type="number"
                      id={`${kebabCase(service)}-maxprice`}
                      name={`services.${service}.maxPrice`}
                      model={`${model}.pricing.${service}.maxPrice`}
                      validators={{ required }}
                    />
                  </div>
                </div>
              </fieldset>
            ))}

            {children}

            <input type="submit" value={buttonText} role="button" />
          </Form>
        </article>
      </Layout>
    )
  }
}

PricingForm.defaultProps = {
  buttonText: 'Save &amp; Continue',
  title: 'Pricing'
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'pricingForm'),
    domainSelectorForm: state.domainSelectorForm
  }
}

export default connect(mapStateToProps)(PricingForm);