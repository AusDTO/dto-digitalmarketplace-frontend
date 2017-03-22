jest.mock('../../../shared/Icon/_getIcons');

import React from 'react';
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Review from './Review';
import createStore from '../redux/create'

describe('<Review />', () => {
  it('should render existing supplier text', () => {
	const store = createStore({application: {supplier_code: 999}});
    const wrapper = mount(
    <MemoryRouter>  
  		<Provider store={store}>
  	    	<Review match={{}}/>
  	  </Provider>
    </MemoryRouter>
    );

    expect(wrapper.find('#preview-link').text()).toMatch(/Take a moment to preview your profile/);
  });
});