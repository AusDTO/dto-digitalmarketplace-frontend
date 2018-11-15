import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
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
    {props.showAskQuestionInfo &&
      !props.clarificationQuestionsAreClosed && (
        <p>
          <a href={`/sellers/opportunities/${props.briefId}/ask-a-question`}>Ask a question</a>
        </p>
      )}
    {props.showAskQuestionInfo &&
      props.clarificationQuestionsAreClosed && (
        <p>
          The deadline for asking questions about this opportunity was{' '}
          {format(parse(props.questionsClosingDate), 'dddd D MMMM YYYY')}.
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
  questionsClosingDate: PropTypes.string.isRequired,
  clarificationQuestionsAreClosed: PropTypes.bool.isRequired
}

export default QuestionAnswer
