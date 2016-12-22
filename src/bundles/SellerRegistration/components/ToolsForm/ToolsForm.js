import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';

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
        const {action, csrf_token, model, form, title, children, onSubmit} = this.props;
        return (
            <Layout>
                <header>
                    <h1 tabIndex="-1">Tools and methodologies</h1>
                    <p>To help buyers understand your how you work and get a sense of your culture, please share your
                        main tools and methodologies.</p>
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
                            description="What tools do you use on a day-to-day basis? For example Jira, Basecamp, Digital Service Standard, Sharpies."

                        />

                        <Textarea
                            model={`${model}.methodologies`}
                            name="methodologies"
                            id="methodologies"
                            controlProps={{limit: 200}}
                            label="Methodologies"
                            description="What methodologies form the core of your practice? For example, Kanban, lean, scaled agile (SAFe)."

                        />

                        <Textarea
                            model={`${model}.technologies`}
                            name="technologies"
                            id="technologies"
                            controlProps={{limit: 200}}
                            label="Technologies (optional)"
                            description="What technologies do you typically use as part of your products and services? For example, Python, Drupal, React, .net, Java, Ruby on Rails"

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
