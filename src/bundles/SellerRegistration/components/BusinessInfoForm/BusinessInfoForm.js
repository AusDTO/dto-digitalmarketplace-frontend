import React from 'react';
import {connect} from 'react-redux';
import { Form, Control } from 'react-redux-form';

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
                    <h2>More about your business</h2>
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
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="sole"
                                value="Sole trader"/>
                            <label htmlFor="sole">Sole trader

                            </label>

                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="2to19"
                                value="2-19"/>
                            <label htmlFor="2to19">2-19

                            </label>

                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="20to199"
                                value="20-199"/>
                            <label htmlFor="20to199">20-199

                            </label>

                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="200plus"
                                value="200+"/>
                            <label htmlFor="200plus">200+

                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Select any identifiers that apply to your business</legend>
                            <p>
                            Buyers often search for sellers that have specific characteristics, whether through size or the people who make up the organisation. This is optional, so it’s up to you whether you’d like to share this information.
                            </p>

                            <Control.checkbox
                                model={`${model}.seller_type.indigenous`}
                                id="indigenous"
                                name="indigenous"
                                value="Indigenous"
                            />
                            <label htmlFor="indigenous">Indigenous
                                <p>Your business is listed on a directory of indigenous businesses, such as Supply Nation.</p>
                            </label>

                            {/*<Textfield
                                model={`${model}.supply_nation`}
                                name="supply_nation"
                                id="supply_nation"
                                htmlFor="supply_nation"
                                label="Please add your Supply Nation certification number."
                                style={{display: 'none'}}
                                messages={{
                                    required: 'Supply Nation certification number is required',
                                }}
                            />*/}


                            <Control.checkbox
                                model={`${model}.seller_type.disability`}
                                id="disability"
                                name="disability"
                                value="Disability"
                            />
                            <label htmlFor="disability">Australian disability enterprise
                                <p>Your business is listed on the <a href="http://www.ade.org.au/ades-directory" rel="external">Australian disability enterprise register</a>.</p>
                            </label>

                            <Control.checkbox
                                model={`${model}.seller_type.regional`}
                                id="regional"
                                name="regional"
                                value="Regional"
                            />
                            <label htmlFor="regional">
                                Rural or non-metro based business
                            </label>

                            <Control.checkbox
                                model={`${model}.seller_type.start_up`}
                                id="start-up"
                                name="start-up"
                                value="Start Up"
                            />
                            <label htmlFor="start-up">Start-up
                                <p>Your business aims to disrupt an established market using technology.It’s not listed on any stock exchange and is less than 5 years old.</p>
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

                        </fieldset>

                        <fieldset>
                            <legend>Have you ever worked with government before? Choose one or more.</legend>

                            <Control.checkbox
                                model={`${model}.government_experience.no_experience`}
                                name="no_experience"
                                id="experience"
                                value="experience"/>
                            <label htmlFor="experience">No, we're looking forward to working with government for the first time</label>

                            <Control.checkbox
                                model={`${model}.government_experience.local`}
                                name="local_government_experience"
                                id="local"
                                value="Local"/>
                            <label htmlFor="local">Yes, with local government</label>

                            <Control.checkbox
                                model={`${model}.government_experience.state`}
                                name="state_government_experience"
                                id="state"
                                value="state"/>
                            <label htmlFor="state">Yes, with state or territory government</label>

                            <Control.checkbox
                                model={`${model}.government_experience.federal`}
                                name="federal_government_experience"
                                id="federal"
                                value="federal"/>
                            <label htmlFor="federal">Yes, with federal government</label>

                            <Control.checkbox
                                model={`${model}.government_experience.international`}
                                name="international_government_experience"
                                id="international"
                                value="international"/>
                            <label htmlFor="international">Yes, with government outside Australia</label>

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
  title: 'More about your business'
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...formProps(state, 'businessInfoForm')
    }
}

export {
    mapStateToProps,
    BusinessInfoForm as Form
}

export default connect(mapStateToProps)(BusinessInfoForm);
