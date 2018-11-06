import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './QuestionAnswer.scss'

const QuestionAnswer = props => (
  <div className={styles.container}>
    <div className="row">
      <div className="col-xs-12">
        <AUheading level="2" size="lg">
          Question and answer
        </AUheading>
      </div>
    </div>
    {props.questions.map(qa => (
      <div className="row" key={qa.question}>
        <div className="col-xs-12 col-sm-4">{qa.question}</div>
        <div className="col-xs-12 col-sm-8">{qa.answer}</div>
      </div>
    ))}
    {props.questions.length === 0 && <p>No questions have been asked or answered yet.</p>}
  </div>
)

QuestionAnswer.defaultProps = {
  questions: []
}

QuestionAnswer.propTypes = {
  questions: PropTypes.array
}

export default QuestionAnswer
