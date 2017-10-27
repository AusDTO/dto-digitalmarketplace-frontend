import React from 'react'
import format from 'date-fns/format'
import Icon from 'shared/Icon'
import Feedback from 'marketplace/components/Feedback/Feedback'
import DocumentTitle from 'react-document-title'

import PageAlert from '@gov.au/page-alerts'
import styles from './BriefResponseSubmitted.scss'

const BriefResponseSubmitted = props =>
  <div className="row">
    <DocumentTitle title="Brief Response Submitted - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          <PageAlert as="success" setFocus={props.setFocus}>
            <h4>Thanks for your application, your brief response has been sent to the buyer</h4>
          </PageAlert>
          <h1 className="uikit-display-4">
            <b>What happens next?</b>
          </h1>
          {!props.brief ||
            (props.brief.sellerSelector !== 'oneSeller' && [
              <p>
                After the brief closes{' '}
                {props.brief &&
                  <span>
                    {' '}on <b>{format(new Date(props.brief.applicationsClosedAt), 'MMMM Do, YYYY')}</b>
                  </span>}{' '}
                the buyer will shortlist a number of sellers and get in touch with next steps to evaluate further.
              </p>,

              <h2 className="uikit-display-2">
                <Icon value="successful" color="#000000" size={24} className={styles.icon} />
                <b>If you&apos;re successful</b>
              </h2>
            ])}
          <span>
            The buyer will get in contact after{' '}
            <b>{format(new Date(props.brief.applicationsClosedAt), 'MMMM Do, YYYY')} </b>
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
              : [<br />, <br />]}
          </span>

          {!props.brief ||
            (props.brief.sellerSelector !== 'oneSeller' &&
              <p>
                <h2 className="uikit-display-2">
                  <Icon value="unsuccessful" color="#000000" size={24} className={styles.icon} />
                  <b>If not</b>
                </h2>
                If you’re unsuccessful the buyer has been asked to let you know. This may happen after the shortlisting
                but it’s not unusual for this to happen after a contract has been awarded to the successful seller.
              </p>)}
          <p>Best of luck!</p>
          <h2 className="uikit-display-4">
            <b>The Marketplace is working to make procurement simpler, clearer, faster.</b>
          </h2>
          <Feedback
            app={props.app}
            handleSubmit={props.handleSubmit}
            difficultyQuestion="How easy or difficult was it for you to respond to this brief?"
            commentQuestion="How would you improve responding to a brief?"
            objectAction="responded_to"
          />
        </article>
      </div>
    </DocumentTitle>
  </div>

export default BriefResponseSubmitted
