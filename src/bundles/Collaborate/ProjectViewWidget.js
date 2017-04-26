import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'
import ProjectView from './components/ProjectView'

export const ProjectViewWidget = (props) => {
  const store = createStore(props)
  return (
    <Provider store={store}>
      <ProjectView />
    </Provider>
  )
}

export default new RegisterComponent({ 'project-view': ProjectViewWidget })
