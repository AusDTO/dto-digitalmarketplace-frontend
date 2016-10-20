import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'
import View from './components/View'

const CaseStudyViewWidget = (props) => {
  const store = createStore(props)
  return (
    <Provider store={store}>
      <View />
    </Provider>
  )
}

export default new RegisterComponent({ 'casestudy-view': CaseStudyViewWidget })
