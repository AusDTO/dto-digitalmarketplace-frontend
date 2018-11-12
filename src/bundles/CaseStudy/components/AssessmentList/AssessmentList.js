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
      <span>              
        <table className="content-table">
          <thead>
            <tr>
              <th>supplier</th>
              <th>title</th>
              <th>domain</th>
              <th>assessments</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
          {casestudies.map((cs, i) => 
            <tr>
              <td>{cs.name}(#{cs.supplier_code})</td>
              <td><a href={`casestudy-assessment/${cs.id}`}>{cs.data.title}(#{cs.id})</a></td>
              <td>{cs.data.service}</td>
              <td>{cs.assessment_count}</td>
              <td>{cs.status}</td>
            </tr>
          )}
          </tbody>
        </table>
      </span>
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
