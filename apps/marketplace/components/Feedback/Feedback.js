import React from 'react'
import PropTypes from 'prop-types'
import { Control, LocalForm } from 'react-redux-form'

import Textarea from 'shared/form/Textarea'
import Icon from 'shared/Icon'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

import styles from './Feedback.scss'

export class Feedback extends React.Component {
  onDifficultyChange = val => {
    if (val.target.checked) {
      this.props.handleSubmit({
        difficulty: val.target.value,
        difficultyQuestion: this.props.difficultyQuestion,
        objectAction: this.props.objectAction,
        allowFurtherFeedback: true
      })
    }
  }

  render() {
    return (
      <span>
        {this.props.app && this.props.app.feedbackSuccess ? (
          <AUpageAlert as="success">
            <h4 className="au-display-sm">Your feedback has been sent.</h4>
            <p>Thank you for helping us improve the Marketplace.</p>
          </AUpageAlert>
        ) : (
          <LocalForm onSubmit={val => this.props.handleSubmit(val)}>
            <Control.input type="hidden" model=".commentQuestion" defaultValue={this.props.commentQuestion} value="" />
            <Control.input
              type="hidden"
              model=".difficultyQuestion"
              defaultValue={this.props.difficultyQuestion}
              value=""
            />
            <Control.input type="hidden" model=".objectAction" defaultValue={this.props.objectAction} value="" />
            <fieldset className={styles.difficulty}>
              <legend>
                <b>{this.props.difficultyQuestion}</b>
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

              <label htmlFor="easy" className="au-btn au-btn--secondary">
                <div>
                  <Icon value="smile-o" color="#000000" size={24} className={styles.smile} />
                  Easy
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
              <label htmlFor="ok" className={`au-btn au-btn--secondary ${styles.okButton}`}>
                <div>
                  <Icon value="meh-o" color="#000000" size={24} className={styles.meh} />
                  OK
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
              <label htmlFor="difficult" className={`au-btn au-btn--secondary ${styles.difficultButton}`}>
                <div>
                  <Icon value="frown-o" color="#000000" size={24} className={styles.frown} />
                  Difficult
                </div>
              </label>
            </fieldset>
            <Textarea
              id="comment"
              name="comment"
              label={this.props.commentQuestion}
              model=".comment"
              messages={{ limitWords: 'Your feedback has exceeded the 150 word limit' }}
              controlProps={{ limit: 150 }}
            />

            <span className={`${styles.optIn} au-control-input au-control-input--full`}>
              <Control.checkbox
                model=".contact_for_user_research"
                id="contact_for_user_research"
                name="contact_for_user_research"
                value="yes"
                mapProps={{
                  className: 'au-control-input__input'
                }}
              />
              <label className="au-control-input__text" htmlFor="contact_for_user_research">
                You are happy for the Digital Marketplace team to contact you to test new Marketplace designs.
              </label>
            </span>
            <br />
            <br />
            <button className="au-btn">Send feedback</button>
          </LocalForm>
        )}
      </span>
    )
  }
}

Feedback.defaultProps = {}

Feedback.propTypes = {
  app: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  difficultyQuestion: PropTypes.string.isRequired,
  commentQuestion: PropTypes.string.isRequired,
  objectAction: PropTypes.string.isRequired
}

export default Feedback
