import React from 'react'
import format from 'date-fns/format'
import Icon from 'shared/Icon'

import styles from './BriefResponseSubmitted.scss'

const BriefResponseSubmittedSummary = props =>
  <div>
    {!props.brief ||
      (
        props.brief.sellerSelector !== 'oneSeller' &&
          <p>
            After the brief closes{' '}
            {props.brief &&
              <span>
                {' '}on <b>{format(new Date(props.brief.applicationsClosedAt), 'MMMM Do, YYYY')}</b>
              </span>}{' '}
            the buyer will shortlist a number of sellers and get in touch with next steps to evaluate further.
          </p>,
        (
          <h2 className="uikit-display-2">
            <Icon value="successful" color="#000000" size={24} className={styles.icon} />
            <b>If you&apos;re successful</b>
          </h2>
        )
      )}
    <span>
      The buyer will get in contact after <b>{format(new Date(props.brief.applicationsClosedAt), 'MMMM Do, YYYY')} </b>
      {props.brief && props.brief.evaluationType
        ? <span>
            {' '}to evaluate you based on:
            <ul>
              {props.brief.evaluationType.map(evaluationType =>
                <li key={evaluationType}>
                  {evaluationType}
                </li>
              )}
            </ul>
          </span>
        : <p />}
    </span>

    {!props.brief ||
      (props.brief.sellerSelector !== 'oneSeller' &&
        <div>
          <h2 className="uikit-display-2">
            <Icon value="unsuccessful" color="#000000" size={24} className={styles.icon} />
            <b>If not</b>
          </h2>
          If you’re unsuccessful the buyer has been asked to let you know. This may happen after the shortlisting but
          it’s not unusual for this to happen after a contract has been awarded to the successful seller.
        </div>)}
    <p>Best of luck!</p>
  </div>

export default BriefResponseSubmittedSummary
