import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'

import AppList from './components/AppList'
import AppUsers from './components/AppUsers'
import AppEdit from './components/AppEdit'


const ApplicationsAdminWidget = (props) => {
  const store = createStore(props)

  return (
    <Provider store={store} >
      <Switch>
        <Route exact path="/admin/applications/:id/users" component={AppUsers} />
        <Route path="/admin/applications/:id/edit" component={AppEdit} />
        <Route path="/admin/applications" component={AppList} />
      </Switch>
    </Provider>
  )
}

export default new RegisterComponent({ 'applications-admin': ApplicationsAdminWidget })
