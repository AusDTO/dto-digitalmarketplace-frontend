import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'
import ApplicationPreview from './components/ApplicationPreview/ApplicationPreview'

export const ApplicationPreviewWidget = (props) => {
  const store = createStore(props)
  return (
    <Provider store={store}>
          <ApplicationPreview/>
    </Provider>
  )
}

export default new RegisterComponent({ 'application-preview': ApplicationPreviewWidget })
