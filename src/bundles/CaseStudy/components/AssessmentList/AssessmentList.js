import React from 'react'
import { connect } from 'react-redux'

import format from 'date-fns/format'
import distanceInWords from 'date-fns/distance_in_words'
import isBefore from 'date-fns/is_before'

import has from 'lodash/has'
import orderBy from 'lodash/orderBy'
import isEmpty from 'lodash/isEmpty'
import values from 'lodash/values'
import { Modal } from '../../../../shared/Modal/Modal'
// import { approveAssessment, rejectAssessment } from '../../redux/modules/assessments'

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
      casestudies
    } = this.props

    return (
        casestudies.map((cs, i) =>
          <div>
            <div className="row">
              <div className="col-md-2"><b>supplier</b></div>
              <div className="col-md-4"><b>title</b></div>
              <div className="col-md-2"><b>domain</b></div>
              <div className="col-md-2"><b>assessments</b></div>
              <div className="col-md-2"><b>status</b></div>
            </div>
            <span key={cs.id}>
              <div className="row">
                <div className="col-md-2">{cs.name}(#{cs.supplier_code})</div>
                <div className="col-md-4"><a href={`casestudy-assessment/${cs.id}`}>{cs.data.title}(#{cs.id})</a></div>
                <div className="col-md-2">{cs.data.service}</div>
                <div className="col-md-2">{cs.assessment_count}</div>
                <div className="col-md-2">{cs.status}</div>
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
        )
    )
  }
}

const mapStateToProps = ({ meta, casestudies }) => {
  return {
    meta,
    casestudies
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentList)
