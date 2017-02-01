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
      .map(type => titleMap[type])
      .reduce((object, type) => {
        return { ...object, [type]: false}
      }, {});
  }

  const store = createStore({ ...props, search: { ...search, type: mappedTypes } })
  return (
    <Provider store={store}>
      <Catalogue />
    </Provider>
  )
}

export default new RegisterComponent({ search: SearchWidget })
