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
        hasLabourHireLicenceACT: false,
        hasLabourHireLicenceQLD: false,
        hasLabourHireLicenceVIC: false,
        loaded: false,
        checked: false
    }

    checkboxLabelWhenRecruiterConsultant = 'I understand that once my business is updated to both recruitment and consultancy in the Digital Marketplace, I will lose my current category approvals. I must request assessment from my dashboard and be approved in the relevant categories before I can respond to opportunities.'
    checkboxLabelWhenConsultant = 'I understand that once my business is updated to a consultancy in the Digital Marketplace, I will lose my current category approvals. I must request assessment from my dashboard and be approved in the relevant categories before I can respond to opportunities.'

    componentDidMount() {
        const { labourHire } = this.props[this.props.model]
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

        if (labourHire
            && labourHire.act
            && labourHire.act.expiry
            && labourHire.act.expiry.length > 0
            && labourHire.act.licenceNumber
            && labourHire.act.licenceNumber.length > 0
        ) {
            this.setState({
                hasLabourHireLicenceACT: true
            })
        }

        if (labourHire
            && labourHire.qld
            && labourHire.qld.expiry
            && labourHire.qld.expiry.length > 0
            && labourHire.qld.licenceNumber
            && labourHire.qld.licenceNumber.length > 0
        ) {
            this.setState({
                hasLabourHireLicenceQLD: true
            })
        }

        if (labourHire
            && labourHire.vic
            && labourHire.vic.expiry
            && labourHire.vic.expiry.length > 0
            && labourHire.vic.licenceNumber
            && labourHire.vic.licenceNumber.length > 0
        ) {
            this.setState({
                hasLabourHireLicenceVIC: true
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

    handleCheckboxClickACT = () => {
        this.setState({ hasLabourHireLicenceACT: !this.state.hasLabourHireLicenceACT });
    }

    handleCheckboxChangeACT = e => {
        const { model, updateProperty } = this.props

        if (!e.target.checked) {
            updateProperty(`${model}.labourHire.act.expiry`, null)
            updateProperty(`${model}.labourHire.act.licenceNumber`, null)
        }
    }

    handleCheckboxClickQLD = () => {
        this.setState({ hasLabourHireLicenceQLD: !this.state.hasLabourHireLicenceQLD });
    }

    handleCheckboxChangeQLD = e => {
        const { model, updateProperty } = this.props

        if (!e.target.checked) {
            updateProperty(`${model}.labourHire.qld.expiry`, null)
            updateProperty(`${model}.labourHire.qld.licenceNumber`, null)
        }
    }

    handleCheckboxClickVIC = () => {
        this.setState({ hasLabourHireLicenceVIC: !this.state.hasLabourHireLicenceVIC });
    }

    handleCheckboxChangeVIC = e => {
        const { model, updateProperty } = this.props

        if (!e.target.checked) {
            updateProperty(`${model}.labourHire.vic.expiry`, null)
            updateProperty(`${model}.labourHire.vic.licenceNumber`, null)
        }
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
                            {this.props[model].recruiter && this.props[model].recruiter !== 'no' && (
                                <fieldset>
                                    <legend>
                                        <h2 id="LabourHire" className="au-display-lg" tabIndex="-1">Labour hire licence</h2>
                                    </legend>
                                    <StatefulError
                                        model={model}
                                        id="LabourHire"
                                        messages={this.generateLicenceMessages()}
                                    />
                                    <p>Some states operate under a mandated Labour Hire Licensing Act. You will require a relevant licence if you are applying for specialist opportunities in Australian Capital Territory, Victoria or Queensland.</p>
                                    <p>
                                        <span styleName="recruiterStyles.bold">I have a labour hire licence for:</span> (optional)
                                    </p>
                                    <div className="au-control-input au-control-input--block">
                                        <input
                                            checked={this.state.hasLabourHireLicenceACT}
                                            className="au-control-input__input"
                                            id="act-licence"
                                            onChange={this.handleCheckboxChangeACT.bind(this)}
                                            onClick={this.handleCheckboxClickACT.bind(this)}
                                            type="checkbox"
                                        />
                                        <label
                                            className="au-control-input__text"
                                            htmlFor="act-licence"
                                            styleName="recruiterStyles.noBackgroundImage">
                                                Australian Capital Territory
                                        </label>
                                    </div>
                                    <div className="au-control-input au-control-input--block">
                                        <input
                                            checked={this.state.hasLabourHireLicenceQLD}
                                            className="au-control-input__input"
                                            id="qld-licence"
                                            onChange={this.handleCheckboxChangeQLD.bind(this)}
                                            onClick={this.handleCheckboxClickQLD.bind(this)}
                                            type="checkbox"
                                        />
                                        <label
                                            className="au-control-input__text"
                                            htmlFor="qld-licence"
                                            styleName="recruiterStyles.noBackgroundImage">
                                                Queensland
                                        </label>
                                    </div>
                                    <div className="au-control-input au-control-input--block">
                                        <input
                                            checked={this.state.hasLabourHireLicenceVIC}
                                            className="au-control-input__input"
                                            id="vic-licence"
                                            onChange={this.handleCheckboxChangeVIC.bind(this)}
                                            onClick={this.handleCheckboxClickVIC.bind(this)}
                                            type="checkbox"
                                        />
                                        <label
                                            className="au-control-input__text"
                                            htmlFor="vic-licence"
                                            styleName="recruiterStyles.noBackgroundImage">
                                                Victoria
                                        </label>
                                    </div>
                                    {this.state.hasLabourHireLicenceACT && (
                                        <React.Fragment key="act">
                                            <h3 className="au-display-md" tabIndex="-1">{mapAustraliaState("act")}</h3>
                                            <br />
                                            <p>
                                                Read the{' '}
                                                <a href="/api/2/r/labour-hire-licensing-act-act" rel="external noopener noreferrer" target="_blank">
                                                    Labour Hire Licensing Act for { mapAustraliaState("act") }
                                                </a>
                                            </p>
                                            <Textfield
                                                model={`${model}.labourHire.act.licenceNumber`}
                                                name="actLicenceNumber"
                                                id="actLicenceNumber"
                                                htmlFor="actLicenceNumber"
                                                label="Licence number"
                                                description=""
                                            />
                                            <div styleName="recruiterStyles.expiryDate">
                                                <Control
                                                    model={`${model}.labourHire.act.expiry`}
                                                    component={Datefield}
                                                    name="actExpiry"
                                                    id="actExpiry"
                                                    label="Expiry date"
                                                    updateOn="change"
                                                    controlProps={{
                                                        id: "actExpiry",
                                                        model: `${model}.labourHire.act.expiry`,
                                                        htmlFor: "actExpiry",
                                                        label: `Enter the expiry date for ${ mapAustraliaState("act") }`
                                                    }}
                                                />
                                            </div>
                                        </React.Fragment>
                                    )}
                                    {this.state.hasLabourHireLicenceQLD && (
                                        <React.Fragment key="qld">
                                            <h3 className="au-display-md" tabIndex="-1">{mapAustraliaState("qld")}</h3>
                                            <br />
                                            <p>
                                                Read the{' '}
                                                <a href="/api/2/r/labour-hire-licensing-act-qld" rel="external noopener noreferrer" target="_blank">
                                                    Labour Hire Licensing Act for { mapAustraliaState("qld") }
                                                </a>
                                            </p>
                                            <Textfield
                                                model={`${model}.labourHire.qld.licenceNumber`}
                                                name="qldLicenceNumber"
                                                id="qldLicenceNumber"
                                                htmlFor="qldLicenceNumber"
                                                label="Licence number"
                                                description=""
                                            />
                                            <div styleName="recruiterStyles.expiryDate">
                                                <Control
                                                    model={`${model}.labourHire.qld.expiry`}
                                                    component={Datefield}
                                                    name="qldExpiry"
                                                    id="qldExpiry"
                                                    label="Expiry date"
                                                    updateOn="change"
                                                    controlProps={{
                                                        id: "qldExpiry",
                                                        model: `${model}.labourHire.qld.expiry`,
                                                        htmlFor: "qldExpiry",
                                                        label: `Enter the expiry date for ${ mapAustraliaState("qld") }`
                                                    }}
                                                />
                                            </div>
                                        </React.Fragment>
                                    )}
                                    {this.state.hasLabourHireLicenceVIC && (
                                        <React.Fragment key="vic">
                                            <h3 className="au-display-md" tabIndex="-1">{mapAustraliaState("vic")}</h3>
                                            <br />
                                            <p>
                                                Read the{' '}
                                                <a href="/api/2/r/labour-hire-licensing-act-vic" rel="external noopener noreferrer" target="_blank">
                                                    Labour Hire Licensing Act for { mapAustraliaState("vic") }
                                                </a>
                                            </p>
                                            <Textfield
                                                model={`${model}.labourHire.vic.licenceNumber`}
                                                name="vicLicenceNumber"
                                                id="vicLicenceNumber"
                                                htmlFor="vicLicenceNumber"
                                                label="Licence number"
                                                description=""
                                            />
                                            <div styleName="recruiterStyles.expiryDate">
                                                <Control
                                                    model={`${model}.labourHire.vic.expiry`}
                                                    component={Datefield}
                                                    name="vicExpiry"
                                                    id="vicExpiry"
                                                    label="Expiry date"
                                                    updateOn="change"
                                                    controlProps={{
                                                        id: "vicExpiry",
                                                        model: `${model}.labourHire.vic.expiry`,
                                                        htmlFor: "vicExpiry",
                                                        label: `Enter the expiry date for ${ mapAustraliaState("vic") }`
                                                    }}
                                                />
                                            </div>
                                        </React.Fragment>
                                    )}
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
