import React from 'react';
import {connect} from 'react-redux';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import StatefulError from '../../../../shared/form/StatefulError';
import {Form, Control} from 'react-redux-form';

import {required} from '../../../../validators';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';
import MasterAgreement from "./MasterAgreement";

class SubmitStepForm extends BaseForm {
    static defaultProps = {
        onClick: () => {
        },
        submitUrl: '#',
        authoriseUrl: '#',
    }

    static propTypes = {
        model: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.func
        ]).isRequired,
        form: React.PropTypes.object.isRequired,
        submitUrl: React.PropTypes.string,
        authoriseUrl: React.PropTypes.string,
        onClick: React.PropTypes.func,
        applicationValid: React.PropTypes.bool,
        stepsRemaining: React.PropTypes.string,
        name: React.PropTypes.string,
        abn: React.PropTypes.string,
        email: React.PropTypes.string,
        representative: React.PropTypes.string,
        userEmail: React.PropTypes.string,
        csrfToken: React.PropTypes.string
    };

    handleSubmit(val) {
        // Do anything you want with the form value
    }

    render() {
        let {model, submitUrl, applicationValid, name, abn, representative, userEmail, authoriseUrl, email, csrfToken, form, onSubmit, stepsRemaining} = this.props;
        let message;
        const userIsAuthorised = userEmail && email && userEmail.toLowerCase() === email.toLowerCase();
        const title = userIsAuthorised ? 'Your declaration': 'Share with authorised representative';
        const buttonText = userIsAuthorised ? 'Submit application' : 'Send email to representative';
        const action = userIsAuthorised ? submitUrl : authoriseUrl;

        if (userIsAuthorised) {
            message = (
                <div>
                    <p>All you need to do now is:</p>
                    <ol><li>Review your application and the Master Agreement</li>
                        <li>Complete the declaration below</li>
                    </ol>
                    <a href="/static/media/documents/digital-marketplace-master-agreement.pdf" rel="external" target="_blank">Download Master Agreement PDF</a><br/>
                    <a href="/static/media/documents/digital-marketplace-master-agreement.html" target="_blank" rel="external">View Master Agreement in HTML</a><br/><br/>


                    <MasterAgreement/>

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
                            href="/static/media/documents/digital-marketplace-master-agreement.pdf" rel="external" target="_blank">Marketplace Master
                            Agreement</a>.</label>

                </div>
            )
        }
        else {


            message = (
                <div>
                    <p>Only the authorised representative, <strong>{representative}</strong>, can accept the Master Agreement terms on behalf of <strong>{name}</strong>.</p>
                    <p>Would you like us to send an email now to <strong>{email}</strong> so they can complete the last step?</p>
                </div>
            )
        }
        return (
            <div>
                <h1 tabIndex="-1">{title}</h1>
                <Form model={model}
                      action={action}
                      method="post"
                      id="submit"
                      component={SubmitForm}
                      valid={form.valid}
                      onSubmit={onSubmit}
                >
                    <ErrorBox focusOnMount={true} model={model}/>
                    {!applicationValid &&
                    (<div ref="box" className="callout--warning" aria-describedby="validation-masthead-heading" tabIndex="-1" role="alert">
                        <h4 id="validation-masthead-heading">All steps must be completed before submitting. You are yet to complete the following sections: {stepsRemaining}</h4></div>)
                    }

                    <input type="hidden" name="csrf_token" id="csrf_token" value={csrfToken}/>
                    { message }
                    {applicationValid
                        ? <button type="submit">{buttonText}</button>
                        : <button disabled="disabled">{buttonText}</button>
                    }
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
    }
}

export {
    mapStateToProps,
    SubmitStepForm as Form
}

export default connect(mapStateToProps)(SubmitStepForm);
