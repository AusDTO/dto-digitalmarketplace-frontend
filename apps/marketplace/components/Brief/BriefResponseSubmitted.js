import React from 'react'
import format from 'date-fns/format'
import Icon from 'shared/Icon'
import Feedback from 'marketplace/components/shared/form/Feedback'

import PageAlert from '@gov.au/page-alerts'

const BriefResponseSubmitted = props =>
  <div className="row">
    <div className="col-sm-push-2 col-sm-8 col-xs-12">
      <article role="main">
        <PageAlert as="success" setFocus={props.setFocus}>
          <h4>Thanks for your application, your brief response has been sent to the buyer</h4>
        </PageAlert>
        <h1 className="uikit-display-4" style={{ fontWeight: 'bold' }}>
          What happens next?
        </h1>
        {!props.brief || props.brief.sellerSelector !== 'oneSeller'
          ? <span>
              <p>
                After the brief closes{' '}
                {props.brief &&
                  <span>
                    {' '}on <b>{format(new Date(props.brief.applicationsClosedAt), 'MMMM Do, YYYY')}</b>
                  </span>}{' '}
                the buyer will shortlist a number of sellers and get in touch with next steps to evaluate further.
              </p>

              {props.brief &&
                props.brief.evaluationType &&
                <span>
                  <h2 className="uikit-display-2" style={{ fontWeight: 'bold' }}>
                    <Icon
                      value="successful"
                      color="#000000"
                      size={24}
                      style={{
                        position: 'relative',
                        top: '4px',
                        marginRight: '10px'
                      }}
                    />
                    If you&apos;re successful
                  </h2>
                  The buyer will get in contact and evaluate you based on:
                  <ul>
                    {props.brief.evaluationType.map(evaluationType =>
                      <li key={evaluationType}>
                        {evaluationType}
                      </li>
                    )}
                  </ul>
                </span>}
            </span>
          : <span>
              The buyer will get in contact after{' '}
              <b>{format(new Date(props.brief.applicationsClosedAt), 'MMMM Do, YYYY')} </b>
              to evaluate you based on:
              <ul>
                {props.brief.evaluationType.map(evaluationType =>
                  <li key={evaluationType}>
                    {evaluationType}
                  </li>
                )}
              </ul>
            </span>}

        {!props.brief ||
          (props.brief.sellerSelector !== 'oneSeller' &&
            <p>
              <h2 className="uikit-display-2" style={{ fontWeight: 'bold' }}>
                <Icon
                  value="unsuccessful"
                  color="#000000"
                  size={24}
                  style={{
                    position: 'relative',
                    top: '4px',
                    marginRight: '10px'
                  }}
                />If not
              </h2>
              If you’re unsuccessful the buyer has been asked to let you know. This may happen after the shortlisting
              but it’s not unusual for this to happen after a contract has been awarded to the successful seller.
            </p>)}
        <p>Best of luck!</p>
        <h2 className="uikit-display-4" style={{ fontWeight: 'bold' }}>
          The Marketplace is working to make procurement simpler, clearer, faster.
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
  </div>

export default BriefResponseSubmitted
