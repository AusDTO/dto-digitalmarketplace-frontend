import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { initList } from '../../redux/modules/casestudies'

class CaseStudyList extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(initList())
  }

  render() {
    const { studies } = this.props
    return (
      <section>
        <ul>
          {studies.map(({link, title}, i) => (
            <li key={i}>
              <a href={link} target="_blank" rel="external">{title}</a>
            </li>
          ))}
        </ul>
        <Link to="/add">{({onClick, href}) => (
            <a href={href} onClick={onClick} role="button">
              {studies.length > 0 ? 'Add more' : 'Add case study'}
            </a>
          )}
        </Link>
      </section>
    )
  }
}

CaseStudyList.propTypes = {
  studies: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string
  })).isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = ({ casestudies }) => {
  const { studies = [] } = casestudies
  return {
    studies
  }
}

export default connect(mapStateToProps)(CaseStudyList)
