import React from 'react';
import { Provider } from 'react-redux';

import RegisterComponent from '../../RegisterComponent';
import createStore from './redux/create-signup';

import Signup from './components/Signup';

export const ApplicantSignup = (props) => {
  const store = createStore(props);
  const filterSteps = (step) => {
    // Remove steps with patterns of /start and /case-study and /review and /submit
    return !step.pattern.match(/\/profile-finish/);
  };
  return ({ router, location }) => (
    <Provider store={store}>
      <Signup router={router} location={location} filterSteps={filterSteps}/>
    </Provider>
  )
}

export default new RegisterComponent({ 'applicant-signup': ApplicantSignup })
