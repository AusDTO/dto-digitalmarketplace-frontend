import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './EvaluationCriteria.scss'

const EvalutationCriteria = props => (
  <div className={styles.container}>
    <div className="row">
      <div role="columnheader" id="header_criteria" className={props.showWeightings ? `col-xs-9` : `col-xs-12`}>
        <AUheading level="2" size="lg">
          Criteria
        </AUheading>
      </div>
      {props.showWeightings && (
        <div role="columnheader" id="header_weighting" className="col-xs-3">
          <strong>Weighting</strong>
        </div>
      )}
    </div>
    {props.evaluationCriteria.map(evaluationCriteria => (
      <div key={evaluationCriteria.criteria} className="row">
        <div role="cell" aria-labelledby="header_criteria" className={props.showWeightings ? `col-xs-9` : `col-xs-12`}>
          {evaluationCriteria.criteria}
        </div>
        {props.showWeightings && (
          <div role="cell" aria-labelledby="header_weighting" className="col-xs-3">
            {evaluationCriteria.weighting}%
          </div>
        )}
      </div>
    ))}
  </div>
)

EvalutationCriteria.defaultProps = {
  evaluationCriteria: [],
  showWeightings: true
}

EvalutationCriteria.propTypes = {
  evaluationCriteria: PropTypes.array,
  showWeightings: PropTypes.bool
}

export default EvalutationCriteria
