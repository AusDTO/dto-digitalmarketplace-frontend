import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'

import BuyerDashboard from './components/Dashboard/BuyerDashboard'

const BuyerDashboardWidget = (props) => {
  const store = createStore(props)
  return (
    <Provider store={store} >
      <BuyerDashboard/>
    </Provider>
  )
}

export default new RegisterComponent({ 'buyer-dashboard': BuyerDashboardWidget })
