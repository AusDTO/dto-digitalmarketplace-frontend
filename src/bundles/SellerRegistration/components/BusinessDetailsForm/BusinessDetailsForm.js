import React from 'react';
import {connect} from 'react-redux';
import { Form, actions } from 'react-redux-form';
import isEmpty from 'lodash/isEmpty';

import {required, limitNumbers, validLinks, validABN} from '../../../../validators';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textarea     from '../../../../shared/form/Textarea';
import Textfield    from '../../../../shared/form/Textfield';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';

import './BusinessDetailsForm.css'

class BusinessDetailsForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        returnLink: React.PropTypes.string,
        supplierCode: React.PropTypes.string,
    }

    onAdd(e) {
        e.preventDefault();
        const {model, addAddress, businessDetailsForm} = this.props;
        addAddress(model, businessDetailsForm.other_addresses || {});
    }

    onRemove(id, e) {
        e.preventDefault();
        const {model, removeAddress} = this.props;
        removeAddress(model, id);
    }

    render() {
        const {action, csrf_token, model, returnLink, supplierCode, form, buttonText, children, onSubmit, businessDetailsForm } = this.props;
        let title = 'Tell us about your business'
        if (supplierCode) {
            title = 'Check your business details'
        }
        
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

                        <Textfield
                          model={`${model}.name`}
                          name="name"
                          id="name"
                          htmlFor="name"
                          label="Business name"
                          description="As you would like it shown on the Digital Marketplace."
                          disabled="disabled"
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
                          description={(<span>You need an ABN to do business in Australia.&nbsp;
                              <a href='https://abr.gov.au/For-Business,-Super-funds---Charities/Applying-for-an-ABN/Apply-for-an-ABN/'>Apply for an ABN here.</a>
                          </span>)}
                          disabled="disabled"
                          messages={{
                              validABN: 'ABN is required and must match a valid ABN as listed on the Australian Business Register'
                          }}
                          validators={{validABN}}
                        />

                        <Textarea
                            model={`${model}.summary`}
                            name="summary"
                            id="summary"
                            controlProps={{limit: 50}}
                            label="Summary"
                            description="3-4 sentences that describe your business. This can be seen by all Digital Marketplace visitors, even without signing in."
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
                                required: 'You must provide a website link beginning with http'
                            }}
                            validators={{required}}
                        />

                        <Textfield
                            model={`${model}.linkedin`}
                            name="linkedin"
                            id="linkedin"
                            htmlFor="linkedin"
                            label="LinkedIn URL (optional)"
                            description="Provide a LinkedIn URL beginning with http"
                            messages={{
                                validLinks: 'Links provided must begin with http'
                            }}
                            validators={{validLinks}}
                        />

                        <Textfield
                            model={`${model}.address.address_line`}
                            name="address.address_line"
                            id="address_line"
                            htmlFor="address_line"
                            label="Primary Address"
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
                                required: 'You must provide a postal code. ',
                                limitNumbers: 'Postal codes must be four digits long and only numbers.'
                            }}
                            validators={{required, limitNumbers: limitNumbers(4)}}
                        />
                        <div>
                            {businessDetailsForm.other_addresses && Object.keys(businessDetailsForm.other_addresses).map((key, i) => {
                              return (
                                <div styleName="address-wrapper" key={key}>
                                    <hr styleName="hr"/>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-10">
                                          <h3 styleName="heading">Additional address</h3>
                                        </div>
                                        <div className="col-xs-12 col-sm-2">
                                            <button type="submit" styleName="remove-button" className="button-secondary" onClick={this.onRemove.bind(this, key)}>Remove</button>
                                        </div>  
                                    </div>  
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-10">
                                            <Textfield
                                                model={`${model}.other_addresses[${i}].address_line`}
                                                name={`address_line-${i}`}
                                                id={`address_line-${i}`}
                                                htmlFor={`address_line-${i}`}
                                                label="Address"
                                                messages={{
                                                    required: 'You must provide address'
                                                }}
                                                validators={{required}}
                                            />
                                            <Textfield
                                                model={`${model}.other_addresses[${i}].suburb`}
                                                name={`suburb-${i}`}
                                                id={`suburb-${i}`}
                                                htmlFor={`suburb-${i}`}
                                                label="Suburb"
                                                messages={{
                                                    required: 'You must provide a suburb'
                                                }}
                                                validators={{required}}
                                            />
                                            <Textfield
                                                model={`${model}.other_addresses[${i}].state`}
                                                name={`state-${i}`}
                                                id={`state-${i}`}
                                                htmlFor={`state-${i}`}
                                                label="State"
                                                messages={{
                                                    required: 'You must provide a state'
                                                }}
                                                validators={{required}}
                                            />
                                            <Textfield
                                                model={`${model}.other_addresses[${i}].postal_code`}
                                                name={`postal_code-${i}`}
                                                id={`postal_code-${i}`}
                                                htmlFor={`postal_code-${i}`}
                                                label="Postcode"
                                                maxLength="4"
                                                messages={{
                                                    required: 'You must provide a postal code'
                                                }}
                                                validators={{required}}
                                                pattern="[0-9]{4}"
                                            />
                                        </div>
                                    </div>        
                                </div>    
                              )
                            })}
                            {isEmpty(businessDetailsForm.other_addresses) &&
                                <p styleName="footer">More offices?</p>
                            }
                            <button type="submit" className="button-secondary" onClick={this.onAdd.bind(this)}>Add another address</button>
                        </div>

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
        supplierCode: (state.application && state.application.supplierCode),
        returnLink: state.businessDetailsForm && state.businessDetailsForm.returnLink,
        ...formProps(state, 'businessDetailsForm')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAddress: (model, other_addresses) => {
            dispatch(actions.change(`${model}.other_addresses.${Object.keys(other_addresses).length}`, {}));
        },
        removeAddress: (model, id) => {
            dispatch(actions.omit(`${model}.other_addresses`, id));
            // added due to bug in adding empty address then removing without submit
            dispatch(actions.setValidity(`${model}.other_addresses.${id}`, true));
        }
    }
}

export {
    Textfield,
    mapStateToProps,
    BusinessDetailsForm as Form
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDetailsForm);
