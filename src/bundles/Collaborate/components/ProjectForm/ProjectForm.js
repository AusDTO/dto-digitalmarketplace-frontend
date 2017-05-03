import React from 'react';
import {connect} from 'react-redux';
import {Form, Control} from 'react-redux-form';


import {required, validLinks, validEmail} from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import StatefulError from '../../../../shared/form/StatefulError';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import MultiInput    from '../../../../shared/form/MultiInput';
import Textarea      from '../../../../shared/form/Textarea';
import Textfield     from '../../../../shared/form/Textfield';

import formProps    from '../../../../shared/reduxModules/formPropsSelector';

class ProjectForm extends BaseForm {

    state = {
        stage: ""
    }

    constructor(props) {
        super(props);
        this.state = {
            showField: props.stage || ""
        }
    }

    onChangeState(e) {
        this.setState({
            stage: e.target.value
        })
    }

    static propTypes = {
        action: React.PropTypes.string,
        form: React.PropTypes.object.isRequired,
        model: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.func
        ]).isRequired,

        formErrors: React.PropTypes.object,
        returnLink: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object
        ]),
        mode: React.PropTypes.oneOf(['add', 'edit']),
        csrf_token: React.PropTypes.string,
        serverRender: React.PropTypes.bool
    }

    render() {
        let {
            action,
            csrf_token,
            model,
            returnLink = null,
            mode,
            form,
            buttonText,
            children,
            onSubmit,
            onSubmitFailed
        } = this.props;

        if (!buttonText) {
            buttonText = mode === 'edit' ? 'Save Changes' : 'Publish Project';
        }

        return (
            <Layout>
                <header>

                    <h1 tabIndex="-1" ref="header"
                        aria-describedby="header-description">{mode === 'edit' ? 'Edit' : 'Add'} project</h1>

                </header>
                <article role="main">
                    <ErrorBox focusOnMount={true} model={model}/>
                    <Form model={model}
                          action={action}
                          method="post"
                          id="Project__create"
                          component={SubmitForm}
                          valid={form.valid}
                          onCustomSubmit={onSubmit}
                          onSubmitFailed={onSubmitFailed}
                    >

                        {csrf_token && (
                            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>
                        )}

                        <Textfield
                            model={`${model}.title`}
                            name="title"
                            id="title"
                            htmlFor="title"
                            label="Give your project a title"
                            validators={{required}}
                            messages={{
                                required: 'Title is required',
                            }}
                        />

                        <Textarea
                            model={`${model}.summary`}
                            name="summary"
                            id="summary"
                            controlProps={{limit: 40}}
                            label="Summary"
                            description="A brief overview of the project"
                            messages={{
                                required: 'You must outline the project summary'
                            }}
                            validators={{required}}
                        />


                        <Textfield
                            model={`${model}.client`}
                            name="client"
                            id="client"
                            htmlFor="client"
                            label="Which council was involved?"
                            validators={{required}}
                            messages={{
                                required: 'Council is required',
                            }}/>


                        <fieldset>
                            <legend>Project stage?</legend>


                            <StatefulError
                                model={`${model}.stage`}
                                id="discovery"
                                messages={{
                                    required: 'You must provide project stage'
                                }}
                            />
                            <Control.radio
                                model={`${model}.stage`}
                                onClick={this.onChangeState.bind(this)}
                                name="stage"
                                id="idea"
                                value="Idea"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="idea">Idea

                            </label>
                            <Control.radio
                                model={`${model}.stage`}
                                onClick={this.onChangeState.bind(this)}
                                name="stage"
                                id="discovery"
                                value="Discovery"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="discovery">Discovery

                            </label>
                            <Control.radio
                                model={`${model}.stage`}
                                onClick={this.onChangeState.bind(this)}
                                name="stage"
                                id="pilot"
                                value="Pilot"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="pilot">Pilot

                            </label>

                            <Control.radio
                                model={`${model}.stage`}
                                onClick={this.onChangeState.bind(this)}
                                name="stage"
                                id="inBuild"
                                value="In Build"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="inBuild">In Build

                            </label>

                            <Control.radio
                                model={`${model}.stage`}
                                onClick={this.onChangeState.bind(this)}
                                name="stage"
                                id="live"
                                value="Live"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="live">Live

                            </label>
                        </fieldset>


                        <Textfield
                            model={`${model}.service`}
                            name="service"
                            id="service"
                            htmlFor="service"
                            label="What council activity does it relate to?"
                            description="eg. Planning, Roads and Parking, Community Services, Waste Management"
                            validators={{required}}
                            messages={{
                                required: 'Council activity is required',
                            }}/>

                        <Textarea
                            model={`${model}.opportunity`}
                            name="opportunity"
                            id="opportunity"
                            controlProps={{limit: 200}}
                            label="Why is the work being done? What is the opportunity?"
                            description="Describe the project goal and any relevant background information."
                            messages={{
                                required: 'You must outline the opportunity'
                            }}
                            validators={{required}}
                        />
                        { this.state.stage == 'Idea' && (<div>
                        <Textarea
                            model={`${model}.problem`}
                            name="problem"
                            id="problem"
                            controlProps={{limit: 200}}
                            label="What's the key problem you need to solve?"
                            description=""
                            messages={{
                                required: 'You must outline the key problem'
                            }}
                            validators={{required}}
                        />

                        <Textarea
                            model={`${model}.users`}
                            name="users"
                            id="users"
                            controlProps={{limit: 200}}
                            label="Who are the users and their needs?"
                            description=""
                            messages={{
                                required: 'You must outline the key users'
                            }}
                            validators={{required}}
                        />

                        <Textarea
                            model={`${model}.progress`}
                            name="progress"
                            id="progress"
                            controlProps={{limit: 200}}
                            label="What do you need to progress the idea further?"
                            description=""
                            messages={{
                                required: 'You must outline what you need to progress the idea'
                            }}
                            validators={{required}}
                        /></div>) }

                        <MultiInput
                            id="outcome"
                            model={`${model}.outcome`}
                            name="outcome"
                            htmlFor="outcome"
                            label="What was the outcome?"
                            controlProps={{defaultRows: 2}}
                            description="List the key achievements of this project."
                            messages={{required: 'You must provide at least one outcome.'}}
                            validators={{required}}
                        />

                        <MultiInput
                            id="partner_links"
                            model={`${model}.partner_links`}
                            name="partner_links"
                            htmlFor="partner_links"
                            label="Partner links (optional)"
                            controlProps={{defaultRows: 2}}
                            description="Link to any supporting material for your partner. This can include a partner on your website, partner video or the live partner. Links must begin with http"
                            messages={{validLinks: 'Links must begin with \'http\''}}
                            validators={{validLinks}}
                        />

                        <MultiInput
                            id="project_links"
                            model={`${model}.project_links`}
                            name="project_links"
                            htmlFor="project_links"
                            label="Project links (optional)"
                            controlProps={{defaultRows: 2}}
                            description="Link to any supporting material for your project. This can include a project on your website, project video or the live project. Links must begin with http"
                            messages={{validLinks: 'Links must begin with \'http\''}}
                            validators={{validLinks}}
                        />

                        <h3>Project Contact</h3>

                        <Textfield
                            model={`${model}.contact_name`}
                            name="contactName"
                            id="contactName"
                            htmlFor="contactName"
                            label="Contact's name"
                            description="The full name of the best person to contact."
                            validators={{required}}
                            messages={{required: 'Please provide a contact name.'}}
                        />

                        <Textfield
                            model={`${model}.contact_email`}
                            name="contactEmail"
                            id="contactEmail"
                            htmlFor="contactEmail"
                            label="Project contact email"
                            validators={{required, validEmail}}
                            messages={{
                                required: 'Please provide a contact email address.',
                                validEmail: 'Contact email address must be valid'
                            }}
                        />

                        <div>
                            <StatefulError
                                model={`${model}.contact_agreed`}
                                id="contactAgreed"
                                messages={{
                                    required: 'Please acknowledge the contact point.'
                                }}
                            />
                            <Control.checkbox
                                model={`${model}.contact_agreed`}
                                id="contactAgreed"
                                name="contactAgreed"
                                validators={{required}}
                            />
                            <label htmlFor="contactAgreed">I confirm this person gives permission to be contacted and
                                approve the use of this information being made public on the Digital Marketplace.
                            </label>
                        </div>


                        {children}

                        <input type="submit" value={buttonText}/>
                    </Form>
                    {returnLink}
                </article>
            </Layout>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {Project = {}} = state;
    let formName = ownProps.formName;
    return {
        returnLink: Project.returnLink,
        ...formProps(state, formName || 'projectForm'),
        ...ownProps
    }
}

export {
    mapStateToProps,
    ProjectForm as Form
}

export default connect(mapStateToProps)(ProjectForm);
