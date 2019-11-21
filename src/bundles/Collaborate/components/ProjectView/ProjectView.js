import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DocumentTitle from 'react-document-title'

import isEmpty from 'lodash/isEmpty';

import {newline} from '../../../../helpers';

import './ProjectView.css'

class ProjectView extends React.Component {
    state = {showConfirm: false}

    toggleConfirm(show = true) {
        this.setState({
            showConfirm: show
        }, () => showConfirm && this.refs.confirm.focus());
    }

    render() {
        const {
            title,
            aim,
            client,
            contact_email,
            problem,
            users,
            progress,
            outcome,
            lessons,
            project_links,
            partner_links,
            about,
            stage,
            summary,
            meta,
            confirmButton = null,
            returnLink = null
        } = this.props;

        const {showConfirm} = this.state;

        let stage_name = 'project';
        if (stage !== undefined) {
            if (stage === 'Live') {
                stage_name = 'launch';
            } else if (stage === 'In build'){
                stage_name = 'build';
            } else {
                stage_name = stage.toLowerCase();
            }
        }

        return (
            <div>
        <section styleName="full-header">
            <div className="row">
                <div className="col-xs-12">
                  <DocumentTitle title={`${title} - Digital Marketplace`}>
                    <h1 tabIndex="-1">{title}</h1>
                  </DocumentTitle>
                </div>
            </div>
            <div className="row">
                <article className="col-xs-12 col-md-8 col-sm-7">

                            <p styleName="summary">{summary}</p>
                    <p><strong>Project stage</strong> {stage}</p>

                    {partner_links && Object.keys(partner_links).length > 0 && (
                        <p><strong>Partnering with </strong>
                                {Object.values(partner_links).map((item, i) =>
                                    <a key={i} className="project__links" href={item.url} rel="external noopener noreferrer"
                                       target="_blank">{item.title}</a>
                                )}
                            </p>
                    )}
                </article>
                <article className="col-xs-12 col-sm-8 col-sm-push-1 col-md-3 col-md-push-1">

                    <div styleName="tile">
                        <span>Council</span>
                        <b>{client}</b>

                        <a href={`mailto:${contact_email}`} className="button">Email contact</a>
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
                        <a href={meta.deleteLink} className="button">Delete this case study</a>
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
                            <h2 className="au-display-lg">Aim</h2>
                            <p className="freetext">{newline(aim)}</p>
                        </section>}
                        {problem && <section>
                            <h2 className="au-display-lg">What's the key problem to solve?</h2>
                            <p className="freetext">{newline(problem)}</p>
                        </section>}
                        { users && <section>
                            <h2 className="au-display-lg">Who are the users and their needs?</h2>
                            <p className="freetext">{newline(users)}</p>
                        </section>}
                        { progress && <section>
                            <h2 className="au-display-lg">What do you need to progress the idea further?</h2>
                            <p className="freetext">{newline(progress)}</p>
                        </section>}
                        {about && <section>
                            <h2 className="au-display-lg">About the {stage_name}</h2>
                            <p className="freetext">{newline(about)}</p>
                        </section>}
                        {lessons && (<section>
                            <h2 className="au-display-lg">Lessons learned</h2>
                            <ul>
                                {lessons && lessons.map((content, i) => <li key={i}>{content}</li>)}
                            </ul>
                        </section>)}
                        {outcome && (<section>
                            <h2 className="au-display-lg">Outcomes</h2>
                            <ul>
                                {outcome && outcome.map((content, i) => <li key={i}>{content}</li>)}
                            </ul>
                        </section>)}
                        {project_links && Object.keys(project_links).length > 0 && (
                            <section className="project">
                                <h2 className="au-display-lg">Project Links</h2>
                                <ul>
                                    {project_links.map((item, i) => <li key={i}>
                                        {typeof item == 'object' ?
                                            <a className="project__links" href={item.url} rel="external noopener noreferrer" target="_blank">{isEmpty(item.title) ? item.url : item.title}</a>
                                            :
                                            <a className="project__links" href={item} rel="external noopener noreferrer" target="_blank">{item}</a>
                                        }
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
    aim: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    contact_email: PropTypes.string.isRequired,
    partner_name: PropTypes.string.isRequired,
    partner_url:  PropTypes.string.isRequired,
    stage: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
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
