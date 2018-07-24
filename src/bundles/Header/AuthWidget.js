import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'
import Header from './Header'

export const AuthWidget = (props) => {
  const store = createStore(props);
  return (
    <Provider store={store}>
        <Header />
    </Provider>
  )
}

export default new RegisterComponent({ 'auth-header': AuthWidget })
