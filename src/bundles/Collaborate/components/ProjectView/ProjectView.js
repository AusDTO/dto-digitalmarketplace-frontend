import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {newline} from '../../../../helpers';

import './ProjectView.css'

class ProjectView extends React.Component {
    state = {showConfirm: false}

    toggleConfirm(show = true) {
        this.setState({
            showConfirm: show
        }, () => this.state.showConfirm && this.refs.confirm.focus());
    }

    render() {
        const {
            title,
            opportunity,
            client,
            contact_email,
            problem,
            aim,
            users,
            validation,
            success,
            outcome,
            lessons,
            project_links,
            partner_links,
            pilot_activities,
            about,
            stage,
            summary,
            meta,
            confirmButton = null,
            returnLink = null
        } = this.props;

        const {showConfirm} = this.state;

        return (
            <div>
        <section styleName="full-header">
            <div className="row">
                <div className="col-xs-12">
                    <h1 tabIndex="-1">{title}</h1>
                </div>
            </div>
            <div className="row">
                <article className="col-xs-12 col-md-8 col-sm-7">

                            <p styleName="summary">{summary}</p>
                    <p><strong>Project stage</strong> {stage}</p>

                    {partner_links && Object.keys(partner_links).length > 0 && (
                        <p><strong>Partnering with </strong>
                                {Object.keys(partner_links).map((item, i) =>
                                    <a key={i}className="project__links" href={partner_links[item]} rel="external"
                                       target="_blank">{item}</a>
                                )}
                            </p>
                    )}
                </article>
                <article className="col-xs-12 col-sm-8 col-sm-push-1 col-md-3 col-md-push-1">

                    <div styleName="tile" style={{backgroundColor: "white"}}>
                        <span>Council</span>
                        <b>{client}</b>

                        <a href={`mailto:${contact_email}`} role="button">Email contact</a>
                    </div>
                    {meta && false && (
                        <span className="actions">
                  <a href={meta.editLink}>Edit project</a>
                  <button className="button-secondary" onClick={this.toggleConfirm.bind(this)}>Delete</button>
                </span>
                    )}
                </article>

            </div>

        </section>
            <section id="project__ProjectView" styleName="center">
                {showConfirm && (
                    <div ref="confirm" className="callout--warn" aria-labelledby="callout--success__heading"
                         tabIndex="-1" role="alert">
                        <p id="callout--success__heading">Are you sure you want to delete this case study?</p>
                        <a href={meta.deleteLink} role="button">Delete this case study</a>
                        <button className="button-secondary" onClick={this.toggleConfirm.bind(this, false)}>No, keep
                            this case study
                        </button>
                    </div>
                )}

                <div className="row">
                    <aside className="col-sm-3 col-xs-12">



                    </aside>
                    <article role="main" className="col-sm-7 col-xs-12">
                        {aim && <section>
                            <h2>Aim</h2>
                            <p className="freetext">{newline(aim)}</p>
                        </section>}
                        {opportunity && <section>
                            <h2>Why is the work being done?</h2>
                            <p className="freetext">{newline(opportunity)}</p>
                        </section>}
                        {pilot_activities && <section>
                            <h2>About the pilot</h2>
                            <p className="freetext">{newline(pilot_activities)}</p>
                        </section>}
                        {about && <section>
                            <h2>About the build</h2>
                            <p className="freetext">{newline(about)}</p>
                        </section>}
                        {problem && <section>
                            <h2>What's the key problem to solve?</h2>
                            <p className="freetext">{newline(problem)}</p>
                        </section>}
                        { users && <section>
                            <h2>Who are the users and their needs?</h2>
                            <p className="freetext">{newline(users)}</p>
                        </section>}
                        { validation && (<section>
                            <h2>What do you need to validate the idea? - Do you have the abilty to validate this idea?
                                If not, what do you need?</h2>
                            <p className="freetext">{newline(validation)}</p>
                        </section>) }
                        {success && (<section>
                            <h2>How would you measure the success?</h2>
                            <p className="freetext">{newline(success)}</p>
                        </section>)}
                        {outcome && (<section>
                            <h2>Outcomes</h2>
                            <ul>
                                {outcome && outcome.map((content, i) => <li key={i}>{content}</li>)}
                            </ul>
                        </section>)}
                        {lessons && (<section>
                            <h2>Lessons learned</h2>
                            <ul>
                                {lessons && lessons.map((content, i) => <li key={i}>{content}</li>)}
                            </ul>
                        </section>)}
                        {project_links && Object.keys(project_links).length > 0 && (
                            <section className="project">
                                <h2>Project Links</h2>
                                <ul>
                                    {Object.keys(project_links).map((item, i) => <li key={i}>
                                        <a className="project__links" href={project_links[item]} rel="external"
                                           target="_blank">{item}</a>
                                    </li>)}
                                </ul>
                            </section>
                        )}
                        <div className="project__actions">
                            {confirmButton}
                            {returnLink}
                        </div>
                    </article>

                </div>
            </section>
            </div>
        )
    }
}

ProjectView.propTypes = {
    title: PropTypes.string.isRequired,
    opportunity: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    contact_email: PropTypes.string.isRequired,
    partner_name: PropTypes.string.isRequired,
    partner_url:  PropTypes.string.isRequired,
    stage: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    pilot_activities: PropTypes.string.isRequired,
    aim: PropTypes.string.isRequired,
    problem: PropTypes.string.isRequired,
    users: PropTypes.string.isRequired,
    timeframe: PropTypes.string.isRequired,
    outcome: PropTypes.arrayOf(PropTypes.string).isRequired,
    lessons: PropTypes.arrayOf(PropTypes.string).isRequired,
    project_links: PropTypes.objectOf(PropTypes.string),
    partner_links: PropTypes.objectOf(PropTypes.string),
    meta: PropTypes.objectOf(PropTypes.string),

    returnLink: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.project,
        ...ownProps
    }
}

export default connect(mapStateToProps)(ProjectView)
