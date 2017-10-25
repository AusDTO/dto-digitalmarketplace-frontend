import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textarea     from '../../../../shared/form/Textarea';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';
import { required } from '../../../../validators';
import StepNav      from '../StepNav';


class ToolsForm extends BaseForm {

    static propTypes = {
        action: PropTypes.string,
        csrf_token: PropTypes.string,
        form: PropTypes.object.isRequired,
        returnLink: PropTypes.string
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit, onSubmitFailed, nextRoute} = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">Tools and methodologies</h1>
                    <p>Enhance your profile and give buyers more ways to find you through keyword search</p>

                  <div className="calloutMistake">
                    <b> Avoid common mistakes </b>
                    <ul>
                      <li>If using acronyms, their meaning must be written out clearly.</li>
                      <li>If a section does not apply to your business, leave it blank. The section will not appear on your profile.</li>
                      <li>Use plain english to explain the tools, methodologies and technologies used.</li>
                    </ul>
                  </div>
                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={model}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="Tools__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
                          onSubmitFailed={onSubmitFailed}
                    >
                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}


                        <Textarea
                            model={`${model}.tools`}
                            name="tools"
                            id="tools"
                            controlProps={{limit: 200}}
                            label="Tools"
                            description="What delivery management software, tools or other artefacts do you use day-to-day?."
                            validators={{ required }}
                            showMessagesDuringFocus={true}
                            messages={{
                                required: `Tools is required`,
                            }}
                        />

                        <Textarea
                            model={`${model}.methodologies`}
                            name="methodologies"
                            id="methodologies"
                            controlProps={{limit: 200}}
                            label="Methodologies"
                            description="What methodologies form the core of your practice?"
                            validators={{ required }}
                            showMessagesDuringFocus={true}
                            messages={{
                                required: `Methodologies is required`,
                            }}
                        />

                        <Textarea
                            model={`${model}.technologies`}
                            name="technologies"
                            id="technologies"
                            controlProps={{limit: 200}}
                            label="Technologies (optional)"
                            description="What technologies or programming languages do you use?"
                            showMessagesDuringFocus={true}
                        />
                        {children}

                        <StepNav buttonText="Save and continue" to={nextRoute}/>
                    </Form>
                </article>
            </Layout>
        )
    }
}

ToolsForm.defaultProps = {
    tools: '',
    methodologies: ''
}

const mapStateToProps = (state) => {
    return {
        ...formProps(state, 'toolsForm')
    }
}

export {
    mapStateToProps,
    ToolsForm as Form
}

export default connect(mapStateToProps)(ToolsForm);
