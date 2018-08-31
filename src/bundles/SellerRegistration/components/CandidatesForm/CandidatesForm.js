import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';

import Layout     from '../../../../shared/Layout';
import {required, validPercentage} from '../../../../validators';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textfield    from '../../../../shared/form/Textfield';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';
import domains      from '../DomainSelector/domains';
import StepNav      from '../StepNav';

import PageAlert from '@gov.au/page-alerts'
import ValidationSummary from '../ValidationSummary';
import '../SellerRegistration.css';

class CandidatesForm extends BaseForm {

    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        returnLink: PropTypes.string,
        services: PropTypes.object,
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit, services, nextRoute, submitClicked, applicationErrors} = this.props;
        let hasFocused = false
        const setFocus = e => {
          if (!hasFocused) {
            hasFocused = true
            e.focus()
          }
        }
        return (
            <Layout>
                <header styleName="content">
                    <ValidationSummary form={form} applicationErrors={applicationErrors} filterFunc={(ae) => ae.step === 'candidates'} />
                    <h1 className="au-display-xl" styleName="content-heading" tabIndex="-1">Tell us more about your candidates</h1>
                    <p>Share database and candidate details for each service you selected.</p>
                </header>
                <article role="main">
                    <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="Candidates__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        {domains.filter(d => services[d.label]).map((domain, i) => {
                            return (
                                <div key={domain.label}>
                                    <h2 className="au-display-lg">{domain.label}</h2>
                                    <Textfield
                                        model={`${model}.recruiter_info.${domain.label}.database_size`}
                                        name={`${domain.label}-database_size`}
                                        id={`${domain.label}-database_size`}
                                        htmlFor={`${domain.label}-database_size`}
                                        label="What is the size of your candidate database?"
                                        messages={{
                                            required: 'You must supply the candidate database size'
                                        }}
                                        validators={{required}}
                                    />
                                    <Textfield
                                        model={`${model}.recruiter_info.${domain.label}.active_candidates`}
                                        name={`${domain.label}-active_candidates`}
                                        id={`${domain.label}-active_candidates`}
                                        htmlFor={`${domain.label}-active_candidates`}
                                        label="How many candidates are actively looking now?"
                                        messages={{
                                            required: 'You must supply the number of candidates looking'
                                        }}
                                        validators={{required}}
                                    />
                                    <Textfield
                                       model={`${model}.recruiter_info.${domain.label}.placed_candidates`}
                                       name={`${domain.label}-placed_candidates`}
                                       id={`${domain.label}-placed_candidates`}
                                       htmlFor={`${domain.label}-placed_candidates`}
                                       label="How many candidates have you successfully placed in the last 12 months?"
                                       messages={{
                                           required: 'You must supply the number of candidates successfully placed'
                                       }}
                                       validators={{required}}
                                    />
                                    <Textfield
                                        model={`${model}.recruiter_info.${domain.label}.markup`}
                                        name={`${domain.label}-markup`}
                                        id={`${domain.label}-markup`}
                                        htmlFor={`${domain.label}-markup`}
                                        label="What is your mark-up?"
                                        description="Definition of mark up is the total of oncosts to the day rate (including workers compensation, payroll tax, etc)."
                                        messages={{
                                            required: 'You must supply your mark-up',
                                            validPercentage: 'You must supply your mark-up as a percentage'
                                        }}
                                        validators={{required, validPercentage}}
                                    />
                                    <Textfield
                                        model={`${model}.recruiter_info.${domain.label}.margin`}
                                        name={`${domain.label}-margin`}
                                        id={`${domain.label}-margin`}
                                        htmlFor={`${domain.label}-margin`}
                                        label="What is your margin?"
                                        description="Definition of margin is the percentage charged on top of oncosts by agency for providing the candidate and service."
                                        messages={{
                                            required: 'You must supply your margin',
                                            validPercentage: 'You must supply your margin as percentage'
                                        }}
                                        validators={{required, validPercentage}}
                                    />
                                </div>
                            )
                        })}


                        {children}

                        <StepNav buttonText="Save and continue" to={nextRoute}/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

CandidatesForm.defaultProps = {
    title: 'Candidates',
    services: {}
}

const mapStateToProps = (state) => {
    return {
        ...formProps(state, 'candidatesForm'),
        applicationErrors: state.application_errors
    }
}

export {
    mapStateToProps,
    CandidatesForm as Form
}

export default connect(mapStateToProps)(CandidatesForm);
