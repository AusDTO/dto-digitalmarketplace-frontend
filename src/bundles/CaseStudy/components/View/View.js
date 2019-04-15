import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isEmpty from 'lodash/isEmpty';

import { newline, validURL } from '../../../../helpers';

import view from './View.css'

class View extends React.Component {
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
      supplier_name,
      supplier_url = null,
      approach,
      timeframe,
      outcome,
      project_links,
      service,
      roles,
      meta,
      confirmButton = null,
      returnLink = null
    } = this.props;

    const { showConfirm } = this.state;

    return (
      <section id="casestudy__view" styleName="view.case-study-summary">
        {showConfirm && (
          <div ref="confirm" className="callout--warn" aria-labelledby="callout--success__heading" tabIndex="-1" role="alert">
              <p id="callout--success__heading">Are you sure you want to delete this case study?</p>
              <a href={meta.deleteLink} className="button">Delete this case study</a>
              <button className="button-secondary" onClick={this.toggleConfirm.bind(this, false)}>No, keep this case study</button>
          </div>
        )}
        <header className="row">
          <div className="col-xs-12">
            <h1 className="au-display-xl" tabIndex="-1">{title}</h1>
          </div>

          <div className="meta col-xs-12">
            <div className="row">
              <div className="col-xs-12 col-sm-7">
                <p>by {supplier_url && validURL(supplier_url) ? <a href={supplier_url}>{supplier_name}</a> : supplier_name}</p>
              </div>
              {meta && (
                <div className="col-xs-12 col-sm-5 actions">
                  <a href={meta.editLink}>Edit case study</a>
                  <button className="button-secondary" onClick={this.toggleConfirm.bind(this)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="row">
          <div styleName="view.case-study-content">
            <div styleName="view.case-study-sidebar">
              <aside className="col-sm-3 col-xs-12">
                <h3 className="au-display-md">Client</h3>
                <p>{client}</p>

                <h3 className="au-display-md">Timeframe</h3>
                <p>{timeframe}</p>

                <h3 className="au-display-md">Area of expertise</h3>
                <p>{service}</p>

                <h3 className="au-display-md">Responsible for</h3>
                <p>{roles}</p>
              </aside>
            </div>
            <article role="main" className="col-sm-7 col-xs-12">
              <section>
                <h2 className="au-display-md">Challenge</h2>
                <p className="freetext">{newline(opportunity)}</p>
              </section>
              <section>
                <h2 className="au-display-md">Approach</h2>
                <p className="freetext">{newline(approach)}</p>
              </section>
              <section>
                <h2 className="au-display-md">Outcomes and benefits</h2>
                <ul>
                  {outcome && outcome.map((content, i) => <li key={i}>{content}</li>)}
                </ul>
              </section>
              {project_links && project_links.length > 0 && (
                <section styleName="view.project">
                  <h2 className="au-display-md">Project Links</h2>
                  <ul>
                    {project_links.map((item, i) => <li key={i}>
                        {typeof item == 'object' ?
                            validURL(item.url) && <a className="project__links" href={item.url} rel="external" target="_blank">{isEmpty(item.title) ? item.url : item.title}</a>
                            :
                            validURL(item) && <a className="project__links" href={item} rel="external" target="_blank">{item}</a>
                        }
                    </li>)}
                  </ul>
                </section>
              )}
              <div className="casestudy__actions">
                {confirmButton}
                {returnLink}
              </div>
            </article>
          </div>
        </div>
      </section>
    )
  }
}

View.propTypes = {
  title: PropTypes.string.isRequired,
  opportunity: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
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
    ...state.casestudy,
    ...ownProps
  }
}

export default connect(mapStateToProps)(View)
