import React from 'react';
import {connect} from 'react-redux';
import { Form } from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import Textarea     from '../../../../shared/form/Textarea';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';


class ToolsForm extends BaseForm {

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
                        <fieldset>

                            <legend>To help buyers understand your how you work and get a sense of your culture, please share your main tools and methodologies.</legend>

                            <Textarea
                                model={`${model}.tools`}
                                name="tools"
                                id="tools"
                                controlProps={{limit: 50}}
                                label="Tools"
                                description="What tools do you use on a day-to-day basis. For example Jira, Basecamp, Digital Service Standard, Retros, Sharpies."

                            />

                            <Textarea
                                model={`${model}.methodologies`}
                                name="methodologies"
                                id="methodologies"
                                controlProps={{limit: 50}}
                                label="Methodologies"
                                description="What methodologies form the core of your practice. For example, Kanban, lean, scaled agile (SAFe)."

                            />
                        </fieldset>
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
