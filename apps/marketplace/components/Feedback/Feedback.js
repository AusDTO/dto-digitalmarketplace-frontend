import React from 'react'
import PropTypes from 'prop-types'
import { Control, LocalForm } from 'react-redux-form'

import Textarea from 'shared/form/Textarea'
import Icon from 'shared/Icon'
import PageAlert from '@gov.au/page-alerts'

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
          <PageAlert as="success">
            <h4>Your feedback has been sent, thank you for helping us improve the Marketplace.</h4>
          </PageAlert>
        ) : (
          <LocalForm onSubmit={val => this.props.handleSubmit(val)}>
            <Control.input type="hidden" model=".commentQuestion" defaultValue={this.props.commentQuestion} />
            <Control.input type="hidden" model=".difficultyQuestion" defaultValue={this.props.difficultyQuestion} />
            <Control.input type="hidden" model=".objectAction" defaultValue={this.props.objectAction} />
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

              <label htmlFor="easy" className="uikit-btn uikit-btn--tertiary">
                <div>
                  <Icon value="smile-o" color="#000000" size={24} className={styles.smile} />Easy
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
              <label htmlFor="ok" className={`uikit-btn uikit-btn--tertiary ${styles.okButton}`}>
                <div>
                  <Icon value="meh-o" color="#000000" size={24} className={styles.meh} />OK
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
              <label htmlFor="difficult" className={`uikit-btn uikit-btn--tertiary ${styles.difficultButton}`}>
                <div>
                  <Icon value="frown-o" color="#000000" size={24} className={styles.frown} />Difficult
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

            <span className="uikit-control-input uikit-control-input--full">
              <Control.checkbox
                model=".contact_for_user_research"
                id="contact_for_user_research"
                name="contact_for_user_research"
                value="yes"
                mapProps={{
                  className: 'uikit-control-input__input'
                }}
              />
              <label className="uikit-control-input__text" htmlFor="contact_for_user_research">
                You are happy to be contacted to test new designs.
              </label>
            </span>
            <br />
            <br />
            <button className="uikit-btn">Send feedback</button>
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
