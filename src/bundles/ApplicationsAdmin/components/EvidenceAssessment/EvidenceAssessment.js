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
      wasApproved: false,
      wasRejected: false,
      vfm: undefined
    }

    const criteria = {}
    if (this.props.evidence) {
      Object.keys(this.props.evidence.data.evidence).map(criteriaId => {
        criteria[criteriaId] = {
          demonstrates: undefined,
          reason: '',
          feedback: ''
        }
      })
      this.state.criteria = criteria
    }

    this.handleAssessmentApprove = this.handleAssessmentApprove.bind(this)
    this.handleAssessmentReject = this.handleAssessmentReject.bind(this)
  }

  hasReviewedAllCriteria() {
    return this.state.vfm !== undefined && Object.keys(this.state.criteria).every(id => {
      return this.state.criteria[id].demonstrates === true || (this.state.criteria[id].demonstrates === false && this.state.criteria[id].reason)
    })
  }

  hasMetEnoughCriteria() {
    return (
      this.props.evidence.criteriaNeeded > 0 &&
      Object.keys(this.state.criteria).filter(id => this.state.criteria[id].demonstrates === true).length >= this.props.evidence.criteriaNeeded
    )
  }

  getCriteriaName(criteriaId) {
    const match = this.props.evidence.domain_criteria.find(x => parseInt(x.id, 10) === parseInt(criteriaId, 10))
    return match.name ? match.name : ''
  }

  getReasonOptions() {
    const reasonsText = [
      'Not clear what the seller specifically did',
      'The evidence does not contain enough detail to assess',
      'The evidence does not relate to the criteria',
      'The evidence only partially demonstrates the criteria',
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
    return parseInt(this.props.evidence.maxDailyRate, 10) > parseInt(this.props.evidence.domain_price_maximum, 10)
  }

  getOverPercentage() {
    return Math.round(
      (parseInt(this.props.evidence.maxDailyRate, 10) / parseInt(this.props.evidence.domain_price_maximum, 10)
      * 100) - 100
    )
  }

  render() {
    const { evidence } = this.props

    if (!evidence) {
      return (
        <div>
          <h1 className="au-display-xl">Evidence submission not found</h1>
          <p>An evidence submission by this id either does not exist, or has already been reviewed.</p>
        </div>
      )
    }

    if (evidence && this.state.wasApproved) {
      return (
        <div>
          <h1 className="au-display-xl">Assessment approved</h1>
          <p>{evidence.domain_name} for <strong>{evidence.supplier_name} ({evidence.supplier_code})</strong> was approved.</p>
          <p><a href="/admin/evidence-assessments">Return to evidence assessment list</a></p>
        </div>
      )
    }

    if (evidence && this.state.wasRejected) {
      return (
        <div>
          <h1 className="au-display-xl">Assessment rejected</h1>
          <p>{evidence.domain_name} for <strong>{evidence.supplier_name} ({evidence.supplier_code})</strong> was rejected.</p>
          <p><a href="/admin/evidence-assessments">Return to evidence assessment list</a></p>
        </div>
      )
    }

    if (evidence) {
      return (
        <div>
          <span styleName="supplierInfo">
            {evidence.supplier_name} (code: {evidence.supplier_code})
          </span>
          <h1 className="au-display-xl">{evidence.domain_name} assessment</h1>
          <p styleName="redText">
            The seller <strong>MUST</strong> demonstrate at least {this.props.evidence.criteriaNeeded} criteria to pass VFM.
          </p>
          {evidence.brief_id && (
            <p>
              For brief "<a href={`https://marketplace.service.gov.au/2/digital-marketplace/opportunities/${evidence.brief_id}`}>
                {evidence.brief_title}
              </a>" (ID: {evidence.brief_id}) closing on {format(evidence.brief_closed_at, 'DD-MM-YYYY')}
            </p>
          )}
          {Object.keys(evidence.data.evidence).map(criteriaId => (
            <React.Fragment key={criteriaId}>
              <h2 className="au-display-lg">{evidence.data.evidence[criteriaId].client}</h2>
              <p>{evidence.data.evidence[criteriaId].endDate}</p>
              <p styleName="reviewText">{evidence.data.evidence[criteriaId].background}</p>
              <h3 className="au-display-md">{this.getCriteriaName(criteriaId)}</h3>
              <p styleName="reviewText">{evidence.data.evidence[criteriaId].response}</p>
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
          <p>Limit: ${evidence.domain_price_maximum}</p>
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
            {this.hasReviewedAllCriteria() && (!this.hasMetEnoughCriteria() || this.state.vfm === false) && (
              <button name="reject" styleName="actionButton rejectButton" onClick={this.handleAssessmentReject}>
                Reject assessment
              </button>
            )}
            {this.hasReviewedAllCriteria() && this.hasMetEnoughCriteria() && this.state.vfm === true && (
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
