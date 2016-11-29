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
        const {action, csrf_token, model, returnLink, form, title, buttonText, children, onSubmit } = this.props;
        return (
            <Layout>
                <header>
                    <h1>{title}</h1>
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

                        <Textarea
                            model={`${model}.summary`}
                            name="summary"
                            id="summary"
                            controlProps={{limit: 50}}
                            label="Summary"
                            description="This will be displayed in search results"
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
                            label="Website URL (optional)"
                        />

                        <Textfield
                            model={`${model}.linkedin`}
                            name="linkedin"
                            id="linkedin"
                            htmlFor="linkedin"
                            label="LinkedIn URL (optional)"
                        />

                        <Textfield
                            model={`${model}.address.addressLine`}
                            name="address.addressLine"
                            id="addressLine"
                            htmlFor="addressLine"
                            label="Address"
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
                            model={`${model}.address.postalCode`}
                            name="address.postalCode"
                            id="postalCode"
                            htmlFor="postalCode"
                            label="Postcode"
                            messages={{
                                required: 'You must provide a postal code'
                            }}
                            validators={{required}}
                            pattern="[0-9]{4}"
                        />

                        <fieldset>
                            <legend>Select the following that apply (optional)</legend>

                            <Control.checkbox
                                model={`${model}.additionalInfo.start-up`}
                                id="start-up"
                                name="start-up"
                                value="start-up"
                            />
                            <label htmlFor="start-up">Start up - up to 5 years from commencement of business, not listed on any stock exchange, and is able to capture a large addressable market using technology</label>

                            <Control.checkbox
                                model={`${model}.additionalInfo.sme`}
                                id="sme"
                                name="sme"
                                value="sme"
                            />
                            <label htmlFor="sme">SME Your business has less than 200 employees and operates independently of any parent organisation for taxation arrangements</label>

                            <Control.checkbox
                                model={`${model}.additionalInfo.indigenous`}
                                id="indigenous"
                                name="indigenous"
                                value="indigenous"
                            />
                            <label htmlFor="indigenous">Indigenous seller - your business is listed on a directory of Indigenous businesses, such as Supply Nation</label>

                            <Control.checkbox
                                model={`${model}.additionalInfo.recruitment`}
                                id="recruitment"
                                name="recruitment"
                                value="recruitment"
                            />
                            <label htmlFor="recruitment">Recruitment agency - the primary purpose of the business is resourcing</label>

                            <Control.checkbox
                                model={`${model}.additionalInfo.product`}
                                id="product"
                                name="product"
                                value="product"
                            />
                            <label htmlFor="product">Product based business - Your services require your proprietary software or hardware.</label>
                        </fieldset>

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
  title: 'Business details'
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
