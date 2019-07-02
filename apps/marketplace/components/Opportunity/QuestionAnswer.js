import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './QuestionAnswer.scss'
import { rootPath } from 'marketplace/routes'

const QuestionAnswer = props => (
  <div className={styles.container}>
    <div className="row">
      <div className="col-xs-12">
        <AUheading level="2" size="lg">
          Questions and answers
        </AUheading>
      </div>
    </div>
    {props.questions.map(qa => (
      <div className="row" key={qa.question}>
        <div className="col-xs-12 col-sm-5">{qa.question}</div>
        <div className="col-xs-12 col-sm-7">{qa.answer}</div>
      </div>
    ))}
    {props.questions.length === 0 && <p className={styles.noqs}>No questions have been asked or answered yet.</p>}
    {props.showAskQuestionInfo &&
      !props.clarificationQuestionsAreClosed && (
        <p>
          <a href={`${rootPath}/brief/${props.briefId}/ask-a-question`}>Ask a question</a>
        </p>
      )}
  </div>
)

QuestionAnswer.defaultProps = {
  questions: [],
  showAskQuestionInfo: false
}

QuestionAnswer.propTypes = {
  questions: PropTypes.array,
  briefId: PropTypes.number.isRequired,
  showAskQuestionInfo: PropTypes.bool,
  clarificationQuestionsAreClosed: PropTypes.bool.isRequired
}

export default QuestionAnswer
