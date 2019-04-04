import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { LocalForm, Control } from 'react-redux-form';
import { updateCaseStudyStatus, searchAssessments } from '../../redux/modules/casestudies'

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
  componentDidMount() {
    const { 
      meta,
      onLoad
    } = this.props
    if (meta.searched_supplier_code) {
      this.searchFieldRef.value = meta.searched_supplier_code
      onLoad(meta.searched_supplier_code)
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
      onRejectClick,
      onKeywordChange
    } = this.props

    return (
      <div>
        <input id="keyword" type="text" size="30" placeholder="Id or name" onChange={onKeywordChange} ref={ref => this.searchFieldRef = ref }/>
        <hr/>
      { 
        casestudies.map((cs, i) =>
        <div>
          <div className="row">
            <div className="col-md-2"><b>Supplier</b></div>
            <div className="col-md-4"><b>Title</b></div>
            <div className="col-md-2"><b>Domain</b></div>
            <div className="col-md-2"><b>Assessments</b></div>
            <div className="col-md-2"><b>Case study status</b></div>
          </div>
          <span key={cs.id}>
            <div className="row">
              <div className="col-md-2">{cs.name}(#{cs.supplier_code})</div>
              <div className="col-md-4"><a href={`casestudy/${cs.id}/assessment?role=manager`}>{cs.data.title}(#{cs.id})</a></div>
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
                <div className="col-md-2"><b>Assessors</b></div>
                <div className="col-md-4"><b>Comment</b></div>
                <div className="col-md-4"><b>Criteria met</b></div>
                <div className="col-md-2"><b>Result</b></div>
              </div>
            </div>
            {cs.assessment_results && cs.assessment_count > 0 ? cs.assessment_results.map(ar =>
              <div key={ar.id} className="row">
                <div className="col-md-2"><a href={`casestudy/${cs.id}/assessment/${ar.id}?role=assessor`}>{ar.username}</a></div>
                <div className="col-md-4">{ar.comment}</div>
                <div className="col-md-4">
                {ar.criterias_met && ar.criterias_met.map(cm =>
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
    onRejectClick: () => {},
    onKeywordChange: () => {},
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onApproveClick: (id) => {
      dispatch(updateCaseStudyStatus(id, 'approved'))
    },
    onRejectClick: (id) => {
      dispatch(updateCaseStudyStatus(id, 'rejected'))
    },
    onKeywordChange: (event) => {
      dispatch(searchAssessments(event.target.value));

    },
    onLoad: (supplier_code) => {
      dispatch(searchAssessments(supplier_code));
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentList)
