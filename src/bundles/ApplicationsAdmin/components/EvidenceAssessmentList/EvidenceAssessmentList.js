import React from 'react'
import { connect } from 'react-redux'
import { approveEvidence, rejectEvidence } from '../../redux/modules/evidence'

import './EvidenceAssessmentList.css'

class EvidenceAssessmentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { evidence, onApproveClick, onRejectClick } = this.props
    console.log(evidence)

    return <div />
  }
}

const mapStateToProps = ({ evidence, meta }) => {
  return { evidence, meta }
}

const mapDispatchToProps = dispatch => {
  return {
    onApproveClick: id => {
      dispatch(approveEvidence(id))
    },
    onRejectClick: (id, feedback) => {
      dispatch(rejectEvidence(id, feedback))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EvidenceAssessmentList)
