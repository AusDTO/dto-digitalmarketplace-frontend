import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'

import Agency from './components/Agency'


const AgenciesAdminWidget = (props) => {
  const store = createStore(props)

  return (
    <Provider store={store} >
      <Switch>
        <Route exact path="/admin/agency/:id" component={Agency} />
      </Switch>
    </Provider>
  )
}

export default new RegisterComponent({ 'agencies-admin': AgenciesAdminWidget })
