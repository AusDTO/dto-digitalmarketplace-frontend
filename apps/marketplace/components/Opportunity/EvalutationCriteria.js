import React from 'react'
import PropTypes from 'prop-types'
import styles from './EvaluationCriteria.scss'

const EvalutationCriteria = props => (
  <div className={`row ${styles.container}`}>
    <div className="col-xs-12">
      <div className={`row ${styles.heading}`}>
        <div className="col-xs-9">
          <strong>Evaluation criteria</strong>
        </div>
        <div className="col-xs-3">
          <strong>Weighting</strong>
        </div>
      </div>
      <ul className={styles.criteria}>
        {props.evaluationCriteria.map(evaluationCriteria => (
          <li key={evaluationCriteria.criteria}>
            <span className="col-xs-9">{evaluationCriteria.criteria}</span>
            <span className="col-xs-3">{evaluationCriteria.weighting}%</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

EvalutationCriteria.defaultProps = {
  evaluationCriteria: []
}

EvalutationCriteria.propTypes = {
  evaluationCriteria: PropTypes.array
}

export default EvalutationCriteria
