import React from 'react'

import PageAlert from '@gov.au/page-alerts'
import Icon from 'shared/Icon'

import format from 'date-fns/format'

const BriefResponseSubmitted = props =>
  <span>
    <PageAlert as="success" setFocus={props.setFocus}>
      <h4>Thanks for your application, your brief response has been sent to the buyer</h4>
    </PageAlert>
    <h1>What happens next?</h1>
    <p>
      After the opportunity closes on <b>{format(new Date(props.brief.applicationsClosedAt), 'MMMM Do, YYYY')}</b> the
      buyer will shortlist a number of sellers and get in touch with next steps to evaluate further.
    </p>

    {props.brief &&
      props.brief.evaluationType &&
      <span>
        If you’ve been selected you’ll be asked for:
        <ul>
          {props.brief.evaluationType.map(evaluationType =>
            <li key={evaluationType}>
              {evaluationType}
            </li>
          )}
        </ul>
      </span>}

    <p>
      If you’re unsuccessful the buyer has been asked to let you know. This may happen after the shortlisting but it’s
      not unusual for this to happen after a contract has been awarded to the successful seller.
    </p>
    <p>Best of luck!</p>

    <span style={{ display: 'none' }}>
      <hr />
      <h4>How did this compare to the last time you responded to a brief?</h4>
      <button className="uikit-btn">
        <Icon value="smile-o" color="#000000" size={32} />
        <span style={{ marginTop: '-18px', display: 'inline-block', verticalAlign: 'middle' }}>&nbsp;Easy</span>
      </button>
      &nbsp;&nbsp;
      <button className="uikit-btn">
        <Icon value="meh-o" color="#000000" size={32} />
        <span style={{ marginTop: '-18px', display: 'inline-block', verticalAlign: 'middle' }}>&nbsp;OK</span>
      </button>
      &nbsp;&nbsp;
      <button className="uikit-btn">
        <Icon value="frown-o" color="#000000" size={32} />
        <span style={{ marginTop: '-18px', display: 'inline-block', verticalAlign: 'middle' }}>&nbsp;Hard</span>
      </button>
    </span>
  </span>

export default BriefResponseSubmitted
