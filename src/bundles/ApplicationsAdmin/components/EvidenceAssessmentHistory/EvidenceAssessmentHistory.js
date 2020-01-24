import React from 'react'
import { connect } from 'react-redux'
import './EvidenceAssessmentHistory.css'

class EvidenceAssessmentHistory extends React.Component {
  constructor(props) {
    super(props)
  }

  getCriteriaName(criteriaId) {
    const match = this.props.evidence.domain_criteria.find(x => parseInt(x.id, 10) === parseInt(criteriaId, 10))
    return match.name ? match.name : ''
  }

  getCriteriaPassedStatus(criteriaId) {
    let passed = true
    if ('feedback' in this.props.evidence && 'failed_criteria' in this.props.evidence.feedback && Object.keys(this.props.evidence.feedback.failed_criteria).includes(criteriaId)) {
      passed = false
    }
    return passed
  }

  getFeedbackForCriteria(criteriaId) {
    let feedback = {}
    if ('feedback' in this.props.evidence && 'failed_criteria' in this.props.evidence.feedback && criteriaId in this.props.evidence.feedback.failed_criteria) {
      feedback = this.props.evidence.feedback.failed_criteria[criteriaId]
    }
    return feedback
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
          <p>An evidence submission by this id either does not exist.</p>
        </div>
      )
    }

    if (evidence) {
      return (
        <div>
          <span styleName="supplierInfo">
            {evidence.supplierName} (code: {evidence.supplierCode})
          </span>
          <h1 className="au-display-xl">Previous {evidence.domainName} assessment</h1>
          {evidence.assessor && (
            <p styleName="largerText">
              <strong>Assessed by:</strong> {evidence.assessor}
            </p>
          )}
          {Object.keys(evidence.evidence).map(criteriaId => (
            <React.Fragment key={criteriaId}>
               <p>
                <strong>candidate full name:</strong> {evidence.evidence[criteriaId].candidateFullName}: {evidence.evidence[criteriaId].candidateFullName}
              </p>
              <p>
                <strong>Client:</strong> {evidence.evidence[criteriaId].client}
              </p>
              <p>
                <strong>Date:</strong> {evidence.evidence[criteriaId].startDate} - {evidence.evidence[criteriaId].endDate}
              </p>
              <p>
                <strong>Referee:</strong> {evidence.evidence[criteriaId].refereeName}: {evidence.evidence[criteriaId].refereeNumber}
              </p>
              <p>
                <strong>Background:</strong>
              </p>
              <p styleName="reviewText">{evidence.evidence[criteriaId].background}</p>
              <p>
                <strong>{this.getCriteriaName(criteriaId)}</strong>
              </p>
              <p styleName="reviewText">{evidence.evidence[criteriaId].response}</p>
              {this.getCriteriaPassedStatus(criteriaId) ? (
                <p styleName="greenText">
                  <strong>Criteria passed</strong>
                </p>
              ) : (
                <p styleName="redText">
                  <strong>Criteria not passed</strong><br />
                  {this.getFeedbackForCriteria(criteriaId).reason}<br />
                  {this.getFeedbackForCriteria(criteriaId).feedback}
                </p>
              )}
            </React.Fragment>
          ))}
          {'feedback' in evidence && 'vfm' in evidence.feedback && (
            <React.Fragment>
              <p>
                <strong>Does the submitted rate represent VFM?</strong>
              </p>
              <p>
                The seller must have demonstrated at least <strong>{this.props.evidence.criteriaNeeded} criteria</strong>.
              </p>
              <p>Limit: ${evidence.domain_price_maximum}</p>
              <p>
                Submitted: ${evidence.maxDailyRate}{this.priceIsOver() && (
                  <span styleName="priceOver">({this.getOverPercentage()}% over)</span>
                )}
              </p>
              {!evidence.feedback.vfm && (
                <p styleName="redText">
                  <strong>
                    Price not passed
                  </strong>
                </p>
              )}
            </React.Fragment>
          )}
        </div>
      )
    }

    return <div />
  }
}

const mapStateToProps = ({ evidence, meta }) => {
  return { evidence, meta }
}

export default connect(mapStateToProps)(EvidenceAssessmentHistory)
