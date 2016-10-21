import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import './View.css'

const View = ({ title, opportunity, client, approach, timeframe, outcome, projectLinks, meta }) => (
  <section>
    <header className="row">
      <div className="col-md-12">
        <h2>{title}</h2>
      </div>

      <div className="meta col-md-12">
        <div className="row">
          <div className="col-sm-12 col-md-7">
            <small>{client}</small>
          </div>
          {meta && (
            <div className="col-sm-12 col-md-5 actions">
              <a href={meta.editLink}>Edit case study</a>
              <a href={meta.deleteLink}>Delete case study</a>
            </div>
          )}
        </div>
      </div>
    </header>
    <aside className="sidebar">
      <h4>Timeframe</h4>
      <p>{timeframe}</p>
    </aside>
    <article role="main" className="content-main row">
      <div className="col-md-8 col-sm-12">
        <section>
          <h3>Objective</h3>
          <p>{opportunity}</p>
        </section>
        <section>
          <h3>Approach</h3>
          <p>{approach}</p>
        </section>
        <section>
          <h3>Outcomes and benefits</h3>
          <ul>
            {outcome.map((content, i) => <li key={i}>{content}</li>)}
          </ul>
        </section>
        <section>
          <h3>Visit the product</h3>
          {projectLinks.map((item, i) => <a href={item} key={i} rel="external">{item}</a>)}
        </section>
      </div>
    </article>
  </section>
)


View.propTypes = {
  title: PropTypes.string.isRequired,
  opportunity: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  approach: PropTypes.string.isRequired,
  timeframe: PropTypes.string.isRequired,
  outcome: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
  meta: PropTypes.objectOf(PropTypes.string),
}

const mapStateToProps = (state) => {
  return {
    ...state.casestudy
  }
}

export default connect(mapStateToProps)(View)
