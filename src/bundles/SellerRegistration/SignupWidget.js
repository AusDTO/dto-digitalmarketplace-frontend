import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'
import SignupForm from './components/SignupForm'

export const SignupWidget = (props) => {
  const store = createStore(props)
  return (
    <Provider store={store}>
      <SignupForm />
    </Provider>
  )
}

export default new RegisterComponent({ signup: SignupWidget })
