jest.mock('../../../shared/Icon/_getIcons');

import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import Start from './Start';
import createStore from '../redux/create'

describe('<Start />', () => {
  it('should render new applicant text', () => {
	const store = createStore({});
    const wrapper = mount(
		<Provider store={store}>
	    	<Start />
	    </Provider>
    );
    expect(wrapper.find('h1').text()).toBe('Joining the Digital Marketplace');
    expect(wrapper.find('.callout--info').length).toBe(0);
  });

  it('should render existing supplier text for supplier 0', () => {
	const store = createStore({application: {supplier_code: 0}});
    const wrapper = mount(
		<Provider store={store}>
	    	<Start />
	    </Provider>
    );
    expect(wrapper.find('h1').text()).toBe('Do more in the Digital Marketplace');
  });

  it('should render existing supplier text', () => {
	const store = createStore({application: {supplier_code: 999}});
    const wrapper = mount(
		<Provider store={store}>
	    	<Start />
	    </Provider>
    );
    expect(wrapper.find('h1').text()).toBe('Do more in the Digital Marketplace');
  });

  it('should render save text', () => {
	const store = createStore({application: {saved: true}});
    const wrapper = mount(
		<Provider store={store}>
	    	<Start />
	    </Provider>
    );
    expect(wrapper.find('h1').text()).toBe('Joining the Digital Marketplace');
    expect(wrapper.find('.callout--info').length).toBe(1);
  });
});