import React from 'react';
import {connect} from 'react-redux';
import { Form, Control } from 'react-redux-form';
import {required} from '../../../../validators';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textfield    from '../../../../shared/form/Textfield';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';


class BusinessInfoForm extends BaseForm {

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
                          id="BusinessDetails__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}
                        <h2>Business size/status</h2>
                        <Textfield
                            model={`${model}.size`}
                            name="size"
                            id="size"
                            htmlFor="size"
                            label="Number of employees"
                            validators={{ required }}
                            messages={{
                                required: 'Number of employees is required',
                            }}
                        />
                        <fieldset>
                            <legend>Select all that apply to your business (optional).</legend>
                            <Control.checkbox
                                model={`${model}.seller_type.sme`}
                                id="sme"
                                name="sme"
                                value="SME"
                            />
                            <label htmlFor="sme">SME
                                <p>Less than 200 employees and is independent of
                                    any parent organisation for taxation.</p>
                            </label>

                            <Control.checkbox
                                model={`${model}.seller_type.start_up`}
                                id="start-up"
                                name="start-up"
                                value="Start Up"
                            />
                            <label htmlFor="start-up">Start up
                                <p>Able to disrupt an existing business model through technology
                                    with potential for high growth. Up to 5 years from business
                                    commencement and not listed on any stock exchange.</p>
                            </label>
                            <Control.checkbox
                                model={`${model}.seller_type.indigenous`}
                                id="indigenous"
                                name="indigenous"
                                value="Indigenous"
                            />
                            <label htmlFor="indigenous">Indigenous
                                <p>Business is listed on a directory
                                    of indigenous businesses, such as Supply Nation.</p>
                            </label>
                            <Control.checkbox
                                model={`${model}.seller_type.rural`}
                                id="rural"
                                name="rural"
                                value="Rural"
                            />
                            <label htmlFor="rural">Rurally based
                                <p>...</p>
                            </label>
                        </fieldset>
                        <h2>Purpose</h2>
                        <fieldset>
                            <Control.checkbox
                                model={`${model}.seller_type.service`}
                                id="service"
                                name="service"
                                value="Service"
                            />
                            <label htmlFor="service">Service based business
                                <p>...</p>
                            </label>
                            <Control.checkbox
                                model={`${model}.seller_type.product`}
                                id="product"
                                name="product"
                                value="Product"
                            />
                            <label htmlFor="product">Product based business 
                                <p>Your services require
                                    your proprietary software or hardware.</p>
                            </label>

                            <Control.checkbox
                                model={`${model}.seller_type.recruitment`}
                                id="recruitment"
                                name="recruitment"
                                value="Recruitment"
                            />
                            <label htmlFor="recruitment">Recruiter 
                                <p>Primary business purpose is resourcing.</p>
                            </label>
                        


                            <Control.checkbox
                                model={`${model}.seller_type.nfp_social_enterprise`}
                                id="nfp-social-enterprise"
                                name="nfp-social-enterprise"
                                value="Not-for-profit / social enterprise"
                            />
                            <label htmlFor="nfp-social-enterprise">Not-for-profit / social enterprise
                                <p>You do not operate for profit or personal gain.</p>
                            </label>
                        </fieldset>
                        
                        <h2> Previous experience with Government </h2>
                        <fieldset>
                            <Control.checkbox
                                model={`${model}.seller_type.new_to_gov`}
                                id="new-to-gov"
                                name="new-to-gov"
                                value="New to government"
                            />
                            <label htmlFor="new-to-gov">New to government?
                                <p>...</p>
                            </label>
                            
                            <Textfield
                                model={`${model}.other_panels`}
                                name="other-panels"
                                id="other-panels"
                                htmlFor="other-panels"
                                label="Are you on any government panels? "
                                validators={{ required }}
                                messages={{
                                    required: 'Other panels is required',
                                }}
                            />
                        </fieldset>
                        
                        
                        {children}

                        <input type="submit" value="Save and continue" role="button"/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

BusinessInfoForm.defaultProps = {
  title: 'Select any descriptions that apply to your business'
}

const mapStateToProps = (state) => {
    return {
        ...formProps(state, 'businessInfoForm')
    }
}

export {
    mapStateToProps,
    BusinessInfoForm as Form
}

export default connect(mapStateToProps)(BusinessInfoForm);
