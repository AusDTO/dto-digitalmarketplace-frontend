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

import { required, validDate } from '../../../../validators';

import ValidationSummary from '../ValidationSummary';

import { AUcheckbox } from '@gov.au/control-input'
import PageAlert from '@gov.au/page-alerts';

import recruiterStyles from './RecruiterForm.css';
import styles from '../SellerRegistration.css';

const states = ['qld', 'vic', 'act']

class RecruiterForm extends BaseForm {
    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        returnLink: PropTypes.string
    }
    
    state = {
        checkboxLabel: '',
        recruiter: this.props[this.props.model].recruiter,
        loaded: false
    }

    checkboxLabelWhenRecruiterConsultant = 'I understand that once my business is updated to both recruitment and consultancy in the Digital Marketplace, I will lose my current category approvals. I must request assessment from my dashboard and be approved in the relevant categories before I can respond to opportunities.'
    checkboxLabelWhenConsultant = 'I understand that once my business is updated to a consultancy in the Digital Marketplace, I will lose my current category approvals. I must request assessment from my dashboard and be approved in the relevant categories before I can respond to opportunities.'

    componentDidMount() {
        const { recruiter } = this.state

        if (recruiter === 'both') {
            this.setState({
                checkboxLabel: this.checkboxLabelWhenRecruiterConsultant
            })
        }

        if (recruiter === 'no') {
            this.setState({
                checkboxLabel: this.checkboxLabelWhenConsultant
            })
        }

        this.setState({loaded: true})
    }

    onChangeState(e) {
        const { model, updateProperty } = this.props;

        this.setState({
            recruiter: e.target.value
        })

        if (e.target.value === 'both') {
            this.setState({
                checkboxLabel: this.checkboxLabelWhenRecruiterConsultant,
            })
        }

        if (e.target.value === 'no') {
            states.forEach(s => {
                updateProperty(`${model}.labourHire.${s}.expiry`, null)
                updateProperty(`${model}.labourHire.${s}.licenceNumber`, null)
            })

            this.setState({
                checkboxLabel: this.checkboxLabelWhenConsultant,
            })
        }
    }

    validLicenceNumber(formValues, state) {
        return (
            formValues.labourHire &&
            formValues.labourHire[state] &&
            (
                !formValues.labourHire[state].expiry ||
                formValues.labourHire[state].expiry &&
                formValues.labourHire[state].licenceNumber
            )
        )
    }

    validLicenceExpiry(formValues, state) {
        return (
            formValues.labourHire &&
            formValues.labourHire[state] &&
            (
                !formValues.labourHire[state].licenceNumber ||
                formValues.labourHire[state].licenceNumber &&
                formValues.labourHire[state].expiry &&
                validDate(formValues.labourHire[state].expiry)
            )
        )
    }

    generateLicenceNumberMessage(state) {
        const messages = {}
        const message = `Please enter your licence number for ${mapAustraliaState(state)}`
        messages[`requiredLicenceNumber_${state}`] = message
        return messages
    }

    generateLicenceExpiryMessage(state) {
        const messages = {}
        const message = `Please enter a valid expiry date for ${mapAustraliaState(state)} that is in the future`
        messages[`requiredLicenceExpiry_${state}`] = message
        return messages
    }

    generateLicenceMessages() {
        let messages = {}
        states.map(s => {
            messages = { ...messages, ...this.generateLicenceNumberMessage(s) }
            messages = { ...messages, ...this.generateLicenceExpiryMessage(s) }
            return true
        })
        return messages
    }

    generateLicenceValidators() {
        let validators = {}
        states.map(s => {
            const validator = {}
            validator[`requiredLicenceNumber_${s}`] = formValues => this.validLicenceNumber(formValues, s)
            validator[`requiredLicenceExpiry_${s}`] = formValues => this.validLicenceExpiry(formValues, s)
            validators = { ...validators, ...validator }
            return true
        })
        return validators
    }

    showAssessmentWarning = () => {
        const { supplier, type } = this.props
        return type === 'edit' && supplier.recruiter === 'yes'
    }

    UnderstandsProcessCheckbox = props => {
        const { checked } = props
        const { model, updateProperty } = this.props
        const { checkboxLabel } = this.state
  
        return (
          <AUcheckbox
            checked={checked}
            id="understandsAssessmentProcess"
            label={checkboxLabel}
            name="understandsAssessmentProcess"
            onChange={() => {}}
            onClick={e => {
              updateProperty(`${model}.understandsAssessmentProcess`, e.target.checked)
            }}
          />
        )
    }  

    render() {
        const {action, csrf_token, model, form, children, onSubmit, nextRoute, submitClicked, applicationErrors, type} = this.props;
        const { recruiter } = this.props[model]

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
                          validators={{
                              '': this.generateLicenceValidators()
                          }}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}
                        <div styleName="styles.content">
                            <fieldset>
                                <legend>
                                    <h1 className="au-display-xl" tabIndex="-1">Are you a recruiter?</h1>
                                </legend>
                                <p>Recruiters provide candidates for digital specialist roles, but are not directly responsible for their work, performance or deliverables.
                                    Examples include temporary and contract recruitment.</p>
                                {this.showAssessmentWarning() && recruiter === 'both' && (
                                    <PageAlert as="warning" styleName="recruiterStyles.pageAlert">
                                        <h2 className="au-display-lg">Assessment process</h2>
                                        <p styleName="recruiterStyles.pageAlertContent">Businesses that do both recruitment and consultancy must submit evidence and be approved for relevant categories before they can apply for opportunities.</p>
                                    </PageAlert>
                                )}
                                {this.showAssessmentWarning() && recruiter === 'no' && (
                                    <PageAlert as="warning" styleName="recruiterStyles.pageAlert">
                                        <h2 className="au-display-lg">Assessment process</h2>
                                        <p styleName="recruiterStyles.pageAlertContent">Businesses that provide services on a consultancy basis must submit evidence and be approved for relevant categories before they can apply for opportunities.</p>
                                    </PageAlert>
                                )}
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
                            {this.props[model].recruiter && (
                                <fieldset>
                                    <legend>
                                        <h2 id="LabourHire" className="au-display-lg" tabIndex="-1">Labour hire licence</h2>
                                    </legend>
                                    <StatefulError
                                        model={model}
                                        id="LabourHire"
                                        messages={this.generateLicenceMessages()}
                                    />
                                    <p>Some states operate under a mandated Labour Hire Licensing Act. You will require a relevant licence if you are applying for specialist opportunities in Canberra, Victoria or Queensland.</p>
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
                                            <Textfield
                                                model={`${model}.labourHire.${s}.licenceNumber`}
                                                name={`${s}LicenceNumber`}
                                                id={`${s}LicenceNumber`}
                                                htmlFor={`${s}LicenceNumber`}
                                                label="Licence number"
                                                description=""
                                            />
                                            <div styleName="recruiterStyles.expiryDate">
                                                <Control
                                                    model={`${model}.labourHire.${s}.expiry`}
                                                    component={Datefield}
                                                    name={`${s}Expiry`}
                                                    id={`${s}Expiry`}
                                                    label="Expiry date"
                                                    updateOn="change"
                                                    controlProps={{
                                                        id: `${s}Expiry`,
                                                        model: `${model}.labourHire.${s}.expiry`,
                                                        htmlFor: `${s}Expiry`,
                                                        label: `Enter the expiry date of ${s}`
                                                    }}
                                                />
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </fieldset>
                            )}
                            {children}
                            {this.showAssessmentWarning() && (recruiter === 'both' || recruiter === 'no') && (
                                <React.Fragment>
                                    <StatefulError
                                        id="understandsAssessmentProcess"
                                        model={`${model}.understandsAssessmentProcess`}
                                        messages={{
                                            required: 'Confirm you understand that once you submit these updates, you cannot respond to opportunities until you request an assessment and are approved for the relevant categories.'
                                        }}
                                    />
                                    <Control.checkbox
                                        component={this.UnderstandsProcessCheckbox}
                                        id="understandsAssessmentProcessControl"
                                        mapProps={{
                                            checked: prps => prps.modelValue
                                        }}
                                        model={`${model}.understandsAssessmentProcess`}
                                        validators={{ required }}
                                    />
                                </React.Fragment>
                            )}
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
        updateProperty: (p, v) => dispatch(actions.change(p, v))
    }
}

export {
    mapStateToProps,
    RecruiterForm as Form
}

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterForm);
