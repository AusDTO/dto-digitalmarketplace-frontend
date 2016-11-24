import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import './View.css'

import hasReference from '../../redux/modules/hasReferenceSelector';

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
      approach,
      timeframe,
      outcome,
      projectLinks,
      meta,
      name,
      role,
      phone,
      email,
      hasReference
    } = this.props;
    const { showConfirm } = this.state;
    return (
      <section>
        {showConfirm && (
          <div ref="confirm" className="callout--warn" aria-labelledby="callout--success__heading" tabIndex="-1" role="alert">
              <p id="callout--success__heading">Are you sure you want to delete this case study?</p>
              <a href={meta.deleteLink} role="button">Delete this case study</a>
              <button className="button-secondary" onClick={this.toggleConfirm.bind(this, false)}>No, keep this case study</button>
          </div>
        )}
        <header className="row">
          <div className="col-xs-12">
            <h1>{title}</h1>
          </div>

          <div className="meta col-xs-12">
            <div className="row">
              <div className="col-xs-12 col-sm-7">
                <p>{client}</p>
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
            <h4>Timeframe</h4>
            <p>{timeframe}</p>
          </aside>
          <article role="main" className="col-sm-9 col-xs-12">
            <section>
              <h3>Challenge</h3>
              <p className="freetext">{opportunity}</p>
            </section>
            <section>
              <h3>Approach</h3>
              <p className="freetext">{approach}</p>
            </section>
            <section>
              <h3>Outcomes and benefits</h3>
              <ul>
                {outcome.map((content, i) => <li key={i}>{content}</li>)}
              </ul>
            </section>
            {projectLinks && projectLinks.length > 0 && (
              <section className="project">
                <h3>Project Links</h3>
                <ul>
                  {projectLinks.map((item, i) => <li key={i}><a className="project__links" href={item} rel="external">{item}</a></li>)}
                </ul>
              </section>
            )}
            {hasReference && (
              <section>
                <h3>Reference</h3>
                <div className="title-block">
                  {name && <p className="title-block__name">{name}</p>}
                  {role && <p className="title-block__role">{role}</p>}
                </div>
                {phone && (
                  <span>
                    <strong>Phone</strong>
                    <p>{phone}</p>
                  </span>
                )}
                {email && (
                  <span>
                    <strong>Email</strong>
                    <p>{email}</p>
                  </span>
                )}
              </section>
            )}
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
  projectLinks: PropTypes.arrayOf(PropTypes.string),
  meta: PropTypes.objectOf(PropTypes.string),

  name: PropTypes.string,
  role: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.casestudy,
    ...ownProps,
    hasReference: hasReference(state.casestudy, ['name', 'role', 'phone', 'email'])
  }
}

export default connect(mapStateToProps)(View)
