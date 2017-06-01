import React from 'react';
import { Provider } from 'react-redux';

import RegisterComponent from '../../RegisterComponent';
import createStore from './redux/create-signup';

import Signup from './components/Signup';

export const ApplicantSignup = (props, history) => {
  const store = createStore(props, { router: history });
  const filterSteps = (step) => {
    // Remove steps with patterns of /start and /case-study and /review and /submit
    return !step.pattern.match(/\/profile-finish|\/update/);
  };
  return (
    <Provider store={store}>
      <Signup filterSteps={filterSteps}/>
    </Provider>
  )
}

export default new RegisterComponent({ 'applicant-signup': ApplicantSignup })
