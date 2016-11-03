import React from 'react'
import { Provider } from 'react-redux'
import RegisterComponent from '../../RegisterComponent'

// Need to make this work.
// import { BusinessDetails, createStore } from '../bundles/BusinessDetails'
import createStore from './redux/create'
import BusinessDetailsForm from './components/BusinessDetailsForm'

export const BusinessDetailsWidget = (props) => {
    const store = createStore(props)
    return (
        <Provider store={store}>
            <BusinessDetailsForm />
        </Provider>
    )
}

export default new RegisterComponent({ 'seller-business-details': BusinessDetailsWidget })
