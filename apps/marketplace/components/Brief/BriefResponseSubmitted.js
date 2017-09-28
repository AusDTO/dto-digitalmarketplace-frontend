import React from 'react'
import { Control, LocalForm } from 'react-redux-form'
import format from 'date-fns/format'

import PageAlert from '@gov.au/page-alerts'
import Textarea from 'shared/form/Textarea'
import Icon from 'shared/Icon'

import styles from './BriefResponseSubmitted.scss'

export class BriefResponseSubmitted extends React.Component {
  onDifficultyChange = val => {
    if (val.target.checked) {
      this.props.handleSubmit({ difficulty: val.target.value })
    }
  }

  render() {
    const props = this.props
    return (
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
                  If you’re unsuccessful the buyer has been asked to let you know. This may happen after the
                  shortlisting but it’s not unusual for this to happen after a contract has been awarded to the
                  successful seller.
                </p>)}
            <p>Best of luck!</p>

            <h2 className="uikit-display-4" style={{ fontWeight: 'bold' }}>
              The Marketplace is working to make procurement simpler, clearer, faster.{' '}
            </h2>
            {props.app && props.app.feedbackSuccess
              ? <PageAlert as="success">
                  <h4>Your feedback has been sent, thank you for helping us improve the Marketplace.</h4>
                </PageAlert>
              : <LocalForm onSubmit={val => props.handleSubmit(val)}>
                  <fieldset className={styles.difficulty}>
                    <legend>
                      <b>How easy or difficult was it for you to provide a response to this brief?</b>
                    </legend>
                    <Control.radio
                      model=".difficulty"
                      type="radio"
                      name="difficulty"
                      id="easy"
                      value="easy"
                      controlProps={{
                        onChange: this.onDifficultyChange
                      }}
                    />
                    <label htmlFor="easy" className="uikit-btn uikit-btn--tertiary">
                      <div>
                        <Icon
                          value="smile-o"
                          color="#000000"
                          size={24}
                          style={{
                            position: 'relative',
                            right: '10px',
                            top: '6px',
                            float: 'right'
                          }}
                        />Easy
                      </div>
                    </label>
                    <Control.radio
                      model=".difficulty"
                      type="radio"
                      name="difficulty"
                      id="ok"
                      value="ok"
                      controlProps={{
                        onChange: this.onDifficultyChange
                      }}
                    />
                    <label htmlFor="ok" className="uikit-btn uikit-btn--tertiary" style={{ width: '115px' }}>
                      <div>
                        <Icon
                          value="meh-o"
                          color="#000000"
                          size={24}
                          style={{
                            position: 'relative',
                            right: '25px',
                            top: '6px',
                            float: 'right'
                          }}
                        />OK
                      </div>
                    </label>
                    <Control.radio
                      model=".difficulty"
                      type="radio"
                      name="difficulty"
                      id="difficult"
                      value="difficult"
                      controlProps={{
                        onChange: this.onDifficultyChange
                      }}
                    />
                    <label htmlFor="difficult" className="uikit-btn uikit-btn--tertiary" style={{ width: '155px' }}>
                      <div style={{ width: '6.5em' }}>
                        <Icon
                          value="frown-o"
                          color="#000000"
                          size={24}
                          style={{
                            position: 'relative',
                            right: '10px',
                            top: '6px',
                            float: 'right'
                          }}
                        />Difficult
                      </div>
                    </label>
                  </fieldset>
                  <Textarea
                    id="comment"
                    name="comment"
                    label="How would you improve responding to a brief?"
                    model=".comment"
                    controlProps={{ limit: 500 }}
                  />
                  <button className="uikit-btn">Send feedback</button>
                </LocalForm>}
          </article>
        </div>
      </div>
    )
  }
}

export default BriefResponseSubmitted
