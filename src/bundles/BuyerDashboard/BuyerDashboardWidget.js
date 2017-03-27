import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'

import Overview from './components/Overview'
import TeamView from './components/TeamView'

const BuyerDashboardWidget = (props) => {
  const store = createStore(props)

  return (
    <Provider store={store} >
      <TeamView />
    </Provider>
  )
}

export default new RegisterComponent({ 'buyer-dashboard': BuyerDashboardWidget })
