import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import MultiInput   from '../../../../shared/form/MultiInput';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';
import StepNav      from '../StepNav';
import ValidationSummary from '../ValidationSummary';

import '../SellerRegistration.css';

class AwardsForm extends BaseForm {

    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        returnLink: PropTypes.string
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit, onSubmitFailed, nextRoute, submitClicked, applicationErrors, type} = this.props;
        let hasFocused = false
        const setFocus = e => {
          if (!hasFocused) {
            hasFocused = true
            e.focus()
          }
        }
        return (
            <Layout>
                <header styleName="content">
                    <ValidationSummary form={form} applicationErrors={applicationErrors} filterFunc={(ae) => ae.step === 'awards' && type === 'edit'} />
                    <h1 className="au-display-xl" styleName="content-heading" tabIndex="-1">Awards and accreditations</h1>

                    <p>This is your opportunity to share some of the things you are proud of.
                        All questions are optional but can help your business attract potential buyers. </p>
                  <div className="calloutMistake">
                    <b> Avoid common mistakes </b>
                    <ul className="mistake-list">
                      <li>If using acronyms, their meaning must be written out clearly.</li>
                      <li>If a section does not apply to your business, leave it blank. The section will not appear on your profile.</li>
                    </ul>
                  </div>
                </header>
                <article role="main">
                    <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="Awards__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
                          onSubmitFailed={onSubmitFailed}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        <MultiInput
                            id="certifications"
                            model={`${model}.certifications`}
                            name="certifications"
                            htmlFor="certifications"
                            label="Accreditations (optional)"
                            controlProps={{defaultRows: 2}}
                            description="Does your business have any formal accreditations you want to share? "
                            disabled
                        />

                        <MultiInput
                            id="boards"
                            model={`${model}.boards`}
                            name="boards"
                            htmlFor="boards"
                            label="Industry engagement (optional)"
                            controlProps={{defaultRows: 2}}
                            description="Are you involved in any boards, committees or groups for your industry?"
                            disabled
                        />

                        <MultiInput
                            id="awards"
                            model={`${model}.awards`}
                            name="awards"
                            htmlFor="awards"
                            label="Awards (optional)"
                            controlProps={{defaultRows: 2}}
                            description="Has your work been recognised and awarded within your industry or by others?"
                            disabled
                        />

                        {children}

                        <StepNav buttonText="Save and continue" to={nextRoute}/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

AwardsForm.defaultProps = {
    title: 'Awards and accreditations'
}

const mapStateToProps = (state) => {
    return {
        ...formProps(state, 'awardsForm'),
        applicationErrors: state.application_errors
    }
}

export {
    mapStateToProps,
    AwardsForm as Form
}

export default connect(mapStateToProps)(AwardsForm);
