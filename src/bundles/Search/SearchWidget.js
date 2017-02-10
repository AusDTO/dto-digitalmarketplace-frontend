import React from 'react';
import { Provider } from 'react-redux';

import RegisterComponent from '../../RegisterComponent';

import createStore from './redux/create';
import Catalogue from './components/Catalogue';

export const SearchWidget = (props, history) => {
  const store = createStore(props, { router: history });

  return (
    <Provider store={store}>
      <Catalogue />
    </Provider>
  )
}

export default new RegisterComponent({ search: SearchWidget })
