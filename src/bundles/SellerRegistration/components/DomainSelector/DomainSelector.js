import React from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import {Form, Control} from 'react-redux-form';
import kebabCase from 'lodash/kebabCase';
import isNumber from 'lodash/isNumber';
import { Link } from 'react-router-dom';

import Layout         from '../../../../shared/Layout';
import BaseForm       from '../../../../shared/form/BaseForm';
import ErrorBox       from '../../../../shared/form/ErrorBox';
import StatefulError  from '../../../../shared/form/StatefulError';
import formProps      from '../../../../shared/reduxModules/formPropsSelector';
import StepNav        from '../StepNav';

import { actions }    from '../../redux/modules/application';
import { actions as stepActions }    from '../../redux/modules/steps';

import domains from './domains';

class DomainSelector extends BaseForm {

  static propTypes = {
    recruiter: React.PropTypes.string
  }

    render() {
        const {model, supplierCode, action, csrf_token, buttonText, children, actions, onSubmit, recruiter, nextRoute} = this.props;
        let header = (
            <header>
                <h1 tabIndex="-1">What services will you offer?</h1>
                <p> If you only have software products to offer, <Link
                    to="/products"
                    onClick={() => {
                        // Hardcoded is ugly.
                        actions.stepComplete('casestudy');
                        actions.stepComplete('digital');
                        actions.navigateToStep('/products');
                    }}>skip to the product section.
                </Link></p>
                <p>Select the services you have the expertise to provide.  For each you choose you will need to provide
                    a case study and referee to ensure you meet our <a href="/assessment-criteria" target="_blank" rel="external">assessment criteria</a></p>

            </header>
        )

        if (isNumber(supplierCode)) {
            header = (
                <header>
                    <h1 tabIndex="-1">What services will you offer?</h1>
                    <p>The services you are currently approved for are already ticked. Select any others you have the skills and experience to provide.
                        You will need to provide a case study and referee for each to meet the <a href="/assessment-criteria"
                                                                                          target="_blank" rel="external">assessment criteria</a>
                    </p>
                </header>
            )
        }

        if (recruiter === 'yes') {
            header = (
                <header>
                    <h1 tabIndex="-1">What services do your candidates offer?</h1>
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

                        <StepNav buttonText={buttonText} to={nextRoute}/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

DomainSelector.defaultProps = {
    buttonText: 'Save and continue',
    title: 'What services will you offer? ',
    recruiter: ''
}

const mapStateToProps = (state) => {
    return {
        supplierCode: state.application.supplier_code,
        ...formProps(state, 'domainSelectorForm')
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...actions, ...stepActions }, dispatch),
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(DomainSelector);