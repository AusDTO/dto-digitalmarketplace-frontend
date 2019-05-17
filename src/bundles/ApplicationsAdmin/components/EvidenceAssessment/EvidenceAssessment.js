import React from 'react'
import { connect } from 'react-redux'
import { AUradio } from '@gov.au/control-input/lib/js/react.js'

import './EvidenceAssessment.css'

class EvidenceAssessment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasFailingCriteria: false
    }

    const criteria = {}
    Object.keys(this.props.evidence.evidence.criteriaResponses).map(criteriaId => {
      criteria[criteriaId] = {
        demonstrates: undefined
      }
    })
    this.state.criteria = criteria
  }

  getReviewChoice(criteriaId) {
    return (
      <div>
        <AUradio
          label="Demonstrates"
          name={`criteria-review-${criteriaId}`}
          id={`criteria-review-${criteriaId}-yes`}
          checked={this.state.criteria[criteriaId] === true}
          onChange={e => console.log(e)}
        />
        <AUradio
          label="Does not demonstrate"
          name={`criteria-review-${criteriaId}`}
          id={`criteria-review-${criteriaId}-no`}
          checked={this.state.criteria[criteriaId] === false}
          onChange={e => console.log(e)}
        />
        {this.state.criteria[criteriaId] === false && (
          <p>xxx</p>
        )}
      </div>
    )
  }

  getCriteriaName(criteriaId) {
    const match = this.props.evidence.domain.criteria.find(x => parseInt(x.id, 10) === parseInt(criteriaId, 10))
    return match.name ? match.name : ''
  }

  render() {
    const { evidence } = this.props

    console.log(this.state)

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
        <p>{evidence.evidence.background}</p>
        {Object.keys(evidence.evidence.criteriaResponses).map(criteriaId => (
          <React.Fragment key={criteriaId}>
            <p>
              <strong>{this.getCriteriaName(criteriaId)}</strong>
            </p>
            <p>{evidence.evidence.criteriaResponses[criteriaId]}</p>
            <p>
              {this.getReviewChoice(criteriaId)}
            </p>
          </React.Fragment>
        ))}
        <p>

        </p>
      </div>
    )
  }
}

const mapStateToProps = ({ evidence, meta }) => {
  return { evidence, meta }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EvidenceAssessment)
