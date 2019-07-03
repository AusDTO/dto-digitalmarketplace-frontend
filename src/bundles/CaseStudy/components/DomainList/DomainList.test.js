import React from 'react';
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux';
import DomainList from './DomainList';
import createStore from '../../redux/create'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<DomainList />', () => {
  it('should render link to add case studies', () => {
  const store = createStore({caseStudyForm: {case_studies: []}});
    const wrapper = mount(
    <MemoryRouter>
      <Provider store={store}>
          <DomainList />
      </Provider>
    </MemoryRouter>
    );
    expect(wrapper.find('h1').text()).toBe('Add case studies');
  });

  it('should render essential domains', () => {
  const store = createStore({caseStudyForm: {case_studies: []}});
    const wrapper = mount(
    <MemoryRouter>
      <Provider store={store}>
          <DomainList services={{'Agile delivery and Governance': true}}/>
      </Provider>
    </MemoryRouter>
    );
    expect(wrapper.find('h1').text()).toBe('Case Study Domain List');
    expect(wrapper.find('h2').text()).toBe('Essential');
  });

  it('should render recommended domains', () => {
	const store = createStore({caseStudyForm: {case_studies: []}, application: {assessed_domains: ['Agile delivery and Governance']}});
    const wrapper = mount(
    <MemoryRouter>
  		<Provider store={store}>
  	    	<DomainList services={{'Agile delivery and Governance': true}}/>
  	  </Provider>
    </MemoryRouter>
    );
    expect(wrapper.find('h1').text()).toBe('Case Study Domain List');
    expect(wrapper.find('h2').text()).toBe('Recommended');
  });

  it('should render existing supplier copy', () => {
  const store = createStore({caseStudyForm: {case_studies: []}, application: {supplier_code: 100}});
    const wrapper = mount(
    <MemoryRouter>
      <Provider store={store}>
          <DomainList services={{'Agile delivery and Governance': true}} />
      </Provider>
    </MemoryRouter>
    );
    expect(wrapper.find('header').text()).toMatch(/Case studies are important for showing you/);
  });
});
