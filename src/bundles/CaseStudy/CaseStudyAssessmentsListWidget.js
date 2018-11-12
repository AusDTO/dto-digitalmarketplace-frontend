import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'

import AssessmentList from './components/AssessmentList'


const AssessmentsAdminWidget = (props) => {
  const store = createStore(props)

  return (
    <Provider store={store} >
      <AssessmentList />
    </Provider>
  )
}

export default new RegisterComponent({ 'case-study-assessments-admin': AssessmentsAdminWidget })
