import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import './View.css'

const View = ({ title, opportunity, client, approach, timeframe, outcome, projectLinks, meta }) => (
  <section>
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
              <a href={meta.deleteLink}>Delete case study</a>
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
        {projectLinks && (
          <section className="project">
            <h3>Project Links</h3>
            <ul>
              {projectLinks.map((item, i) => <li key={i}><a className="project__links" href={item} rel="external">{item}</a></li>)}
            </ul>
          </section>
        )}
      </article>
    </div>
  </section>
)


View.propTypes = {
  title: PropTypes.string.isRequired,
  opportunity: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  approach: PropTypes.string.isRequired,
  timeframe: PropTypes.string.isRequired,
  outcome: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectLinks: PropTypes.arrayOf(PropTypes.string),
  meta: PropTypes.objectOf(PropTypes.string),
}

const mapStateToProps = (state) => {
  return {
    ...state.casestudy
  }
}

export default connect(mapStateToProps)(View)
