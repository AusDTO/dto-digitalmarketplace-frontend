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
    const { model, action, csrf_token, onSubmit } = this.props;

    return (
      <Layout>
        <header>
            <h1>Digital Services</h1>
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
              domains: (domainList) => {
                return !!domainList.filter(list => {
                  return Object.keys(list).filter(domain => {
                    return Object.keys(list[domain])
                      .filter(service => list[domain][service]).length;
                  }).length;
                }).length;
              }
            }}
            onSubmit={onSubmit}>

            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
            )}

            {domains.map(({ key, label, services }, i) => {
              let additionalProps = {}
              if (i === 0) {
                additionalProps = {
                  id: 'domains',
                  tabIndex: -1
                }
              }
              return (
                <fieldset key={key} className="field">
                  <legend {...additionalProps}>{label}</legend>
                  {services.map((service, i) => (
                    <div key={kebabCase(service)}>
                      <Control.checkbox
                        model={`${model}.domains[0].${label}.${service}`}
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
            <input type="submit" value="Save &amp; Continue" role="button" />
          </Form>
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'domainSelectorForm')
  }
}

export default connect(mapStateToProps)(DomainSelector);