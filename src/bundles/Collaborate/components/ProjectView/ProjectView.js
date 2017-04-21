import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { newline } from '../../../../helpers';

import './ProjectView.css'

class ProjectView extends React.Component {
  state = { showConfirm: false }

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
      referee_name,
      referee_contact,
      supplier_name,
      supplier_url = null,
      approach,
      timeframe,
      outcome,
      project_links,
      service,
      stage,
      roles,
      meta,
      confirmButton = null,
      returnLink = null
    } = this.props;

    const { showConfirm } = this.state;

    return (
      <section id="project__ProjectView">
        {showConfirm && (
          <div ref="confirm" className="callout--warn" aria-labelledby="callout--success__heading" tabIndex="-1" role="alert">
              <p id="callout--success__heading">Are you sure you want to delete this case study?</p>
              <a href={meta.deleteLink} role="button">Delete this case study</a>
              <button className="button-secondary" onClick={this.toggleConfirm.bind(this, false)}>No, keep this case study</button>
          </div>
        )}
        <header className="row">
          <div className="col-xs-12">
            <h1 tabIndex="-1">{title}</h1>
          </div>

          <div className="meta col-xs-12">
            <div className="row">
              <div className="col-xs-12 col-sm-7">
                <p>by {client}</p>
              </div>
              {meta && false && (
                <div className="col-xs-12 col-sm-5 actions">
                  <a href={meta.editLink}>Edit project</a>
                  <button className="button-secondary" onClick={this.toggleConfirm.bind(this)}>Delete</button>
                </div>
              )}

            </div>
          </div>

        </header>
        <div className="row">

          <article role="main" className="col-sm-9 col-xs-12">

            <section>
              <h2>Council service</h2>
              <p className="freetext">{service}</p>
            </section>
            <section>
              <h2>Project Stage</h2>
              <p className="freetext">{stage}</p>
            </section>

            <section>
              <h2>Aim</h2>
              <p className="freetext">{newline(opportunity)}</p>
            </section>
            <section>
              <h2>How it ran</h2>
              <p className="freetext">{newline(approach)}</p>
            </section>

            <section>
              <h2>Outcomes and benefits</h2>
              <ul>
                {outcome.map((content, i) => <li key={i}>{content}</li>)}
              </ul>
            </section>
            {project_links && project_links.length > 0 && (
              <section className="project">
                <h2>Project Links</h2>
                <ul>
                  {project_links.map((item, i) => <li key={i}>
                    <a className="project__links" href={item} rel="external" target="_blank">{item}</a>
                  </li>)}
                </ul>
              </section>
            )}
            <div className="project__actions">
              {confirmButton}
              {returnLink}
            </div>
          </article>
          <aside className="col-sm-3 col-xs-12">


            <div styleName="tile">
              <span>{client}</span>
              <b>{referee_name}</b>

              <a href={`mailto:${referee_contact}`} role="button">Email organiser</a>
            </div>



          </aside>
        </div>
      </section>
    )
  }
}

ProjectView.propTypes = {
  title: PropTypes.string.isRequired,
  opportunity: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
    referee_name: PropTypes.string.isRequired,
    referee_contact: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  approach: PropTypes.string.isRequired,
  timeframe: PropTypes.string.isRequired,
  outcome: PropTypes.arrayOf(PropTypes.string).isRequired,
  project_links: PropTypes.arrayOf(PropTypes.string),
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
