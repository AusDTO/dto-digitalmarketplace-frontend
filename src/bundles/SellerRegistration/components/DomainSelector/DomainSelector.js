import React from 'react';
import { connect } from 'react-redux';
import { Form, Control } from 'react-redux-form';
import kebabCase from 'lodash/kebabCase';
import capitalize from 'lodash/capitalize';

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
            <h1 tabIndex="-1">{title}</h1>
            <p>You will need to provide a day rate and case study for each. <a href="#href">View criteria for each service</a></p>
        </header>
        <article role="main">
          <ErrorBox focusOnMount={true} model={model}/>

          {/* This error will never actually render */}
          <StatefulError
            model={`${model}.services`}
            id="services"
            messages={{
              services: 'You must select at least one service from the services below.'
            }}
          />

          <Form 
            model={model}
            action={action}
            method="post"
            id="DomainSelector__create"
            validators={{
              services: (services) => {
                return Object
                  .keys(services)
                  .filter(s => services[s])
                  .length;
              }
            }}
            onSubmit={onSubmit}>

            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
            )}

            {domains.map(({ key, label, services }, i) => {
              return (
                <fieldset key={key} className="field">
                  <Control.checkbox
                    model={`${model}.services.${label}`}
                    id={kebabCase(label)} 
                    name={kebabCase(label)} 
                    value={label}
                  />
                  <label htmlFor={kebabCase(label)}>{`${label} - ${capitalize(services.join(', '))}`}</label>
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