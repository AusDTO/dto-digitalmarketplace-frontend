import dmapi from '../services/apiClient'

export const loadQuestions = briefId => () => dmapi({ url: `/brief/${briefId}/questions` }).then(response => response)

export const loadQuestion = (briefId, questionId) => () =>
  dmapi({ url: `/brief/${briefId}/question`, params: { questionId } }).then(response => response)

export const loadAnswers = briefId => () => dmapi({ url: `/brief/${briefId}/answers` }).then(response => response)
