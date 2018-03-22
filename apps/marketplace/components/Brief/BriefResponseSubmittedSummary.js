import React from 'react'
import format from 'date-fns/format'
import Icon from 'shared/Icon'

import styles from './BriefResponseSubmitted.scss'

const BriefResponseSubmittedSummary = props =>
  <div>
    <h2 className="uikit-display-2">
      <Icon value="successful" color="#000000" size={24} className={styles.icon} />
      <b>If you&apos;re successful</b>
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
      <b>If not</b>
    </h2>
    <p>
      If you’re unsuccessful the buyer has been asked to let you know. This may happen after the shortlisting but it’s
      not unusual for this to happen after a contract has been awarded to the successful seller.
    </p>
    <p>Best of luck!</p>
  </div>

export default BriefResponseSubmittedSummary
