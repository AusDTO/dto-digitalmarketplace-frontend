import React from 'react';
import {connect} from 'react-redux';
import {Form, actions} from 'react-redux-form';
import { Link } from 'react-router-dom';

import Layout from '../../../../shared/Layout';
import {required} from '../../../../validators';
import {navigateToStep} from '../../redux/modules/application'
import {stepComplete}    from '../../redux/modules/steps';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textfield    from '../../../../shared/form/Textfield';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';


class RecruiterForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        returnLink: React.PropTypes.string
    }

    onAdd(e) {
        e.preventDefault();
        const {model, setRecruiter} = this.props;
        setRecruiter(model, true);
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit, onSubmitFailed, recruiterForm, navigateToStep, stepComplete, setRecruiter} = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">Are you a recruitment service?</h1>
                    <p>Recruiters provide candidates for digital specialist roles, but are not directly responsible for their work, performance or deliverables. 
                       Examples include temporary, contract and permanent recruitment.</p>
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
                          onSubmitFailed={onSubmitFailed}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        { recruiterForm.recruiter && (
                            <div>
                                 <Textfield
                                    model={`${model}.database_size`}
                                    name="database_size"
                                    id="database_size"
                                    htmlFor="database_size"
                                    label="What is the size of your candidate database?"
                                    messages={{
                                        required: 'You must supply the candidate database size'
                                    }}
                                    validators={{required}}
                                />
                                 <Textfield
                                    model={`${model}.active_candidates`}
                                    name="active_candidates"
                                    id="active_candidates"
                                    htmlFor="active_candidates"
                                    label="How many candidates are actively looking now?"
                                    messages={{
                                        required: 'You must supply the number of candidates looking'
                                    }}
                                    validators={{required}}
                                />
                                 <Textfield
                                    model={`${model}.markup`}
                                    name="markup"
                                    id="markup"
                                    htmlFor="markup"
                                    label="What is your markup?"
                                    messages={{
                                        required: 'You must supply your markup'
                                    }}
                                    validators={{required}}
                                />
                                 <Textfield
                                    model={`${model}.margin`}
                                    name="margin"
                                    id="margin"
                                    htmlFor="margin"
                                    label="What is your margin?"
                                    messages={{
                                        required: 'You must supply your margin'
                                    }}
                                    validators={{required}}
                                />

                                {children}

                            </div>
                        )}
                        { recruiterForm.recruiter ?
                            <button type="submit"> Save and continue</button>
                            :
                            <button type="submit" onClick={this.onAdd.bind(this)}>I am a recruiter</button>
                        }
                        <Link
                            className="button-secondary"
                            to="/domains"
                            onClick={() => {
                                // Hardcoded is ugly.
                                setRecruiter(model, false);
                                stepComplete('recruiter');
                                navigateToStep('/domains');
                            }}>I am not a recruiter
                        </Link>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setRecruiter: (model, value) => {
            dispatch(actions.change(`${model}.recruiter`, value));
        },
        navigateToStep: (to) => {
            return dispatch(navigateToStep(to));
        },
        stepComplete: (step) => {
            return dispatch(stepComplete(step));
        }
    }
}

export {
    mapStateToProps,
    RecruiterForm as Form
}

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterForm);
