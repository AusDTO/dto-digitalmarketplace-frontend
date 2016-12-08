import React from 'react';
import { connect } from 'react-redux';
import { Form, Control } from 'react-redux-form';
import kebabCase from 'lodash/kebabCase';

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
            <p> Select the digital services you’ll provide in the Marketplace. You’ll need to provide proof of successful projects (case studies) and past client contact details for each service. You can use the same case study for different services if applicable.</p>
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

            <fieldset className="field">
            {domains.sort((domainA, domainB) => {
              if (domainA.label.toLowerCase() < domainB.label.toLowerCase()) {
                return -1;
              }

              if (domainA.label.toLowerCase() > domainB.label.toLowerCase()) {
                return 1;
              }

              return 0;
            }).map(({ key, label, description }, i) => {
              return (
                <div key={key}>
                  <Control.checkbox
                    model={`${model}.services.${label}`}
                    id={kebabCase(label)} 
                    name={kebabCase(label)} 
                    value={label}
                  />
                  <label htmlFor={kebabCase(label)}>{label} <p>{description}</p></label>
                </div>
              )
            })}
            </fieldset>

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
  title: 'What services will you offer? '
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'domainSelectorForm')
  }
}

export default connect(mapStateToProps)(DomainSelector);