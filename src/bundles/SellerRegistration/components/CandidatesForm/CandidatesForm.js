import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';

import Layout     from '../../../../shared/Layout';
import {required, validPercentage, onlyWholeNumbers} from '../../../../validators';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textfield    from '../../../../shared/form/Textfield';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';
import domains      from '../DomainSelector/domains';
import StepNav      from '../StepNav';

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
        const {action, csrf_token, model, form, children, onSubmit, services, nextRoute, submitClicked, applicationErrors, type} = this.props;
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
                    <ValidationSummary form={form} applicationErrors={applicationErrors} filterFunc={(ae) => ae.step === 'candidates' && type === 'edit'} />
                    <h1 className="au-display-xl" styleName="content-heading" tabIndex="-1">Tell us more about your candidates</h1>
                    <p>Share database and candidate details.</p>
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

                        <Textfield
                            model={`${model}.candidates.database_size`}
                            name="candidate-database-size"
                            id="database-size"
                            htmlFor="database-size"
                            label="What is the size of your candidate database?"
                            messages={{
                                required: 'You must supply the candidate database size',
                                onlyWholeNumbers: 'Candidate database size must be a whole number'
                            }}
                            validators={{
                                required,
                                onlyWholeNumbers
                            }}
                            disabled
                        />
                        <Textfield
                            model={`${model}.candidates.active_candidates`}
                            name="active-candidates-total"
                            id="active-candidates"
                            htmlFor="active-candidates"
                            label="How many candidates are actively looking now?"
                            messages={{
                                required: 'You must supply the number of candidates looking',
                                onlyWholeNumbers: 'Candidates looking must be a whole number'
                            }}
                            validators={{
                                required,
                                onlyWholeNumbers
                            }}
                            disabled
                        />
                        <Textfield
                            model={`${model}.candidates.placed_candidates`}
                            name="placed-candidates-total"
                            id="placed-candidates"
                            htmlFor="placed-candidates"
                            label="How many candidates have you successfully placed in the last 12 months?"
                            messages={{
                                required: 'You must supply the number of candidates successfully placed',
                                onlyWholeNumbers: 'Candidates successfully placed must be a whole number'
                            }}
                            validators={{
                                required,
                                onlyWholeNumbers
                            }}
                            disabled
                        />
                        <Textfield
                            model={`${model}.candidates.markup`}
                            name="markup"
                            id="markup"
                            htmlFor="markup"
                            label="What is your mark-up?"
                            description="Definition of mark up is the total of oncosts to the day rate (including workers compensation, payroll tax, etc)."
                            messages={{
                                required: 'You must supply your mark-up',
                                validPercentage: 'You must supply your mark-up as a percentage'
                            }}
                            validators={{ required, validPercentage }}
                            disabled
                        />
                        <Textfield
                            model={`${model}.candidates.margin`}
                            name="margin"
                            id="margin"
                            htmlFor="margin"
                            label="What is your margin?"
                            description="Definition of margin is the percentage charged on top of oncosts by agency for providing the candidate and service."
                            messages={{
                                required: 'You must supply your margin',
                                validPercentage: 'You must supply your margin as percentage'
                            }}
                            validators={{ required, validPercentage }}
                            disabled
                        />

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
