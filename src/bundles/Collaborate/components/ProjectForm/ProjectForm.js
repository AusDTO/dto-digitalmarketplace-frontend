import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Form, Control} from 'react-redux-form';
import DocumentTitle from 'react-document-title'

import {required, validEmail} from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import StatefulError from '../../../../shared/form/StatefulError';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import MultiInput    from '../../../../shared/form/MultiInput';
import LinkInput     from '../../../../shared/form/LinkInput';
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
        action: PropTypes.string,
        form: PropTypes.object.isRequired,
        model: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]).isRequired,

        formErrors: PropTypes.object,
        returnLink: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        mode: PropTypes.oneOf(['add', 'edit']),
        csrf_token: PropTypes.string,
        serverRender: PropTypes.bool
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
            buttonText = mode === 'edit' ? 'Save Changes' : 'Submit Project';
        }


        let stage_name = 'project';
        if (this.state.stage !== undefined) {
            if (this.state.stage === 'Live') {
                stage_name = 'launch';
            } else if (this.state.stage === 'In build'){
                stage_name = 'build';
            } else {
                stage_name = this.state.stage.toLowerCase();
            }
        }


        return (
            <Layout>
                <header id="content">
                  <DocumentTitle title="Add a project - Digital Marketplace">
                    <h1 tabIndex="-1" ref="header"
                        >{mode === 'edit' ? 'Edit' : 'Add a'} project</h1>
                  </DocumentTitle>
                    <p>Share ideas for collaboration, or lessons learned building smarter communities and digital
                        services. Projects will be added to the new collaboration area on the Marketplace in the coming
                        weeks.</p>

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
                            label="Which local, state or federal government body is involved? "
                            validators={{required}}
                            messages={{
                                required: 'Government body is required',
                            }}/>


                        <fieldset>
                            <legend>What stage is the project at?</legend>

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
                            <label htmlFor="idea">Idea <p>You have a problem or opportunity to explore.</p>

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
                            <label htmlFor="discovery">Discovery <p>Researching user needs, understanding policy intent and technology constraints.</p>

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
                            <label htmlFor="pilot">Pilot <p>Prototyping and iterating solutions to explore how to meet your users’ needs. </p>

                            </label>

                            <Control.radio
                                model={`${model}.stage`}
                                onClick={this.onChangeState.bind(this)}
                                name="stage"
                                id="inBuild"
                                value="Build"
                                validators={{
                                    required
                                }}/>
                            <label htmlFor="inBuild">In Build <p>In the process of delivering a live implementation.</p>

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
                            <label htmlFor="live">Live <p>Teams and processes in place operating and improving the live service.</p>

                            </label>
                        </fieldset>


                        <Textfield
                            model={`${model}.service`}
                            name="service"
                            id="service"
                            htmlFor="service"
                            label="What service or activity does the project relate to?"
                            description="eg. Planning, Roads and Parking, Community Services, Waste Management"
                            validators={{required}}
                            messages={{
                                required: 'Service/activity is required',
                            }}/>
                        { this.state.stage !== 'Idea' && <Textarea
                            model={`${model}.aim`}
                            name="aim"
                            id="aim"
                            controlProps={{limit: 200}}
                            label="Why is the work being done?"
                            description="Describe the project goal and any relevant background information."
                            messages={{
                                required: 'You must outline the aim'
                            }}
                            validators={{required}}
                        /> }
                        { (this.state.stage === 'Idea' || this.state.stage === 'Discovery') && (<div>

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
                        </div>)}
                        { this.state.stage === 'Idea' && <Textarea
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
                        /> }


                        { this.state.stage !== 'Idea' && (<div>
                            <Textarea
                                model={`${model}.about`}
                                name="about"
                                id="about"
                                controlProps={{limit: 200}}
                                label={"What " + stage_name + " activities are you doing / did you do?"}
                                description=""
                                messages={{
                                    required: 'You must outline about the ' + stage_name
                                }}
                                validators={{required}}
                            />
                            <MultiInput
                                id="lessons"
                                model={`${model}.lessons`}
                                name="lessons"
                                htmlFor="lessons"
                                label="Lessons learned"
                                controlProps={{defaultRows: 2}}
                                description="What advice would you give others considering this type of project? Did anything made you pivot or adjust course?"
                            />
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
                        </div>)}

                        <StatefulError
                            model={`${model}.partner_links`}
                            id="partner_links"
                            messages={{
                                "partner_links": "Each partner link title needs a corresponding URL"
                            }}
                        />
                        <LinkInput
                            id="partner_links"
                            model={`${model}.partner_links`}
                            name="partner_links"
                            htmlFor="partner_links"
                            label="Partner links (optional)"
                            controlProps={{defaultRows: 2}}
                            description="Link to any supporting material or partner website. Links must begin with http"
                        />
                        <StatefulError
                            model={`${model}.project_links`}
                            id="project_links"
                            messages={{
                                "project_links": "Each project link title needs a corresponding URL"
                            }}
                        />
                        <LinkInput
                            id="project_links"
                            model={`${model}.project_links`}
                            name="project_links"
                            htmlFor="project_links"
                            label="Project links (optional)"
                            controlProps={{defaultRows: 2}}
                            description="Link to support material, such as research, project documents, open data sets, video or website urls. Links must begin with http"
                        />

                        <h2>Project Contact</h2>

                        <Textfield
                            model={`${model}.contact_name`}
                            name="contact_name"
                            id="contactName"
                            htmlFor="contactName"
                            label="Contact's name"
                            description="The full name of the best person to contact."
                            validators={{required}}
                            messages={{required: 'Please provide a contact name.'}}
                        />

                        <Textfield
                            model={`${model}.contact_email`}
                            name="contact_email"
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
                                name="contact_agreed"
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
