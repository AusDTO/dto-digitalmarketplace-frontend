import React from 'react';
import {connect} from 'react-redux';
import { Form } from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import YesNoDetails from '../../../../shared/form/YesNoDetailsField';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';


class DisclosuresForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        returnLink: React.PropTypes.string
    }

    render() {
        const {action, csrf_token, model, form, title, children, onSubmit } = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">{title}</h1>
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
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        <fieldset>
                            <legend>These responses are used by assessors but not visible on your profile.</legend>
                            <YesNoDetails name="structual_changes" id="structual_changes" model={`${model}.structual_changes`}
                                          label="Are you planning to sell, merge, or alter the corporate structure of your company?"/>
                            <YesNoDetails name="investigations" id="investigations" model={`${model}.investigations`}
                                          label="Has your organisation been investigated by any agency, authority or regulator in connection with improper business practices in the last 5 years?"/>
                            <YesNoDetails name="legal_proceedings" id="legal_proceedings" model={`${model}.legal_proceedings`}
                                          label="Has your organisation been involved in any legal proceedings in the last 5 years? "/>
                            <YesNoDetails name="insurance_claims" id="insurance_claims" model={`${model}.insurance_claims`}
                                          label="Has your organisation made any claims on your professional indemnity or fidelity insurance in the last 5 years ?"/>
                            <YesNoDetails name="conflicts_of_interest" id="conflicts_of_interest" model={`${model}.conflicts_of_interest`}
                                          label="Are you aware of any potential or actual conflicts of interest that may affect your organisation's application to register or transact on the Digital Marketplace?"/>
                        </fieldset>

                        {children}

                        <input type="submit" value="Save and continue" role="button"/>
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
