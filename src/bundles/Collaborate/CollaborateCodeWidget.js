import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'

import Code from './components/Code'

export const CollaborateCodeWidget = (props) => {
  const store = createStore(props)

  return (
    <Provider store={store} >
      <Code />
    </Provider>
  )
}

export default new RegisterComponent({ 'collaborate-code': CollaborateCodeWidget })
