import dmapi from '../services/apiClient'

export const loadQuestions = briefId => () => dmapi({ url: `/brief/${briefId}/questions` }).then(response => response)

export const loadAnswers = briefId => () => dmapi({ url: `/brief/${briefId}/answers` }).then(response => response)

export const markQuestionAsAnswered = (briefId, questionId, answered) => (dispatch, getState) =>
  dmapi({
    url: `/brief/${briefId}/question/${questionId}/answered`,
    method: 'POST',
    headers: {
      'X-CSRFToken': getState().app.csrfToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      answered
    })
  }).then(response => response)
