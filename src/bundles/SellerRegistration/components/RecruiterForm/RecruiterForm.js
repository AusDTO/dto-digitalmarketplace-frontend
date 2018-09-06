import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Form, Control} from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';
import StepNav      from '../StepNav';

import ValidationSummary from '../ValidationSummary';
import '../SellerRegistration.css';

class RecruiterForm extends BaseForm {

    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        returnLink: PropTypes.string
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit, nextRoute, submitClicked, applicationErrors, type} = this.props;
        let hasFocused = false
        const setFocus = e => {
          if (!hasFocused) {
            hasFocused = true
            e.focus()
          }
        }
        return (
            <Layout>
                <header>
                <ValidationSummary form={form} applicationErrors={applicationErrors} filterFunc={(ae) => ae.step === 'recruiter' && type === 'edit'} />
                </header>
                <article role="main">
                    <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="Recruiter__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}
                        <div styleName="content">
                            <fieldset>
                                <legend>
                                    <h1 className="au-display-xl" tabIndex="-1">Are you a recruiter?</h1>
                                </legend>
                                <p>Recruiters provide candidates for digital specialist roles, but are not directly responsible for their work, performance or deliverables.
                                    Examples include temporary and contract recruitment.</p>
                                <Control.radio
                                    model={`${model}.recruiter`}
                                    name="recruiter"
                                    id="yes"
                                    value="yes"/>
                                <label htmlFor="yes">Yes, my business solely places candidates in temporary and contract recruitment</label>

                                <Control.radio
                                    model={`${model}.recruiter`}
                                    name="recruiter"
                                    id="no"
                                    value="no"/>
                                <label htmlFor="no">No, my business provides services on a consultancy basis</label>

                                <Control.radio
                                    model={`${model}.recruiter`}
                                    name="recruiter"
                                    id="both"
                                    value="both"/>
                                <label htmlFor="both">My business does both recruitment and consultancy</label>
                            </fieldset>
                            {children}
                        </div>
                        <StepNav buttonText="Save and continue" to={nextRoute}/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

RecruiterForm.defaultProps = {
    title: 'Recruiter'
}

const mapStateToProps = (state) => {
    return {
        ...formProps(state, 'recruiterForm'),
        applicationErrors: state.application_errors
    }
}

export {
    mapStateToProps,
    RecruiterForm as Form
}

export default connect(mapStateToProps)(RecruiterForm);
