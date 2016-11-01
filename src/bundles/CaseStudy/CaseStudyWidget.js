import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'


import createStore from './redux/create'
import CaseStudyForm from './components/CaseStudyForm'

export const CaseStudyWidget = (props) => {
  const store = createStore(props)
  return (
    <Provider store={store}>
      <CaseStudyForm />
    </Provider>
  )
}

export default new RegisterComponent({ casestudy: CaseStudyWidget })
