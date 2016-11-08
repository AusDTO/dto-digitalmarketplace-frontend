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
          <div className="row">
            <div className="col-sm-push-2 col-sm-8 col-xs-12">
              <BusinessDetailsForm />
            </div>
          </div>
        </Provider>
    )
}

export default new RegisterComponent({ 'seller-business-details': BusinessDetailsWidget })
