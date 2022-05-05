import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import BaseForm      from '../../../shared/form/BaseForm';
import SubmitForm    from '../../../shared/form/SubmitForm';
import ErrorBox      from '../../../shared/form/ErrorBox';
import StatefulError from '../../../shared/form/StatefulError';
import {Form, Control} from 'react-redux-form';

import {required} from '../../../validators';
import formProps     from '../../../shared/reduxModules/formPropsSelector';
import ValidationSummary from './ValidationSummary';

import styles from './SellerRegistration.css'
import submit from './Submit.css'

class SubmitStepForm extends BaseForm {
    static defaultProps = {
        onClick: () => {
        },
        submitUrl: '#',
        authoriseUrl: '#',
    }

    static propTypes = {
        model: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]).isRequired,
        form: PropTypes.object.isRequired,
        submitUrl: PropTypes.string,
        authoriseUrl: PropTypes.string,
        onClick: PropTypes.func,
        applicationValid: PropTypes.bool,
        stepsRemaining: PropTypes.string,
        name: PropTypes.string,
        abn: PropTypes.string,
        email: PropTypes.string,
        representative: PropTypes.string,
        userEmail: PropTypes.string,
        csrfToken: PropTypes.string,
        agreement: PropTypes.object
    };

    handleSubmit(val) {
        // Do anything you want with the form value
    }

    render() {
        let {agreement, model, submitUrl, name, abn, representative, userEmail, authoriseUrl, email, csrfToken, form, onSubmit, stepsRemaining, submitClicked, applicationErrors} = this.props;
        let message;
        const userIsAuthorised = userEmail && email && userEmail.toLowerCase() === email.toLowerCase();
        const title = userIsAuthorised ? 'Your declaration': 'Share with authorised representative';
        const buttonText = userIsAuthorised ? 'Submit application' : 'Send email to representative';
        const action = userIsAuthorised ? submitUrl : authoriseUrl;
        let hasFocused = false
        const setFocus = e => {
          if (!hasFocused) {
            hasFocused = true
            e.focus()
          }
        }
        let agreementHtmlUrl = '/api/2/r/master-agreement-current.html'
        if (agreement && agreement.htmlUrl) {
          agreementHtmlUrl = agreement.htmlUrl
        }
        let agreementPdfUrl = '/api/2/r/master-agreement-current.pdf'
        if (agreement && agreement.pdfUrl) {
          agreementPdfUrl = agreement.pdfUrl
        }
        if (userIsAuthorised) {
            message = (
                <div>
                    <p>All you need to do now is:</p>
                    <ol styleName="styles.content-list"><li>Review your application and the Master Agreement</li>
                        <li>Complete the declaration</li>
                    </ol>
                    <a href={agreementPdfUrl} rel="noopener noreferrer" target="_blank">Download Master Agreement (PDF 229KB)</a><br/>
                    <a href={agreementHtmlUrl} target="_blank" rel="noopener noreferrer">View Master Agreement in HTML</a><br/><br/>

                    <iframe title="Master Agreement" styleName="submit.agreement" src={agreementHtmlUrl}/>
                    <br/>
                    <StatefulError
                        model={`${model}.agreed_to_master_agreement`}
                        id="agree"
                        messages={{
                            required: 'You must accept the Master Agreement'
                        }}
                    />
                    <Control.checkbox
                        model={`${model}.agreed_to_master_agreement`}
                        id="agree"
                        name="agree"
                        validators={{required}}
                    />
                    <label htmlFor="agree">I am <strong>{representative}</strong>, an authorised representative of
                        <strong> {name}</strong> (ABN: {abn}) and I agree to the terms set out in the <a
                            href={agreementPdfUrl} rel="noopener noreferrer" target="_blank">Marketplace Master
                            Agreement</a>.</label>

                </div>
            )
        }
        else {


            message = (
                <div>
                    <p>Only the authorised representative, <strong>{representative}</strong>, can accept the Master Agreement terms on behalf of <strong>{name}</strong>.</p>
                    <p>Would you like us to send an email now to <strong>{email}</strong> so they can complete the last step?</p>

                  <a href={agreementPdfUrl} rel="noopener noreferrer" target="_blank">Download Master Agreement (PDF 229KB)</a><br/><br/>
                  <a href={agreementHtmlUrl} target="_blank" rel="noopener noreferrer">View Master Agreement in HTML</a><br/><br/>

                </div>
            )
        }
        return (
            <div>
                <ValidationSummary form={form} applicationErrors={applicationErrors} title={'There is a problem to fix before you can submit'} />
                <h1 className="au-display-xl" tabIndex="-1">  
                  {title}
                </h1>
                <Form model={model}
                      action={action}
                      method="post"
                      id="submit"
                      component={SubmitForm}
                      valid={form.valid}
                      onSubmit={onSubmit}
                >
                    <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus}/>
                    <input type="hidden" name="csrf_token" id="csrf_token" value={csrfToken}/>
                    { message }
                    <button disabled="disabled">{buttonText}</button>
                </Form>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {

    return {
        submitUrl: state.form_options.submit_url,
        authoriseUrl: state.form_options.authorise_url,
        applicationValid: ownProps.applicationValid,
        name: ownProps.name,
        abn: ownProps.abn,
        email: ownProps.email,
        representative: ownProps.representative,
        userEmail: state.form_options.user_email,
        csrfToken: state.form_options.csrf_token,
        ...formProps(state, ownProps.formName || 'submitStepForm'),
        applicationErrors: state.application_errors ? state.application_errors : [],
        agreement: state.agreement ? state.agreement : {}
    }
}

export {
    mapStateToProps,
    SubmitStepForm as Form
}

export default connect(mapStateToProps)(SubmitStepForm);
