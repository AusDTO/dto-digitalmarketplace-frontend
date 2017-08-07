import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { Form } from 'react-redux-form';

import { required } from '../../../../validators';

import Layout       from '../../../../shared/Layout';
import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import YesNoDetails from '../../../../shared/form/YesNoDetailsField';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';
import questions    from './questions';
import StepNav      from '../StepNav';


class DisclosuresForm extends BaseForm {

    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        returnLink: PropTypes.string
    }

    render() {
        const {action, csrf_token, model, form, title, children, onSubmit, onSubmitFailed, nextRoute } = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">{title}</h1>
                    <p>These responses are not visible on your profile but may be provided to buyers who are considering awarding you a contract. </p>

                        <p>Please note, answering ‘yes’ to any question will not automatically disqualify you from the Digital Marketplace, however our assessors may contact you to request more information.</p>
                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={model}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="Disclosures__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
                          onSubmitFailed={onSubmitFailed}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        <fieldset>
                            <YesNoDetails
                              name="structual_changes"
                              id="structual_changes"
                              model={`${model}.disclosures.structual_changes`}
                              label={questions["structual_changes"]}
                              validators={{ required }}
                              messages={{
                                  required: 'Please provide an answer to the Structual Changes question',
                              }}
                            />
                            <YesNoDetails
                              name="investigations"
                              id="investigations"
                              model={`${model}.disclosures.investigations`}
                              label={questions["investigations"]}
                              validators={{ required }}
                              messages={{
                                  required: 'Please provide an answer to the Investigations question',
                              }}
                            />
                            <YesNoDetails
                              name="legal_proceedings"
                              id="legal_proceedings"
                              model={`${model}.disclosures.legal_proceedings`}
                              label={questions["legal_proceedings"]}
                              validators={{ required }}
                              messages={{
                                  required: 'Please provide an answer to the Legal Proceedings question',
                              }}
                            />
                            <YesNoDetails
                              name="insurance_claims"
                              id="insurance_claims"
                              model={`${model}.disclosures.insurance_claims`}
                              label={questions["insurance_claims"]}
                              validators={{ required }}
                              messages={{
                                  required: 'Please provide an answer to the Insurance Claims question',
                              }}
                            />
                            <YesNoDetails
                              name="conflicts_of_interest"
                              id="conflicts_of_interest"
                              model={`${model}.disclosures.conflicts_of_interest`}
                              label={questions["conflicts_of_interest"]}
                              validators={{ required }}
                              messages={{
                                  required: 'Please provide an answer to the Conflicts of interest question',
                              }}
                            />
                            <YesNoDetails
                              name="other_circumstances"
                              id="other_circumstances"
                              model={`${model}.disclosures.other_circumstances`}
                              label={questions["other_circumstances"]}
                              validators={{ required }}
                              messages={{
                                  required: 'Please provide an answer to the Other circumstances question',
                              }}
                            />
                        </fieldset>

                        {children}

                        <StepNav buttonText="Save and continue" to={nextRoute}/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

DisclosuresForm.defaultProps = {
  title: 'Select any descriptions that apply to your business'
}

const mapStateToProps = (state) => {
    return {
        ...formProps(state, 'disclosuresForm')
    }
}

export {
    mapStateToProps,
    DisclosuresForm as Form
}

export default connect(mapStateToProps)(DisclosuresForm);
