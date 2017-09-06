import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BriefResponseForm from './BriefResponseForm'
import { loadBrief } from '../../actions/briefActions'

export class BriefResponse extends Component {
  componentDidMount() {
    const briefId = this.props.match.params.brief_id
    this.props.loadBriefData(briefId)
  }

  render() {
    const { loadBriefSuccess, loadBriefErrored } = this.props

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

BriefResponse.defaultProps = {
  loadBriefSuccess: false,
  loadBriefErrored: false
}

BriefResponse.propTypes = {
  loadBriefSuccess: PropTypes.bool,
  loadBriefErrored: PropTypes.bool,
  loadBriefData: PropTypes.func.isRequired
}

const mapStateToProps = ({ brief }) => ({
  isLoading: brief.isLoading,
  loadBriefSuccess: brief.loadBriefSuccess,
  loadBriefErrored: brief.loadBriefErrored,
  brief: brief.brief
})

const mapDispatchToProps = dispatch => ({
  loadBriefData: briefId => {
    dispatch(loadBrief(briefId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BriefResponse)
