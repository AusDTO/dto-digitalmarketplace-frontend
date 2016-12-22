import React from 'react';
import {connect} from 'react-redux';
import { Form, Control } from 'react-redux-form';

import {required} from '../../../../validators';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textarea     from '../../../../shared/form/Textarea';
import Textfield    from '../../../../shared/form/Textfield';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';


class BusinessDetailsForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        returnLink: React.PropTypes.string
    }

    render() {
        const {action, csrf_token, model, returnLink, form, title, buttonText, seller_registration, children, onSubmit } = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">Check your details</h1>
                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={model}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="BusinessDetails__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        {(seller_registration === true) &&
                            <div>
                                <Textfield
                                  model={`${model}.name`}
                                  name="name"
                                  id="name"
                                  htmlFor="name"
                                  label="Business Name"
                                  description="As you would like it shown on the Marketplace"
                                  validators={{ required }}
                                  messages={{
                                    required: 'Business name is required',
                                  }} 
                                />

                                <Textfield
                                  model={`${model}.abn`}
                                  name="abn"
                                  id="abn"
                                  htmlFor="abn"
                                  label="ABN"
                                  validators={{ required }}
                                  messages={{
                                    required: 'ABN is required',
                                  }}
                                />
                            </div>
                        }

                        <Textarea
                            model={`${model}.summary`}
                            name="summary"
                            id="summary"
                            controlProps={{limit: 50}}
                            label="Summary"
                            description="3-4 sentences that describe your business. This is visible to all viewers without a login."
                            messages={{
                                required: 'You must provide a seller summary'
                            }}
                            validators={{required}}
                        />

                        <Textfield
                            model={`${model}.website`}
                            name="website"
                            id="website"
                            htmlFor="website"
                            label="Website URL"
                            messages={{
                                required: 'You must provide a website URL'
                            }}
                            validators={{required}}
                        />

                        <Textfield
                            model={`${model}.linkedin`}
                            name="linkedin"
                            id="linkedin"
                            htmlFor="linkedin"
                            label="LinkedIn URL (optional)"
                        />

                        <Textfield
                            model={`${model}.address.address_line`}
                            name="address.address_line"
                            id="address_line"
                            htmlFor="address_line"
                            label="Address"
                            description="Principal place of business"
                            messages={{
                                required: 'You must provide an address'
                            }}
                            validators={{required}}
                        />

                        <Textfield
                            model={`${model}.address.suburb`}
                            name="address.suburb"
                            id="suburb"
                            htmlFor="suburb"
                            label="Suburb"
                            messages={{
                                required: 'You must provide a suburb'
                            }}
                            validators={{required}}
                        />
                        <Textfield
                            model={`${model}.address.state`}
                            name="address.state"
                            id="state"
                            htmlFor="state"
                            label="State"
                            messages={{
                                required: 'You must provide a state'
                            }}
                            validators={{required}}
                        />
                        <Textfield
                            model={`${model}.address.postal_code`}
                            name="address.postal_code"
                            id="postal_code"
                            htmlFor="postal_code"
                            label="Postcode"
                            maxLength="4"
                            messages={{
                                required: 'You must provide a postal code'
                            }}
                            validators={{required}}
                            pattern="[0-9]{4}"
                        />

                        <Control.checkbox
                          model={`${model}.interstate`}
                          id="interstate"
                          name="interstate"
                        />
                        <label htmlFor="interstate">
                            Able to work regionally or interstate
                        </label>

                        {children}

                        <input type="submit" value={buttonText} role="button"/>
                    </Form>
                    {returnLink && <a href={returnLink}>Return without saving</a>}
                </article>
            </Layout>
        )
    }
}

BusinessDetailsForm.defaultProps = {
  buttonText: 'Update profile',
  title: 'Tell us about your business'
}

const mapStateToProps = (state) => {
    return {
        returnLink: state.businessDetailsForm && state.businessDetailsForm.returnLink,
        ...formProps(state, 'businessDetailsForm')
    }
}

export {
    Textfield,
    mapStateToProps,
    BusinessDetailsForm as Form
}

export default connect(mapStateToProps)(BusinessDetailsForm);
