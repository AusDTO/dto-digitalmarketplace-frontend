import dmapi from '../services/apiClient'

export const loadQuestions = briefId => () => dmapi({ url: `/brief/${briefId}/questions` })

export const loadQuestion = (briefId, questionId) => () =>
  dmapi({ url: `/brief/${briefId}/question`, params: { questionId } })

export const loadAnswers = briefId => () => dmapi({ url: `/brief/${briefId}/answers` })
