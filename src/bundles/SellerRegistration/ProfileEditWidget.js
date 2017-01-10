import React from 'react';
import { Provider } from 'react-redux';

import RegisterComponent from '../../RegisterComponent';
import createStore from './redux/create-signup';

import ProfileEdit from './components/ProfileEdit';

export const ProfileEditWidget = (props) => {
  const store = createStore(props);
  return ({ router, location }) => (
    <Provider store={store}>
      <ProfileEdit router={router} location={location} />
    </Provider>
  )
}

export default new RegisterComponent({ 'profile-edit': ProfileEditWidget })
