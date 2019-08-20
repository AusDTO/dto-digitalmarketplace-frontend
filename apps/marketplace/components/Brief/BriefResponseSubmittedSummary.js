import React from 'react'
import format from 'date-fns/format'
import Icon from 'shared/Icon'
import PropTypes from 'prop-types'

import styles from './BriefResponseSubmitted.scss'

const BriefResponseSubmittedSummary = ({ brief }) => (
  <div>
    <h2 className="au-display-lg">
      <Icon value="successful" color="#000000" size={24} className={styles.icon} />
      <b>If you are shortlisted for evaluation</b>
    </h2>
    <p>
      The buyer will get in contact after <b>{format(new Date(brief.applicationsClosedAt), 'MMMM Do, YYYY')} </b>
      {brief && brief.evaluationType && <span> to evaluate you based on:</span>}
    </p>
    {brief.evaluationType && (
      <ul>
        {brief.evaluationType.map(evaluationType => (
          <li key={evaluationType}>{evaluationType}</li>
        ))}
      </ul>
    )}

    <h2 className="au-display-lg">
      <Icon value="unsuccessful" color="#000000" size={24} className={styles.icon} />
      <b>If you are not shortlisted</b>
    </h2>
    <p>
      If you are not shortlisted, the buyer has been asked to let you know that you were unsuccessful. This may happen
      after the contract has been awarded.{' '}
    </p>
  </div>
)

BriefResponseSubmittedSummary.defaultProps = {
  brief: {}
}

BriefResponseSubmittedSummary.propTypes = {
  brief: PropTypes.object.isRequired
}

export default BriefResponseSubmittedSummary
