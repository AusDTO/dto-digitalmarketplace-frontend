import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'
import createStore from './redux/create'

import TeamView from './components/TeamView'
import BuyerDashboard from './components/Dashboard/BuyerDashboard'

const BuyerDashboardWidget = (props) => {
  const store = createStore(props);
  let featureFlag = store.getState().flag;

  let BuyerDashboardComponent = (featureFlag ? BuyerDashboard : TeamView);

  return (
    <Provider store={store} >
      <BuyerDashboardComponent/>
    </Provider>
  )
}

export default new RegisterComponent({ 'buyer-dashboard': BuyerDashboardWidget })
