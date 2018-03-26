import React from 'react'
import format from 'date-fns/format'
import Icon from 'shared/Icon'

import styles from './BriefResponseSubmitted.scss'

const BriefResponseSubmittedSummary = props =>
  <div>
    <h2 className="uikit-display-2">
      <Icon value="successful" color="#000000" size={24} className={styles.icon} />
      <b>If you are shortlisted for evaluation</b>
    </h2>
    <p>
      The buyer will get in contact after <b>{format(new Date(props.brief.applicationsClosedAt), 'MMMM Do, YYYY')} </b>
      {props.brief && props.brief.evaluationType && <span> to evaluate you based on:</span>}
    </p>
    {props.brief.evaluationType &&
      <ul>
        {props.brief.evaluationType.map(evaluationType =>
          <li key={evaluationType}>
            {evaluationType}
          </li>
        )}
      </ul>}

    <h2 className="uikit-display-2">
      <Icon value="unsuccessful" color="#000000" size={24} className={styles.icon} />
      <b>If you are not shortlisted</b>
    </h2>
    <p>
      If you are not shortlisted, the buyer has been asked to let you know that you were unsuccessful. This may happen
      after the contract has been awarded.{' '}
    </p>
  </div>

export default BriefResponseSubmittedSummary
