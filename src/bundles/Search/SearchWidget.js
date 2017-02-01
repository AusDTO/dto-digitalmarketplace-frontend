import React from 'react';
import { Provider } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import RegisterComponent from '../../RegisterComponent';

import { titleMap } from '../../shared/Badges';

import createStore from './redux/create';
import Catalogue from './components/Catalogue';

export const SearchWidget = (props) => {
  // bit hacky
  const { search = {} } = props;
  let mappedTypes = search.type

  if (!isEmpty(search.type)) {
    mappedTypes = Object
      .keys(search.type)
      .map(type => {
        return { [titleMap[type]]: search.type[type] }
      })
      .reduce((object, type) => {
        return { ...object, ...type}
      }, {});
  }

  const store = createStore({
    ...props,
    search: {
      ...search,
      type: mappedTypes
    }
  });

  return ({ router, location }) => (
    <Provider store={store}>
      <Catalogue router={router} />
    </Provider>
  )
}

export default new RegisterComponent({ search: SearchWidget })
