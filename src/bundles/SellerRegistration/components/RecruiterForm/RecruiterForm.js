import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { Form, Control, actions } from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import Textfield     from '../../../../shared/form/Textfield';
import Datefield     from '../../../../shared/form/Datefield';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';
import StatefulError from '../../../../shared/form/StatefulError';
import StepNav       from '../StepNav';
import { mapAustraliaState } from '../../../../helpers'

import { validDate } from '../../../../validators';

import ValidationSummary from '../ValidationSummary';
import '../SellerRegistration.css';

const states = ['qld', 'sa', 'vic']

class RecruiterForm extends BaseForm {
    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        returnLink: PropTypes.string
    }
    
    state = {
        recruiter: this.props[this.props.model].recruiter,
        loaded: false
    }

    componentDidMount() {
        this.setState({loaded: true})
    }

    validExpiryDate(v, state) {
        const { model } = this.props;
        
        if (this.state.recruiter === 'no') {
            return true
        }
        if (v) {
            if (this.props[model].labourHire[state].licenceNumber) {
                return validDate(v)
            }
        }
        return true;
    }

    onChangeState(e) {
        const { model, updateProperty } = this.props;

        this.setState({
            recruiter: e.target.value
        })

        if (e.target.value === 'no') {
            states.forEach(s => {
                let expiryProperty = `${model}.labourHire.${s}.expiry`
                let licenceNumberProperty = `${model}.labourHire.${s}.licenceNumber`
                updateProperty(expiryProperty, null)
                updateProperty(licenceNumberProperty, null)
            })
        }
    }

    requiredLicenceNumber(v, state) {
        const { model, setValid } = this.props
        const valid = (
            this.props[model].recruiter !== 'no' &&
            this.props[model].labourHire &&
            this.props[model].labourHire[state] &&
            this.props[model].labourHire[state].licenceNumber
            ? true : false
        )
        if (!v) {
            if (valid) {
                if (this.state.loaded) {
                    setValid(`${model}.labourHire.${state}.licenceNumber`, {
                        required: false
                    })
                }
            }
            return true
        } else {
            if (this.state.loaded) {
                setValid(`${model}.labourHire.${state}.licenceNumber`, {
                    required: valid
                })
            }
        }
        return true
    }
    requiredExpiry(v, state) {
        const { model, setValid } = this.props
        const valid = (
            this.props[model].recruiter !== 'no' &&
            this.props[model].labourHire &&
            this.props[model].labourHire[state] &&
            this.props[model].labourHire[state].expiry
            ? true : false
        )
        if (!v) {
            if (valid) {
                if (this.state.loaded) {
                    setValid(`${model}.labourHire.${state}.expiry`, {
                        required: false
                    })
                }
            }
            return true
        } else {
            if (this.state.loaded) {
                setValid(`${model}.labourHire.${state}.expiry`, {
                    required: valid
                })
            }
        }
        return true
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit, nextRoute, submitClicked, applicationErrors, type} = this.props;
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
                <ValidationSummary
                    title="You need to fix these issues"
                    form={form}
                    applicationErrors={applicationErrors} 
                    filterFunc={(ae) => ae.step === 'recruiter' && type === 'edit'}
                />
                </header>
                <article role="main">
                    <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="Recruiter__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}
                        <div styleName="content">
                            <fieldset>
                                <legend>
                                    <h1 className="au-display-xl" tabIndex="-1">Are you a recruiter?</h1>
                                </legend>
                                <p>Recruiters provide candidates for digital specialist roles, but are not directly responsible for their work, performance or deliverables.
                                    Examples include temporary and contract recruitment.</p>
                                <Control.radio
                                    model={`${model}.recruiter`}
                                    onClick={this.onChangeState.bind(this)}
                                    name="recruiter"
                                    id="yes"
                                    value="yes"/>
                                <label htmlFor="yes">Yes, my business solely places candidates in temporary and contract recruitment</label>

                                <Control.radio
                                    model={`${model}.recruiter`}
                                    onClick={this.onChangeState.bind(this)}
                                    name="recruiter"
                                    id="no"
                                    value="no"/>
                                <label htmlFor="no">No, my business provides services on a consultancy basis</label>

                                <Control.radio
                                    model={`${model}.recruiter`}
                                    onClick={this.onChangeState.bind(this)}
                                    name="recruiter"
                                    id="both"
                                    value="both"/>
                                <label htmlFor="both">My business does both recruitment and consultancy</label>
                            </fieldset>
                            {this.props[model].recruiter && this.props[model].recruiter !== 'no' && (
                                <fieldset>
                                    <legend>
                                        <h2 className="au-display-lg" tabIndex="-1">Labour hire licence</h2>
                                    </legend>
                                    <p>Some states operate under a mandated Labour Hire Licensing Act.  Please provide your licence details if you plan to submit roles for these states:</p>
                                    
                                    {states.map(s => (
                                        <React.Fragment key={s}>
                                            <h3 className="au-display-md" tabIndex="-1">{mapAustraliaState(s)}</h3>
                                            <br />
                                            <p>
                                                Read the{' '}
                                                <a href={`/api/2/r/labour-hire-licensing-act-${s}`} rel="external noopener noreferrer" target="_blank">
                                                    Labour Hire Licensing Act for { mapAustraliaState(s) }
                                                </a>
                                            </p>
                                            <StatefulError
                                                model={`${model}.labourHire.${s}.expiry`}
                                                id={`${s}Expiry`}
                                                messages={{
                                                    validDate: `Expiry date is required for ${mapAustraliaState(s)} and must be in the future.`,
                                                    required: `Please enter an expiry date for ${mapAustraliaState(s)}.`
                                                }}
                                            />
                                            <br />
                                            <StatefulError
                                                model={`${model}.labourHire.${s}.licenceNumber`}
                                                id={`${s}LicenceNumber`}
                                                messages={{
                                                    required: `Please enter your licence number for ${mapAustraliaState(s)}`
                                                }}
                                            />
                                            <Textfield
                                                model={`${model}.labourHire.${s}.licenceNumber`}
                                                name={`${s}LicenceNumber`}
                                                id={`${s}LicenceNumber`}
                                                htmlFor={`${s}LicenceNumber`}
                                                label="Licence number"
                                                description=""
                                                validators={{
                                                    required: v => this.requiredExpiry(v, s)
                                                }}
                                            />
                                            <Control
                                                model={`${model}.labourHire.${s}.expiry`}
                                                component={Datefield}
                                                name={`${s}Expiry`}
                                                id={`${s}Expiry`}
                                                label="Expiry date"
                                                updateOn="change"
                                                validators={{
                                                    validDate: v => this.validExpiryDate(v, s),
                                                    required: v => this.requiredLicenceNumber(v, s)
                                                }}
                                                controlProps={{
                                                    id: `${s}Expiry`,
                                                    model: `${model}.labourHire.${s}.expiry`,
                                                    htmlFor: `${s}Expiry`,
                                                    label: `Enter the expiry date of ${s}`
                                                }}
                                            />
                                        </React.Fragment>
                                    ))}
                                </fieldset>
                            )}
                            {children}
                        </div>
                        <StepNav buttonText="Save and continue" to={nextRoute}/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

RecruiterForm.defaultProps = {
    title: 'Recruiter'
}

const mapStateToProps = (state) => {
    return {
        ...formProps(state, 'recruiterForm'),
        applicationErrors: state.application_errors
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setValid: (p, v) => dispatch(actions.setValidity(p, v)),
        updateProperty: (p, v) => dispatch(actions.change(p, v))
    }
}

export {
    mapStateToProps,
    RecruiterForm as Form
}

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterForm);
