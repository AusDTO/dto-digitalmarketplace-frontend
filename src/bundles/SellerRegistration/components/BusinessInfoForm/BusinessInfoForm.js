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

                        <fieldset>
                            <legend>Number of employees</legend>
                            <Control.radio
                                model={`${model}.seller_type.number_of_employees`}
                                name="number_of_employees"
                                id="sole"
                                value="Sole trader"/>
                            <label htmlFor="sole">Sole trader

                            </label>

                            <Control.radio
                                model={`${model}.seller_type.number_of_employees`}
                                name="number_of_employees"
                                id="2to10"
                                value="2-10"/>
                            <label htmlFor="2to10">2-10

                            </label>

                            <Control.radio
                                model={`${model}.seller_type.number_of_employees`}
                                name="number_of_employees"
                                id="11to50"
                                value="11-50r"/>
                            <label htmlFor="11to50">11-50

                            </label>

                            <Control.radio
                                model={`${model}.seller_type.number_of_employees`}
                                name="number_of_employees"
                                id="51to200"
                                value="51-200"/>
                            <label htmlFor="51to200">51-200

                            </label>

                            <Control.radio
                                model={`${model}.seller_type.number_of_employees`}
                                name="number_of_employees"
                                id="200plus"
                                value="200+"/>
                            <label htmlFor="200plus">200+

                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Select all that apply to your business (optional).</legend>
                            <Control.checkbox
                                model={`${model}.seller_type.start_up`}
                                id="start-up"
                                name="start-up"
                                value="Start Up"
                            />
                            <label htmlFor="start-up">Start up
                                <p>Your business aims to disrupt an established market using technology.
                                    Up to 5 years from business
                                    commencement. Not listed on any stock exchange.</p>
                            </label>

                            <Control.checkbox
                                model={`${model}.seller_type.sme`}
                                id="sme"
                                name="sme"
                                value="SME"
                            />
                            <label htmlFor="sme">SME
                                <p>Your business has less than 200 employees and is independent of
                                    any parent organisation for taxation purposes.</p>
                            </label>


                            <Control.checkbox
                                model={`${model}.seller_type.indigenous`}
                                id="indigenous"
                                name="indigenous"
                                value="Indigenous"
                            />
                            <label htmlFor="indigenous">Indigenous
                                <p>Your business is listed on a directory
                                    of indigenous businesses, such as Supply Nation.</p>
                            </label>

                        </fieldset>

                        <fieldset>
                            <legend>Business purpose</legend>

                            <Control.checkbox
                                model={`${model}.seller_type.product`}
                                id="product"
                                name="product"
                                value="Product"
                            />
                            <label htmlFor="product">Product
                                <p>You provide software, platform or infrastructure as a service</p>
                            </label>


                            <Control.checkbox
                                model={`${model}.seller_type.nfp_social_enterprise`}
                                id="nfp-social-enterprise"
                                name="nfp-social-enterprise"
                                value="Not-for-profit / social enterprise"
                            />
                            <label htmlFor="nfp-social-enterprise">Not-for-profit / social enterprise
                                <p>An organisation that applies commercial strategies to maximize improvements in human or environmental well-being and reinvests profit to fulfil its mission.</p>
                            </label>

                            <Control.checkbox
                                model={`${model}.seller_type.recruitment`}
                                id="recruitment"
                                name="recruitment"
                                value="Recruitment"
                            />
                            <label htmlFor="recruitment">Recruiter 
                                <p>Your primary purpose is resourcing and you don’t take responsibility for the quality of the work performed by specialists you place.</p>
                            </label>
                        


                        </fieldset>
                        

                        <fieldset>
                            <legend></legend>
                            <Control.checkbox
                                model={`${model}.seller_type.new_to_gov`}
                                id="new-to-gov"
                                name="new-to-gov"
                                value="worked with Government before"
                            />
                            <label htmlFor="new-to-gov">Have you worked with Government before?
                            </label>
                            
                            <Textfield
                                model={`${model}.other_panels`}
                                name="other-panels"
                                id="other-panels"
                                htmlFor="other-panels"
                                label="List any other Government panels you have joined (optional) "
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
