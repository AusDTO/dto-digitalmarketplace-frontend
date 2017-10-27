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


class RecruiterForm extends BaseForm {

    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        returnLink: PropTypes.string
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit, nextRoute} = this.props;
        return (
            <Layout>
                <header>


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

                        <fieldset>
                          <legend><h1 tabIndex="-1">Are you a recruiter?</h1>
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
                          <label htmlFor="no">No, my business provides staff on a consultancy basis</label>

                          <Control.radio
                            model={`${model}.recruiter`}
                            name="recruiter"
                            id="both"
                            value="both"/>
                          <label htmlFor="both">My business does both recruitment and consultancy</label>
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
