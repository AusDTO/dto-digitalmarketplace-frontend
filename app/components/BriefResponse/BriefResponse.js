import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BriefResponseForm from './BriefResponseForm'
import { loadBrief } from '../../actions/briefActions'

export class BriefResponse extends Component {
  componentDidMount() {
    let brief_id = this.props.match.params.brief_id
    this.props.loadBriefData(brief_id)
  }

  render() {
    let { loadBriefSuccess, loadBriefErrored } = this.props

    return (
      <div className="row">
        <div className="col-sm-8 col-xs-12">
          {loadBriefSuccess &&
            <div>
              <BriefResponseForm />
            </div>}
          {loadBriefErrored && <div>error loading brief details</div>}
        </div>
      </div>
    )
  }
}

BriefResponse.propTypes = {
  loadBriefSuccess: PropTypes.bool,
  loadBriefErrored: PropTypes.bool,
  loadBriefData: PropTypes.func.isRequired
}

const mapStateToProps = ({ brief }) => {
  return {
    isLoading: brief.isLoading,
    loadBriefSuccess: brief.loadBriefSuccess,
    loadBriefErrored: brief.loadBriefErrored,
    brief: brief.brief
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBriefData: brief_id => {
      dispatch(loadBrief(brief_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BriefResponse)
