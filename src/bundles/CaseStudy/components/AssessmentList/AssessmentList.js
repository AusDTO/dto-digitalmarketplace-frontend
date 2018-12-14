import React from 'react'
import { connect } from 'react-redux'
import { updateCaseStudyStatus } from '../../redux/modules/casestudies'

import './AssessmentList.css'

class AssessmentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      msg: '',
      updated: false,
      responseModalOpen: false
    }
  }
  toggleModal(application_id, msg) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      application_id: application_id || null,
      msg: msg
    })
  }

  toggleResponseModal() {
    this.setState({
      responseModalOpen: !this.state.responseModalOpen
    })
  }
  render() {
    const { 
      casestudies,
      onApproveClick,
      onRejectClick
    } = this.props

    return (
      <div>
        <input id="keyword" type="text" size="30" placeholder="id or name"/>
        <hr/>
      { 
        casestudies.map((cs, i) =>
        <div>
          <div className="row">
            <div className="col-md-2"><b>supplier</b></div>
            <div className="col-md-4"><b>title</b></div>
            <div className="col-md-2"><b>domain</b></div>
            <div className="col-md-2"><b>assessments</b></div>
            <div className="col-md-2"><b>case study status</b></div>
          </div>
          <span key={cs.id}>
            <div className="row">
              <div className="col-md-2">{cs.name}(#{cs.supplier_code})</div>
              <div className="col-md-4"><a href={`casestudy-assessment/${cs.id}`}>{cs.data.title}(#{cs.id})</a></div>
              <div className="col-md-2">{cs.data.service}</div>
              <div className="col-md-2">{cs.assessment_count}</div>
              <div className="col-md-2">
                {cs.status}
                <br/>
                <a href="#" onClick={e => {
                  e.preventDefault();
                  onApproveClick(cs.id);
                }} name="approve">approve</a>
                {' '}
                <a href="#" onClick={e => {
                  e.preventDefault();
                  onRejectClick(cs.id);
                }} name="reject">reject</a>
              </div>
            </div>
            <div className="row">
              <div>
                <div className="col-md-2"><b>assessors</b></div>
                <div className="col-md-4"><b>comment</b></div>
                <div className="col-md-4"><b>criterias met</b></div>
                <div className="col-md-2"><b>result</b></div>
              </div>
            </div>
            {cs.assessment_count > 0 ? cs.assessment_results.map(ar =>
              <div key={ar.id} className="row">
                <div className="col-md-2">{ar.username}</div>
                <div className="col-md-4">{ar.comment}</div>
                <div className="col-md-4">
                {ar.criterias_met.map(cm =>
                  <div key={`${ar.id}-${cm.domain_criteria_id}`} styleName="tooltip">
                    {`${cm.domain_criteria_id}`}
                    <div styleName="tooltiptext">{cm.domain_criteria}</div>
                  </div>
                )}
                </div>
                <div className="col-md-2">{ar.status}</div>
              </div>
            ) : <i>no assessments</i>}
            <hr/>
          </span>
        </div>
      )}
      </div>
    )
  }
}

const mapStateToProps = ({ meta, casestudies }) => {
  return {
    meta,
    casestudies,
    onApproveClick: () => {},
    onRejectClick: () => {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onApproveClick: (id) => {
      dispatch(updateCaseStudyStatus(id, 'approved'))
    },
    onRejectClick: (id) => {
      dispatch(updateCaseStudyStatus(id, 'rejected'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentList)
