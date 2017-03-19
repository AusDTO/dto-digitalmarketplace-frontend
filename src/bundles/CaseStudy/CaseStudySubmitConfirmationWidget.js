import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

import createStore from './redux/create'
import SubmitConfirmation from './components/SubmitConfirmation'

export const CaseStudySubmitConfirmationWidget = (props) => {
    const store = createStore(props)
    return (
        <Provider store={store}>
            <SubmitConfirmation />
        </Provider>
    )
}

export default new RegisterComponent({ 'casestudy-submit-confirmation': CaseStudySubmitConfirmationWidget })
