import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import './View.css'

const View = ({ title, company, timeframe, links = {}, sections = [] }) => (
  <section>
    <header className="row">
      <div className="col-md-12">
        <h2>{title}</h2>
      </div>

      <div className="meta col-md-12">
        <div className="row">
          <div className="col-sm-12 col-md-7">
            <small>{company}</small>
          </div>
          <div className="col-sm-12 col-md-5 actions">
            <a href={links.edit}>Edit case study</a>
            <a href={links.delete}>Delete case study</a>
          </div>
        </div>
      </div>
    </header>
    <aside className="sidebar">
      <h4>Timeframe</h4>
      <p>{timeframe}</p>
    </aside>
    <article role="main" className="content-main row">
      <div className="col-md-8 col-sm-12">
        {sections.map(({ title, content, items }, i) => (
          <section key={i}>
            <h3>{title}</h3>
            {content ? (
              <p>{content}</p>
            ) : (
              <ul>
              {items.map((item, i) => (
                <li key={i}>{item.match(/http|www|\.com/) ? (
                  <a href={item} rel="external">{item}</a>
                ) : item}</li>
              ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  </section>
)


View.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  timeframe: PropTypes.string.isRequired,
  links: PropTypes.objectOf(PropTypes.string).isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    items: PropTypes.array
  }))
}

const mapStateToProps = (state) => {
  return {
    ...state.casestudy
  }
}

export default connect(mapStateToProps)(View)
