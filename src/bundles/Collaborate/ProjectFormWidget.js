import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'


import createStore from './redux/create'
import ProjectForm from './components/ProjectForm'

export const ProjectFormWidget = (props, history) => {
  const store = createStore(props);
  return (
    <Provider store={store}>
      <div className="row">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <ProjectForm router={history} />
        </div>
      </div>
    </Provider>
  )
}

export default new RegisterComponent({ 'project-form': ProjectFormWidget })
