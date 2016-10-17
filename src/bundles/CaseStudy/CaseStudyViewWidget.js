import React from 'react'
import { Provider } from 'react-redux'
import Registry from '../../registry'

import createStore from './redux/create'
import View from './components/View'

const CaseStudyViewWidget = (props, _context) => {
  const store = createStore(props)
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
