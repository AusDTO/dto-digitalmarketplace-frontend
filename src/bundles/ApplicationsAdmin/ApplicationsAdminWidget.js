import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'

import AppList from './components/AppList'


const ApplicationsAdminWidget = (props) => {
  const store = createStore(props)

  return (
    <Provider store={store} >
      <AppList />
    </Provider>
  )
}

export default new RegisterComponent({ 'hello-applications': ApplicationsAdminWidget })
