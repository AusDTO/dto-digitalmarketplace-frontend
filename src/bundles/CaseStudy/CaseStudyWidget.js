import React from 'react'
import { Provider } from 'react-redux'
import Registry from '../../registry'

// Need to make this work.
// import { CaseStudy, createStore } from '../bundles/CaseStudy'
import createStore from './redux/create'
import CaseStudyForm from './components/CaseStudyForm'

const CaseStudyWidget = (props, _context) => {
  const store = createStore(props)
  return (
    <Provider store={store}>
      <CaseStudyForm />
    </Provider>
  )
}

Registry.add({
  casestudy: CaseStudyWidget
})

export default Registry
