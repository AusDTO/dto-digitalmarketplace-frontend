import React from 'react'
import format from 'date-fns/format'
import Feedback from 'marketplace/components/Feedback/Feedback'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import DocumentTitle from 'react-document-title'

const BriefSubmitted = props => (
  <div className="row">
    <DocumentTitle title="Brief Published - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          <AUpageAlert as="success" setFocus={props.setFocus}>
            <h4 className="au-display-sm">Your opportunity has been published</h4>

            <p>
              It will be open{' '}
              {props.brief && (
                <span>until {format(new Date(props.brief.applicationsClosedAt), 'MMMM Do, YYYY')} at 6PM (in Canberra)</span>
              )}
            </p>
            <a href={`/${props.brief.frameworkSlug}/opportunities/${props.brief.id}`}>View live opportunity</a>
          </AUpageAlert>
          <h1 className="au-display-lg">What happens next?</h1>
          <ul>
            <li>
              While your opportunity is live you’ll need to{' '}
              <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/115011257447-Answer-questions">
                answer sellers questions
              </a>
              .
            </li>
            <li>
              Once your opportunity closes, you can{' '}
              <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/115011257487-Shortlist-responses">
                shortlist seller responses
              </a>
              .
            </li>
            <li>
              If you need help at any time,{' '}
              <a href="https://marketplace1.zendesk.com/hc/en-gb/requests/new">contact us</a>.
            </li>
          </ul>
          <br />
          <br />
          <Feedback
            app={props.app}
            handleSubmit={props.handleSubmit}
            difficultyQuestion="How easy or difficult was it for you to publish this brief?"
            commentQuestion="How would you improve publishing a brief?"
            objectAction="published"
          />
        </article>
      </div>
    </DocumentTitle>
  </div>
)

export default BriefSubmitted
