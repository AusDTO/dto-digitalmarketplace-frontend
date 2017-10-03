import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isEmpty from 'lodash/isEmpty';

import { newline } from '../../../../helpers';

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
      <section id="casestudy__view">
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
                <p>by {supplier_url ? <a href={supplier_url}>{supplier_name}</a> : supplier_name}</p>
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
          <aside className="col-sm-3 col-xs-12">
            <h4>Client</h4>
            <p>{client}</p>

            <h4>Timeframe</h4>
            <p>{timeframe}</p>

            <h4>Area of expertise</h4>
            <p>{service}</p>

            <h4>Responsible for</h4>
            <p>{roles}</p>
          </aside>
          <article role="main" className="col-sm-7 col-xs-12">
            <section>
              <h2>Challenge</h2>
              <p className="freetext">{newline(opportunity)}</p>
            </section>
            <section>
              <h2>Approach</h2>
              <p className="freetext">{newline(approach)}</p>
            </section>
            <section>
              <h2>Outcomes and benefits</h2>
              <ul>
                {outcome && outcome.map((content, i) => <li key={i}>{content}</li>)}
              </ul>
            </section>
            {project_links && project_links.length > 0 && (
              <section className="project">
                <h2>Project Links</h2>
                <ul>
                  {project_links.map((item, i) => <li key={i}>
                      {typeof item == 'object' ?
                          <a className="project__links" href={item.url} rel="external" target="_blank">{isEmpty(item.title) ? item.url : item.title}</a>
                          :
                          <a className="project__links" href={item} rel="external" target="_blank">{item}</a>
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
