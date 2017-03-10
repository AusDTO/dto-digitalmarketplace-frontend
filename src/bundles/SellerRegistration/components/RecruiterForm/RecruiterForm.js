import React from 'react';
import {connect} from 'react-redux';
import {Form, Control} from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';
import StepNav      from '../StepNav';


class RecruiterForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        returnLink: React.PropTypes.string
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit, nextRoute} = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">Are you a recruiter?</h1>
                    <p>Recruiters provide candidates for digital specialist roles, but are not directly responsible for their work, performance or deliverables. 
                       Examples include temporary and contract recruitment.</p>
                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={model}/>
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

                        <fieldset className="field">
                          <Control.radio
                            model={`${model}.recruiter`}
                            name="recruiter"
                            id="yes"
                            value="yes"/>
                          <label htmlFor="yes">Yes</label>

                          <Control.radio
                            model={`${model}.recruiter`}
                            name="recruiter"
                            id="no"
                            value="no"/>
                          <label htmlFor="no">No</label>
                        </fieldset>

                        {children}

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
        ...formProps(state, 'recruiterForm')
    }
}

export {
    mapStateToProps,
    RecruiterForm as Form
}

export default connect(mapStateToProps)(RecruiterForm);
