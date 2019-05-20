import React from 'react'
import { connect } from 'react-redux'
import { AUradio } from '@gov.au/control-input'
import AUselect from '@gov.au/select'
import AUtextInput from '@gov.au/text-inputs'
import { approveEvidence, rejectEvidence } from '../../redux/modules/evidence'
import format from 'date-fns/format'
import './EvidenceAssessment.css'

class EvidenceAssessment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasFailingCriteria: false,
      wasApproved: false,
      wasRejected: false,
      vfm: undefined
    }

    const criteria = {}
    Object.keys(this.props.evidence.evidence.criteriaResponses).map(criteriaId => {
      criteria[criteriaId] = {
        demonstrates: undefined,
        reason: '',
        feedback: ''
      }
    })
    this.state.criteria = criteria

    this.handleAssessmentApprove = this.handleAssessmentApprove.bind(this)
    this.handleAssessmentReject = this.handleAssessmentReject.bind(this)
  }

  hasReviewedAllCriteria() {
    return this.state.vfm !== undefined && Object.keys(this.state.criteria).every(id => {
      return this.state.criteria[id].demonstrates === true || (this.state.criteria[id].demonstrates === false && this.state.criteria[id].reason)
    })
  }

  getCriteriaName(criteriaId) {
    const match = this.props.evidence.domain.criteria.find(x => parseInt(x.id, 10) === parseInt(criteriaId, 10))
    return match.name ? match.name : ''
  }

  getReasonOptions() {
    const reasonsText = [
      'Not clear what the seller specifically did',
      'Evidence does not contain enough detail to assess',
      'Evidence does not relate to the criteria',
      'Evidence only partially demonstrates the criteria',
      'The situation cited does not reflect a common government need'
    ]
    const reasons = [
      {
        value: '',
        text: 'Select a reason...'
      }
    ]
    reasonsText.map(reason => reasons.push({ value: reason, text: reason }))
    return reasons
  }

  handleCriteriaReviewClick(e, criteriaId) {
    e.persist()
    this.setState(curState => {
      const value = e.target.value === "yes" ? true : false
      const newState = { ...curState }
      newState.criteria[criteriaId].demonstrates = value
      const currentFailed = Object.keys(curState.criteria).filter(id => curState.criteria[id].demonstrates === false)
      if (currentFailed && currentFailed.length > 0) {
        newState.hasFailingCriteria = true
      } else {
        newState.hasFailingCriteria = false
      }
      return newState
    })
  }

  handleVFMClick(vfm) {
    this.setState({
      vfm
    })
  }

  handleFeedbackChange(e, type, criteriaId) {
    e.persist()
    this.setState(curState => {
      const feedback = e.target.value
      const newState = { ...curState }
      newState.criteria[criteriaId][type] = feedback
      return newState
    })
  }

  handleAssessmentReject() {
    const evidenceId = this.props.match.params.id
    const failed_criteria = {}
    Object.keys(this.state.criteria).map(criteriaId => {
      if (this.state.criteria[criteriaId].demonstrates === false && this.state.criteria[criteriaId].reason) {
        failed_criteria[criteriaId] = {
          reason: this.state.criteria[criteriaId].reason,
          feedback: this.state.criteria[criteriaId].feedback
        }
      }
    })
    const vfm = this.state.vfm
    this.props.rejectEvidence(evidenceId, failed_criteria, vfm).then(res => {
      this.setState({
        wasApproved: false,
        wasRejected: true
      })
    })
  }

  handleAssessmentApprove() {
    const evidenceId = this.props.match.params.id
    this.props.approveEvidence(evidenceId).then(res => {
      this.setState({
        wasApproved: true,
        wasRejected: false
      })
    })
  }

  priceIsOver() {
    return parseInt(this.props.evidence.maxDailyRate, 10) > parseInt(this.props.evidence.domain.price_maximum, 10)
  }

  getOverPercentage() {
    return Math.round(
      parseInt(this.props.evidence.maxDailyRate, 10) / parseInt(this.props.evidence.domain.price_maximum, 10)
      * 100
    )
  }

  render() {
    const { evidence } = this.props

    if (evidence && evidence.status !== 'submitted') {
      return (
        <div>
          <h1 className="au-display-xl">Error loading evidence assessment</h1>
          <p>
            This evidence submission ({evidence.domain.name} for {evidence.supplier.name}){' '}
            {evidence.status === 'assessed' && <span>was already approved on {format(evidence.updated_at, 'DD/MM/YYYY')}.</span>}
            {evidence.status === 'rejected' && <span>was already rejected on {format(evidence.updated_at, 'DD/MM/YYYY')}.</span>}
            {evidence.status === 'draft' && <span>is not yet submitted.</span>}
          </p>
          <p><a href="/admin/evidence-assessments">Return to evidence assessment list</a></p>
        </div>
      )
    }

    if (this.state.wasApproved) {
      return (
        <div>
          <h1 className="au-display-xl">Assessment approved</h1>
          <p>{evidence.domain.name} for <strong>{evidence.supplier.name} ({evidence.supplier.code})</strong> was approved.</p>
          <p><a href="/admin/evidence-assessments">Return to evidence assessment list</a></p>
        </div>
      )
    }

    if (this.state.wasRejected) {
      return (
        <div>
          <h1 className="au-display-xl">Assessment rejected</h1>
          <p>{evidence.domain.name} for <strong>{evidence.supplier.name} ({evidence.supplier.code})</strong> was rejected.</p>
          <p><a href="/admin/evidence-assessments">Return to evidence assessment list</a></p>
        </div>
      )
    }

    if (evidence && evidence.supplier && evidence.domain && evidence.evidence) {
      return (
        <div>
          <span styleName="supplierInfo">
            {evidence.supplier.name} and {evidence.supplier.code}
          </span>
          <h1 className="au-display-xl">{evidence.domain.name} assessment</h1>
          <h2 className="au-display-md">{evidence.evidence.client}</h2>
          <p>
            {evidence.evidence.from.month}-{evidence.evidence.from.year} to {evidence.evidence.to.month}-{evidence.evidence.to.year}
          </p>
          <p styleName="reviewText">{evidence.evidence.background}</p>
          {Object.keys(evidence.evidence.criteriaResponses).map(criteriaId => (
            <React.Fragment key={criteriaId}>
              <p>
                <strong>{this.getCriteriaName(criteriaId)}</strong>
              </p>
              <p styleName="reviewText">{evidence.evidence.criteriaResponses[criteriaId]}</p>
              <p>
                <span styleName="criteriaReview">
                  <AUradio
                    label="Demonstrates"
                    name={`criteria-review-${criteriaId}`}
                    id={`criteria-review-${criteriaId}-yes`}
                    value="yes"
                    checked={this.state.criteria[criteriaId].demonstrates === true}
                    onChange={e => this.handleCriteriaReviewClick(e, criteriaId)}
                    block
                  />
                  <AUradio
                    label="Does not demonstrate"
                    name={`criteria-review-${criteriaId}`}
                    value="no"
                    id={`criteria-review-${criteriaId}-no`}
                    checked={this.state.criteria[criteriaId].demonstrates === false}
                    onChange={e => this.handleCriteriaReviewClick(e, criteriaId)}
                    block
                  />
                  {this.state.criteria[criteriaId].demonstrates === false && (
                    <span styleName="feedback">
                      <AUselect
                        id={`criteria-review-${criteriaId}-reason`}
                        name={`criteria-review-${criteriaId}-reason`}
                        options={this.getReasonOptions()}
                        value={this.state.criteria[criteriaId].reason}
                        onChange={e => this.handleFeedbackChange(e, 'reason', criteriaId)}
                        block
                      />
                      <AUtextInput
                        as="textarea"
                        block
                        placeholder="Feedback shown to seller (optional)"
                        value={this.state.criteria[criteriaId].feedback}
                        onChange={e => this.handleFeedbackChange(e, 'feedback', criteriaId)}
                      />
                    </span>
                  )}
                </span>
              </p>
            </React.Fragment>
          ))}
          <p>
            <strong>Does the submitted rate represent VFM?</strong>
          </p>
          <p>Limit: ${evidence.domain.price_maximum}</p>
          <p>
            Submitted: ${evidence.maxDailyRate}{this.priceIsOver() && (
              <span styleName="priceOver">({this.getOverPercentage()}% over)</span>
            )}
          </p>
          <p>
            <span styleName="criteriaReview">
              <AUradio
                label="Yes"
                name="vfm-review"
                id="vfm-review-yes"
                value={this.state.vfm}
                checked={this.state.vfm === true}
                onChange={e => this.handleVFMClick(true)}
                block
              />
              <AUradio
                label="No"
                name="vfm-review"
                id="vfm-review-no"
                value={this.state.vfm}
                checked={this.state.vfm === false}
                onChange={e => this.handleVFMClick(false)}
                block
              />
            </span>
          </p>
          <p>
            {this.hasReviewedAllCriteria() && (this.state.hasFailingCriteria || this.state.vfm === false) && (
              <button name="reject" styleName="actionButton rejectButton" onClick={this.handleAssessmentReject}>
                Reject assessment
              </button>
            )}
            {this.hasReviewedAllCriteria() && !this.state.hasFailingCriteria && this.state.vfm === true && (
              <button name="reject" styleName="actionButton approveButton" onClick={this.handleAssessmentApprove}>
                Approve assessment
              </button>
            )}
          </p>
        </div>
      )
    }

    return <div />
  }
}

const mapStateToProps = ({ evidence, meta }) => {
  return { evidence, meta }
}

const mapDispatchToProps = dispatch => {
  return {
    approveEvidence: id => dispatch(approveEvidence(id)),
    rejectEvidence: (id, feedback, vfm) => dispatch(rejectEvidence(id, feedback, vfm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EvidenceAssessment)
