import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './EvaluationCriteria.scss'

const EvaluationCriteria = props => (
  <div className={styles.container}>
    <div className="row">
      <div
        role="columnheader"
        id="header_criteria"
        className={props.showWeightings ? `col-xs-8 col-sm-9` : `col-xs-12`}
      >
        <AUheading level={props.titleLevel} size={props.titleSize}>
          {props.title}
        </AUheading>
      </div>
      {props.showWeightings && (
        <div role="columnheader" id="header_weighting" className="col-xs-4 col-sm-2 col-sm-offset-1">
          <strong>Weighting</strong>
        </div>
      )}
    </div>
    {props.evaluationCriteria.map(evaluationCriteria => (
      <div key={evaluationCriteria.criteria} className="row">
        <div
          role="cell"
          aria-labelledby="header_criteria"
          className={props.showWeightings ? `col-xs-8 col-sm-9 ${styles.newLines}` : `col-xs-12 ${styles.newLines}`}
        >
          {evaluationCriteria.criteria}
        </div>
        {props.showWeightings && (
          <div role="cell" aria-labelledby="header_weighting" className="col-xs-4 col-sm-2 col-sm-offset-1">
            {evaluationCriteria.weighting}%
          </div>
        )}
      </div>
    ))}
  </div>
)

EvaluationCriteria.defaultProps = {
  evaluationCriteria: [],
  showWeightings: true,
  title: 'Evaluation criteria',
  titleLevel: '2',
  titleSize: 'lg'
}

EvaluationCriteria.propTypes = {
  evaluationCriteria: PropTypes.array,
  showWeightings: PropTypes.bool,
  title: PropTypes.string,
  titleLevel: PropTypes.string,
  titleSize: PropTypes.string
}

export default EvaluationCriteria
