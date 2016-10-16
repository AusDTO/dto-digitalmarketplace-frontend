import React from 'react'
import { Provider } from 'react-redux'
import Registry from '../../registry'

import createStore from './redux/create'
import View from './components/View'
import { sampleState } from './components/View'

const CaseStudyViewWidget = (props, _context) => {
  const store = createStore({
    _serverContext: {},
    casestudy: sampleState
  })
  return (
    <Provider store={store}>
      <View />
    </Provider>
  )
}


Registry.add({
  'casestudy-view': CaseStudyViewWidget
})

export default Registry
