import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'
import ProjectSubmitConfirmation from './components/ProjectSubmitConfirmation'

export const ProjectSubmitConfirmationWidget = (props) => {
    const store = createStore(props)
    return (
        <Provider store={store}>
            <ProjectSubmitConfirmation />
        </Provider>
    )
}

export default new RegisterComponent({ 'project-submit-confirmation': ProjectSubmitConfirmationWidget })
