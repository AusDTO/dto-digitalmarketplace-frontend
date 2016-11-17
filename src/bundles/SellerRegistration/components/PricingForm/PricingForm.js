import React                from 'react';
import { connect }          from 'react-redux';
import { Link }             from 'react-router';
import { Form, Control }    from 'react-redux-form';
import isEmpty              from 'lodash/isEmpty';
import kebabCase            from 'lodash/kebabCase';

import Layout               from '../../../../shared/Layout';
import BaseForm             from '../../../../shared/form/BaseForm';
import ErrorBox             from '../../../../shared/form/ErrorBox';
import formProps            from '../../../../shared/reduxModules/formPropsSelector';

import { findValidDomains } from '../../../ApplicantSignup/redux/helpers'

class PricingForm extends BaseForm {

  hasDomains() {
    const { domainSelectorForm } = this.props;
    const { domains } = domainSelectorForm;

    return !isEmpty(findValidDomains(domains)[0]);
  }

  render() {
    if (!this.hasDomains()) {
      return (
        <Layout>
          <header>
            <h1>Pricing</h1>
          </header>
          <article role="main">
            <p>You must select some domains before specifying pricing!</p>
            <p><Link to="/domains">Select domains</Link></p>
          </article>
        </Layout>
      )
    }

    const { model, action, csrf_token, domainSelectorForm, onSubmit } = this.props;
    const { domains } = domainSelectorForm;

    let validDomains = findValidDomains(domains)[0];

    return (
      <Layout>
        <header>
            <h1>Pricing</h1>
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
            
            {Object.keys(validDomains).map((domain, i) => (
              <fieldset key={`pricing.${domain}.${i}`} className="field">
                <legend>{domain}</legend>
                <div className="row">
                  <div className="col-sm-5 col-xs-12">
                    <label htmlFor={`${kebabCase(domain)}-minprice`}>Min. Daily Price</label>
                    <Control.text 
                      type="number"
                      id={`${kebabCase(domain)}-minprice`}
                      name={`${domain}[].minPrice`}
                      model={`${model}.${domain}.minPrice`}
                    />
                  </div>
                  <div className="col-sm-push-1 col-sm-5 col-xs-12">
                    <label htmlFor={`${kebabCase(domain)}-maxprice`}>Max. Daily Price</label>
                    <Control.text 
                      type="number"
                      id={`${kebabCase(domain)}-maxprice`}
                      name={`${domain}[].maxPrice`}
                      model={`${model}.${domain}.maxPrice`}
                    />
                  </div>
                </div>
              </fieldset>
            ))}

            <input type="submit" value="Save &amp; Continue" role="button" />
          </Form>
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'pricingForm'),
    domainSelectorForm: state.domainSelectorForm
  }
}

export default connect(mapStateToProps)(PricingForm);