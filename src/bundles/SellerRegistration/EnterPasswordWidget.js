import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'
import EnterPasswordForm from './components/EnterPasswordForm'

export const EnterPasswordWidget = (props) => {
  const store = createStore(props)
  return (
    <Provider store={store}>
      <EnterPasswordForm />
    </Provider>
  )
}

export default new RegisterComponent({ enterpassword: EnterPasswordWidget })
