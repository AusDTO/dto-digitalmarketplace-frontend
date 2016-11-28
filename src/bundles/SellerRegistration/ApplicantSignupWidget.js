import React from 'react';
import { Provider } from 'react-redux';

import RegisterComponent from '../../RegisterComponent';
import createStore from './redux/create-signup';

import Signup from './components/Signup';

export const ApplicantSignup = (props) => {
  const store = createStore(props);
  return ({ router, location }) => (
    <Provider store={store}>
      <Signup router={router} location={location} />
    </Provider>
  )
}

export default new RegisterComponent({ 'applicant-signup': ApplicantSignup })
