import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'

import BriefEdit from './components/BriefEdit'


const BriefAdminWidget = (props) => {
  const store = createStore(props);

  return (
    <Provider store={store} >
      <Switch>
        <Route path="/admin/buyers/:id/edit" component={BriefEdit} />
      </Switch>
    </Provider>
  )
}

export default new RegisterComponent({ 'brief-admin': BriefAdminWidget })
