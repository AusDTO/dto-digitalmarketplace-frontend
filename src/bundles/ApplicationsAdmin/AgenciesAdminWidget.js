import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'

import Agency from './components/Agency'
import NewAgency from './components/NewAgency'
import AgencyList from './components/AgencyList'


const AgenciesAdminWidget = (props) => {
  const store = createStore(props)

  return (
    <Provider store={store} >
      <Switch>
        <Route exact path="/admin/agency/:id" component={Agency} />
        <Route exact path="/admin/agency" component={AgencyList} />
        <Route exact path="/admin/create_agency" component={NewAgency} />
      </Switch>
    </Provider>
  )
}

export default new RegisterComponent({ 'agencies-admin': AgenciesAdminWidget })
