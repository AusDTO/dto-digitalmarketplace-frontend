import React from 'react';
import {connect} from 'react-redux';
import { Form, Control } from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
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
                            <legend>Select all that apply to your business (optional).</legend>

                            <Control.checkbox
                                model={`${model}.seller_type.start-up`}
                                id="start-up"
                                name="start-up"
                                value="start-up"
                            />
                            <label htmlFor="start-up"><strong>Start up</strong> Up to 5 years from business commencement. 
                                Not listed on any stock exchange. Able to capture a large addressable market using 
                                technology.</label>

                            <Control.checkbox
                                model={`${model}.seller_type.sme`}
                                id="sme"
                                name="sme"
                                value="sme"
                            />
                            <label htmlFor="sme"><strong>SME</strong> Less than 200 employees and is independent of 
                                any parent organisation for taxation.</label>

                            <Control.checkbox
                                model={`${model}.seller_type.indigenous`}
                                id="indigenous"
                                name="indigenous"
                                value="indigenous"
                            />
                            <label htmlFor="indigenous"><strong>Indigenous</strong> Business is listed on a directory 
                                of indigenous businesses, such as Supply Nation.</label>

                            <Control.checkbox
                                model={`${model}.seller_type.recruitment`}
                                id="recruitment"
                                name="recruitment"
                                value="recruitment"
                            />
                            <label htmlFor="recruitment"><strong>Recruiter</strong> Primary business purpose 
                                is resourcing.</label>

                            <Control.checkbox
                                model={`${model}.seller_type.product`}
                                id="product"
                                name="product"
                                value="product"
                            />
                            <label htmlFor="product"><strong>Product based business</strong> Your services require 
                                your proprietary software or hardware.</label>
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
  title: 'Business information'
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
