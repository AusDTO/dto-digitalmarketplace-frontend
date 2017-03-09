import React from 'react';
import {connect} from 'react-redux';
import {Form, Control} from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import StatefulError from '../../../../shared/form/StatefulError';
import CheckboxDetailsField  from '../../../../shared/form/CheckboxDetailsField';
import {required} from '../../../../validators';

import formProps    from '../../../../shared/reduxModules/formPropsSelector';


class BusinessInfoForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        returnLink: React.PropTypes.string
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit, onSubmitFailed} = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">More about your business</h1>
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
                          onSubmitFailed={onSubmitFailed}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        <fieldset>
                            <legend>Number of employees</legend>

                            <StatefulError
                                model={`${model}.number_of_employees`}
                                id="sole"
                                messages={{
                                    required: 'You must provide number of employees'
                                }}
                            />
                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="sole"
                                value="Sole trader"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="sole">Sole trader

                            </label>

                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="2to19"
                                value="2-19"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="2to19">2-19

                            </label>

                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="20to49"
                                value="20-49"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="20to49">20-49

                            </label>

                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="50to99"
                                value="50-99"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="50to99">50-99

                            </label>

                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="100to199"
                                value="100-199"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="100to199">100-199

                            </label>

                            <Control.radio
                                model={`${model}.number_of_employees`}
                                name="number_of_employees"
                                id="200plus"
                                value="200+"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="200plus">200+

                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Business identifiers (optional)</legend>
                            <Control.checkbox
                                model={`${model}.seller_type.start_up`}
                                id="start-up"
                                name="start-up"
                                value="Start Up"
                            />
                            <label htmlFor="start-up">Start-up
                                <p>Your business aims to disrupt an established market using technology. It is not listed
                                    on any stock exchange and is less than 5 years old.</p>
                            </label>
                            <Control.checkbox
                                model={`${model}.seller_type.sme`}
                                id="sme"
                                name="sme"
                                value="SME"
                            />
                            <label htmlFor="sme">Small to medium-sized enterprise (SME)
                                <p>You have less than 200 employees and are independent of any parent organisation for
                                    taxation purposes.</p>
                            </label>

                            <Control.checkbox
                                model={`${model}.seller_type.nfp_social_enterprise`}
                                id="nfp-social-enterprise"
                                name="nfp-social-enterprise"
                                value="Not-for-profit / social enterprise"
                            />
                            <label htmlFor="nfp-social-enterprise">Not-for-profit / social enterprise
                                <p>An organisation that applies commercial strategies to maximize improvements in human
                                    or environmental wellbeing and reinvests profit to fulfil its mission.</p>
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Location (optional)</legend>


                            <Control.checkbox
                                model={`${model}.seller_type.regional`}
                                id="regional"
                                name="regional"
                                value="Regional"
                            />
                            <label htmlFor="regional">
                                Regional or non-metropolitan business
                            </label>
                            <Control.checkbox
                                model={`${model}.travel`}
                                id="travel"
                                name="travel"
                            />
                            <label htmlFor="travel">
                                Happy to travel for regional or interstate opportunities
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Diversity and inclusion (optional)</legend>
                            <p>The Marketplace is committed to providing a diverse and inclusive environment.<br/>
                                Responses are optional and for demographic purposes only.</p>
                            <Control.checkbox
                                model={`${model}.seller_type.disability`}
                                id="disability"
                                name="disability"
                                value="Disability"
                            />
                            <label htmlFor="disability">Australian disability enterprise
                                <p>Your business is listed on the <a href="http://www.ade.org.au/ades-directory"
                                                                     rel="external" target="_blank">Australian
                                    disability enterprise register</a>.</p>
                            </label>


                            <Control.checkbox
                                model={`${model}.seller_type.female_owned`}
                                id="female-owned"
                                name="female-owned"
                                value="Female owned"
                            />
                            <label htmlFor="female-owned">Female owned
                                <p>Your business has at least 50% female ownership. </p>
                            </label>


                            <Control.checkbox
                                model={`${model}.seller_type.lgbtqi_owned`}
                                id="lgbtqi-owned"
                                name="lgbtqi-owned"
                                value="LGBTQI owned"
                            />
                            <label htmlFor="lgbtqi-owned">LGBTQI owned
                                <p>Your business identifies as a LGBTQI enterprise. </p>
                            </label>

                            <CheckboxDetailsField
                                model={`${model}.seller_type.indigenous`}
                                label={(
                                    <span>Indigenous <p>Your business is at least 50% Indigenous owned and listed on <a
                                        href="http://www.supplynation.org.au/search" rel="external" target="_blank">Supply Nation.</a></p></span>)}
                                detailsLabel="Please add your Supply Nation certification number"
                                detailsModel={`${model}.supply_nation`}
                                id="indigenous"
                                name="indigenous"
                                value="Indigenous"
                            />

                        </fieldset>

                        <fieldset>
                            <legend>Has your business worked with government before?</legend>

                            <Control.checkbox
                                model={`${model}.government_experience.no_experience`}
                                name="no_experience"
                                id="no_experience"
                                value="no_experience"/>
                            <label htmlFor="no_experience">No, we're looking forward to working with government for the
                                first time</label>

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

                        <input type="submit" value="Save and continue"/>
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
