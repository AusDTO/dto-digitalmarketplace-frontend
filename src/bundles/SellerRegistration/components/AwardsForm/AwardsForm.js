import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';

import Layout from '../../../../shared/Layout';

import BaseForm     from '../../../../shared/form/BaseForm';
import SubmitForm   from '../../../../shared/form/SubmitForm';
import ErrorBox     from '../../../../shared/form/ErrorBox';
import MultiInput    from '../../../../shared/form/MultiInput';
import formProps    from '../../../../shared/reduxModules/formPropsSelector';


class AwardsForm extends BaseForm {

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
                    <h1 tabIndex="-1">Awards and accreditations</h1>
                    <p>This is your opportunity to share some of the things you’re proud of.
                        All questions are optional but powerful for helping your business attract potential buyers. </p>

                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={model}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="Awards__create"
                          valid={form.valid}
                          component={SubmitForm}
                          onCustomSubmit={onSubmit}
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
                        />

                        <MultiInput
                            id="boards"
                            model={`${model}.boards`}
                            name="boards"
                            htmlFor="boards"
                            label="Industry engagement (optional)"
                            controlProps={{defaultRows: 2}}
                            description="Are you involved in any boards, committees or groups for your industry?"
                        />

                        <MultiInput
                            id="awards"
                            model={`${model}.awards`}
                            name="awards"
                            htmlFor="awards"
                            label="Awards (optional)"
                            controlProps={{defaultRows: 2}}
                            description="Has your work been recognised and awarded within your industry or by others?"

                        />

                        {children}

                        <input type="submit" value="Save and continue" role="button"/>
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
        ...formProps(state, 'awardsForm')
    }
}

export {
    mapStateToProps,
    AwardsForm as Form
}

export default connect(mapStateToProps)(AwardsForm);
