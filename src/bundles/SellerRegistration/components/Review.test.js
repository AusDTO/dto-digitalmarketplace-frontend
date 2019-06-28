jest.mock('../../../shared/Icon/_getIcons');

import React from 'react';
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
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

    expect(wrapper.find('#preview-link').text()).toMatch(/Preview and submitTo submit your updates for review, select 'Preview and submit updates' then select 'Submit updates'.The preview page will only show details visible to registered government buyers.If you did not make any changes, or you don't want to keep your saved updates, select 'Discard all updates'.Preview and submit updates/);
  });
  
  it('should render a case study', () => {
	const store = createStore({
    application: {supplier_code: 999}, 
    applicationErrors: [],
    caseStudyForm: {
      case_studies:[{
        title: 'title 1',
        opportunity: 'opportunity 1',
        client: 'client 1',
        approach: 'approach 1',
        timeframe: 'timeframe 1',
        outcome: ['outcome 1']
      }]
    }});
    const wrapper = mount(
    <MemoryRouter initialEntries={[ 'path/profile/case-study/0' ]}>  
  		<Provider store={store}>
  	    	<Review match={{url:'path'}}/>
  	  </Provider>
    </MemoryRouter>
    );
    expect(wrapper.find('h1').text()).toBe('title 1');
    expect(wrapper.find('a').text()).toBe('Return to Profile');
  });
});
