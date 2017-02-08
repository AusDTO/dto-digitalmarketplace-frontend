import React from 'react';
import {connect} from 'react-redux';
import {Form, Control} from 'react-redux-form';
import kebabCase from 'lodash/kebabCase';

import Layout         from '../../../../shared/Layout';
import BaseForm       from '../../../../shared/form/BaseForm';
import ErrorBox       from '../../../../shared/form/ErrorBox';
import StatefulError  from '../../../../shared/form/StatefulError';
import formProps      from '../../../../shared/reduxModules/formPropsSelector';

import domains from './domains';

class DomainSelector extends BaseForm {

    render() {
        const {model, supplierCode, action, csrf_token, buttonText, children, onSubmit} = this.props;
        let header = (
            <header>
                <h1 tabIndex="-1">What services will you offer?</h1>
                <p>Select the digital services you want to provide. You’ll need to provide a case study for each that
                    meets our <a href="/assessment-criteria" target="_blank" rel="external">assessment criteria</a></p>
                <p>If you have software products to offer, you can add them later. </p>
            </header>
        )

        if (supplierCode) {
            header = (
                <header>
                    <h1 tabIndex="-1">What services will you offer?</h1>
                    <p>The services you’re currently approved for are already ticked. Select any others you want to provide
                        — you’ll need to provide a case study for each as evidence for <a href="/assessment-criteria"
                                                                                          target="_blank" rel="external">assessment</a>
                    </p>
                </header>
            )
        }

        return (
            <Layout>
                {header}
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
                            {domains.map(({key, label, description}, i) => {
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

                        <input type="submit" value={buttonText} role="button"/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

DomainSelector.defaultProps = {
    buttonText: 'Save and continue',
    title: 'What services will you offer? '
}

const mapStateToProps = (state) => {
    return {
        supplierCode: state.application.supplierCode,
        ...formProps(state, 'domainSelectorForm')
    }
}

export default connect(mapStateToProps)(DomainSelector);