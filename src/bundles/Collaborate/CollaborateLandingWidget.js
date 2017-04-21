import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'

import Landing from './components/Landing'

export const CollaborateLandingWidget = (props) => {
  const store = createStore(props)

  return (
    <Provider store={store} >
      <Landing />
    </Provider>
  )
}

export default new RegisterComponent({ 'collaborate-landing': CollaborateLandingWidget })
