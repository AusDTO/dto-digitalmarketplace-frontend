import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'
import YourInfoForm from './components/YourInfoForm'

export const YourInfoWidget = (props) => {
  const store = createStore(props)
  return (
    <Provider store={store}>
      <YourInfoForm />
    </Provider>
  )
}

export default new RegisterComponent({ yourinfo: YourInfoWidget })
