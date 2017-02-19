import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textarea     from '../../../../shared/form/Textarea';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';
import { required } from '../../../../validators';


class ToolsForm extends BaseForm {

    static propTypes = {
        action: React.PropTypes.string,
        csrf_token: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        returnLink: React.PropTypes.string
    }

    render() {
        const {action, csrf_token, model, form, children, onSubmit} = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">Tools and methodologies</h1>
                    <p>There’s lots of good reasons to share an insight into how you work.
                        If it’s relevant to an assessment for a new area of expertise, we may take a look.
                        Plus, it enriches your profile and gives buyers more ways to find you through keyword search. </p>
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
                            description="What technologies or programming languages do you typically use as part of your products and services?"
                        />
                        {children}

                        <input type="submit" value="Save and continue" role="button"/>
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