import React from 'react';
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import AssessmentList from './AssessmentList';
import createStore from '../../redux/create'
import assessments from '../../AssessmentsAdmin.json';

describe('<AssessmentList />', () => {
  it('should render an assessment', () => {
  const store = createStore(assessments);
    const wrapper = mount(
    <MemoryRouter>
      <Provider store={store}>
          <AssessmentList />
      </Provider>
    </MemoryRouter>
    );
    expect(wrapper.find('tr').length).toBe(3);
  });
});