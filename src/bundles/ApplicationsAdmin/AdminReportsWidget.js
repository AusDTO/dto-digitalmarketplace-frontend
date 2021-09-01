import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import RegisterComponent from '../../RegisterComponent'
import createStore from './redux/create'
import AdminReports from './components/AdminReports'


const AdminReportsWidget = (props) => {
  const store = createStore(props)
  
  return (
    <Provider store={store} >
      <Switch>
        <Route exact path="/admin/reports" component={AdminReports} />
      </Switch>
    </Provider>
  )
}
                                                                 
export default new RegisterComponent({ 'reports-admin': AdminReportsWidget })
