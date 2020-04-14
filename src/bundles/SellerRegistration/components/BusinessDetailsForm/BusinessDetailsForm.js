import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { Form, actions } from 'react-redux-form';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';

import {required, limitNumbers, validLinks, notPrivateLinkedIn} from '../../../../validators';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textarea     from '../../../../shared/form/Textarea';
import Textfield    from '../../../../shared/form/Textfield';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';
import StepNav      from '../StepNav';
import { getNextKey } from '../../../../helpers';
import ValidationSummary from '../ValidationSummary';

import styles from '../SellerRegistration.css';
import businessDetails from './BusinessDetailsForm.css';

class BusinessDetailsForm extends BaseForm {

    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        returnLink: PropTypes.string,
        supplierCode: PropTypes.number
    }

    onAdd(e) {
        e.preventDefault();
        const {model, addAddress, businessDetailsForm} = this.props;
        addAddress(model, businessDetailsForm.addresses || {});
    }

    onRemove(id, e) {
        e.preventDefault();
        const {model, removeAddress} = this.props;
        removeAddress(model, id);
    }

    render() {
        const {
            action,
            csrf_token,
            model,
            returnLink,
            supplierCode,
            ABN,
            form,
            buttonText,
            children,
            onSubmit,
            onSubmitFailed,
            businessDetailsForm,
            nextRoute,
            submitClicked,
            applicationErrors,
            type
        } = this.props;

        let title = 'Tell us about your business'
        if (isNumber(supplierCode)) {
            title = 'Check your business details'
        }
        let hasFocused = false
        const setFocus = e => {
          if (!hasFocused) {
            hasFocused = true
            e.focus()
          }
        }

        return (
            <Layout>
                <header>
                    <ValidationSummary form={form} applicationErrors={applicationErrors} filterFunc={(ae) => ae.step === 'business-details' && type === 'edit'} />
                    <h1 className="au-display-xl" styleName="styles.content-heading" tabIndex="-1">{title}</h1>
                </header>
                <article role="main">
                  <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus}/>
                  <div className="calloutMistake">
                    <b> Avoid common mistakes </b>
                    <ul className="mistake-list">
                      <li>Don’t write in capitals</li>
                      <li><b>Business name</b> - The business name you use on the Marketplace must be listed under your ABN. Don’t include a tagline.</li>
                      <li><b>Summary</b>  - describe what your company does.</li>
                      <li><b>Website URL</b>  - start with http, check the link works.</li>
                      <li><b>LinkedIn URL</b>  - Provide a public (ie non logged in) url. You can find the public URL <a href="https://www.linkedin.com/help/linkedin/answer/49315/finding-your-linkedin-public-profile-url?lang=en">following these instructions</a>. Direct buyers to a business profile rather than your personal profile.</li>
                      <li><b>Address</b>  - check the spelling and postcode are correct.</li>
                    </ul>
                  </div>
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

                        <Textfield
                          model={`${model}.name`}
                          name="name"
                          id="name"
                          htmlFor="name"
                          label="Business name"
                          description="The business name you use on the Marketplace must be listed under your ABN. You can omit suffixes such as PTY or LTD"
                          validators={{required}}
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
                          readOnly={ABN ? true : false}
                          disabled={ABN ? true : false}
                        />

                        <Textarea
                            model={`${model}.summary`}
                            name="summary"
                            id="summary"
                            controlProps={{limit: 50}}
                            label="Summary"
                            description="3-4 sentences that describe your business. This can be seen by all Digital Marketplace visitors without signing in."
                            showMessagesDuringFocus={true}
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
                            description="Provide a link to your website beginning with http"
                            messages={{
                                required: 'You must provide a website link beginning with http',
                                validLinks: 'Links provided must begin with http'
                            }}
                            validators={{required, validLinks}}
                        />

                        <Textfield
                            model={`${model}.linkedin`}
                            name="linkedin"
                            id="linkedin"
                            htmlFor="linkedin"
                            label="LinkedIn URL (optional)"
                            description="Provide a LinkedIn URL beginning with http"
                            messages={{
                                validLinks: 'Links provided must begin with http',
                                notPrivateLinkedIn: 'Please enter a URL you can open when not logged in to LinkedIn.'
                            }}
                            validators={{validLinks, notPrivateLinkedIn}}
                        />

                        <Textfield
                            model={`${model}.addresses.0.address_line`}
                            name="address.address_line"
                            id="address_line"
                            htmlFor="address_line"
                            label="Primary Address"
                            description="Principal place of business."
                            messages={{
                                required: 'You must provide an address'
                            }}
                            validators={{required}}
                        />

                        <Textfield
                            model={`${model}.addresses.0.suburb`}
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
                            model={`${model}.addresses.0.state`}
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
                            model={`${model}.addresses.0.postal_code`}
                            name="address.postal_code"
                            id="postal_code"
                            htmlFor="postal_code"
                            label="Postcode"
                            maxLength="4"
                            messages={{
                                required: 'You must provide a postal code. ',
                                limitNumbers: 'Postal codes must be four digits long and only numbers.'
                            }}
                            validators={{required, limitNumbers: limitNumbers(4)}}
                        />
                        <div>
                            {businessDetailsForm.addresses &&
                                Object.keys(businessDetailsForm.addresses)
                                    .filter((value) => {return value > 0 && businessDetailsForm.addresses[value] !== null;})
                                    .map((key, i) => {
                              return (
                                <div className={businessDetails['address-wrapper']} key={key}>
                                    <hr className={businessDetails.hr}/>
                                    <div className="row">
                                        <div className="col-xs-8 col-sm-10">
                                          <h3 className="au-display-md">Additional address</h3>
                                        </div>
                                        <div className="col-xs-4 col-sm-2">
                                            <button type="submit" className={`button-secondary ${businessDetails['remove-button']}`} onClick={this.onRemove.bind(this, key)}>Remove</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-10">
                                            <Textfield
                                                model={`${model}.addresses.${key}.address_line`}
                                                name={`address_line-${key}`}
                                                id={`address_line-${key}`}
                                                htmlFor={`address_line-${key}`}
                                                label="Address"
                                                messages={{
                                                    required: 'You must provide address'
                                                }}
                                                validators={{required}}
                                            />
                                            <Textfield
                                                model={`${model}.addresses.${key}.suburb`}
                                                name={`suburb-${key}`}
                                                id={`suburb-${key}`}
                                                htmlFor={`suburb-${key}`}
                                                label="Suburb"
                                                messages={{
                                                    required: 'You must provide a suburb'
                                                }}
                                                validators={{required}}
                                            />
                                            <Textfield
                                                model={`${model}.addresses.${key}.state`}
                                                name={`state-${key}`}
                                                id={`state-${key}`}
                                                htmlFor={`state-${key}`}
                                                label="State"
                                                messages={{
                                                    required: 'You must provide a state'
                                                }}
                                                validators={{required}}
                                            />
                                            <Textfield
                                                model={`${model}.addresses.${key}.postal_code`}
                                                name={`postal_code-${key}`}
                                                id={`postal_code-${key}`}
                                                htmlFor={`postal_code-${key}`}
                                                label="Postcode"
                                                maxLength="4"
                                                messages={{
                                                    required: 'You must provide a postal code. ',
                                                    limitNumbers: 'Postal codes must be four digits long and only numbers.'
                                                }}
                                                validators={{required, limitNumbers: limitNumbers(4)}}
                                            />
                                        </div>
                                    </div>
                                </div>
                              )
                            })}
                            {(isEmpty(businessDetailsForm.addresses) || Object.keys(businessDetailsForm.addresses).length <= 1) &&
                                <p className={businessDetails.footer}>More offices?</p>
                            }
                            <button type="submit" className="button-secondary" onClick={this.onAdd.bind(this)}>Add another address</button>
                        </div>

                        {children}

                        <StepNav buttonText={buttonText} to={nextRoute}/>
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
        supplierCode: (state.application && state.application.supplier_code),
        ABN: (state.application && state.application.abn),
        returnLink: state.businessDetailsForm && state.businessDetailsForm.returnLink,
        ...formProps(state, 'businessDetailsForm'),
        applicationErrors: state.application_errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAddress: (model, addresses) => {
            dispatch(actions.change(`${model}.addresses.${getNextKey(addresses) || 1}`, {}));
        },
        removeAddress: (model, id) => {
            dispatch(actions.omit(`${model}.addresses`, id));
            // added due to bug in adding empty address then removing without submit
            dispatch(actions.setValidity(`${model}.addresses.${id}`, true));
        }
    }
}

export {
    Textfield,
    mapStateToProps,
    BusinessDetailsForm as Form
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDetailsForm);
