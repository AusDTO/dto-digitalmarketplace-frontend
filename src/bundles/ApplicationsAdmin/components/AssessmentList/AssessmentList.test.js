import React from 'react';
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
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
    expect(wrapper.find('tr').length).toBe(2);
  });
});