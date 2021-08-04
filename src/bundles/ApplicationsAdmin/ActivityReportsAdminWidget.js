import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch, IndexRoute} from 'react-router-dom'
import RegisterComponent from '../../RegisterComponent'
import createStore from './redux/create'
import ActivityReports from './components/ActivityReports'


const ActivityReportsAdminWidget = (props) => {

  const store = createStore(props)
  
  return (
    <Provider store={store} >
       <Switch>
        <Route exact path="/admin/activity_reports" component={ActivityReports} />
      </Switch>
    </Provider>
  )
}
                                                                 
export default new RegisterComponent({ 'activity-reports-admin': ActivityReportsAdminWidget })