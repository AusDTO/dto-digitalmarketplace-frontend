import React from 'react';
import { connect } from 'react-redux';
import { Form, Control } from 'react-redux-form';
import kebabCase from 'lodash/kebabCase';
import isEmpty from 'lodash/isEmpty';

import Layout         from '../../../../shared/Layout';
import BaseForm       from '../../../../shared/form/BaseForm';
import ErrorBox       from '../../../../shared/form/ErrorBox';
import StatefulError  from '../../../../shared/form/StatefulError';
import formProps      from '../../../../shared/reduxModules/formPropsSelector';

import domains from './domains';

class DomainSelector extends BaseForm {

  render() {
    const { model, action, csrf_token, title, buttonText, children, onSubmit } = this.props;

    return (
      <Layout>
        <header>
            <h1>{title}</h1>
            <p>You will need to provide a day rate and case study for each. <a href="#href">View criteria for each service</a></p>
        </header>
        <article role="main">
          <ErrorBox focusOnMount={true} model={model}/>

          {/* This error will never actually render */}
          <StatefulError
            model={`${model}.domains`}
            id="domains"
            messages={{
              domains: 'You must select at least one service from the domains below.'
            }}
          />

          <Form 
            model={model}
            action={action}
            method="post"
            id="DomainSelector__create"
            validators={{
              services: (services) => !isEmpty(services)
            }}
            onSubmit={onSubmit}>

            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
            )}

            {domains.map(({ key, label, services }, i) => {
              let additionalProps = {}
              if (i === 0) {
                additionalProps = {
                  id: 'services',
                  tabIndex: -1
                }
              }
              return (
                <fieldset key={key} className="field">
                  <legend {...additionalProps}>{label}</legend>
                  {services.map((service, i) => (
                    <div key={kebabCase(service)}>
                      <Control.checkbox
                        model={`${model}.services.${service}`}
                        id={kebabCase(service)} 
                        name={kebabCase(service)} 
                        value={service}
                      />
                      <label htmlFor={kebabCase(service)}>{service}</label>
                    </div>
                  ))}
                </fieldset>
              )
            })}

            {children}

            <input type="submit" value={buttonText}role="button" />
          </Form>
        </article>
      </Layout>
    )
  }
}

DomainSelector.defaultProps = {
  buttonText: 'Save &amp; Continue',
  title: 'Digital Services'
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'domainSelectorForm')
  }
}

export default connect(mapStateToProps)(DomainSelector);