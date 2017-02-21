import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';

import Layout     from '../../../../shared/Layout';
import {required} from '../../../../validators';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textfield    from '../../../../shared/form/Textfield';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';
import domains      from '../DomainSelector/domains';


class CandidatesForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        returnLink: React.PropTypes.string,
        services: React.PropTypes.object,
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit, services} = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">Tell us more about your candidates</h1>
                    <p>Share database and candidate details for each service you selected.</p>
                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={model}/>
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
                                    <h4>{domain.label}</h4>
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
                                        model={`${model}.recruiter_info.${domain.label}.markup`}
                                        name={`${domain.label}-markup`}
                                        id={`${domain.label}-markup`}
                                        htmlFor={`${domain.label}-markup`}
                                        label="What is your mark-up?"
                                        messages={{
                                            required: 'You must supply your mark-up'
                                        }}
                                        validators={{required}}
                                    />
                                     <Textfield
                                        model={`${model}.recruiter_info.${domain.label}.margin`}
                                        name={`${domain.label}-margin`}
                                        id={`${domain.label}-margin`}
                                        htmlFor={`${domain.label}-margin`}
                                        label="What is your margin?"
                                        messages={{
                                            required: 'You must supply your margin'
                                        }}
                                        validators={{required}}
                                    />
                                </div>
                            )    
                        })}


                        {children}

                        <button type="submit"> Save and continue</button>
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
        ...formProps(state, 'candidatesForm')
    }
}

export {
    mapStateToProps,
    CandidatesForm as Form
}

export default connect(mapStateToProps)(CandidatesForm);
