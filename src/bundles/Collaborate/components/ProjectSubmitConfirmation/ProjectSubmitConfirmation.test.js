jest.mock('../../../../shared/Icon/_getIcons');

import React from 'react';
import { Provider } from 'react-redux';
import ProjectSubmitConfirmation from './ProjectSubmitConfirmation';
import createStore from '../../redux/create'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<ProjectSubmitConfirmation />', () => {
  it('should render confirmation screen', () => {
    const store = createStore({form_options: {}});
    const wrapper = mount(
    <Provider store={store}>
        <ProjectSubmitConfirmation />
      </Provider>
    );

    expect(wrapper.find('h1').text()).toBe('Thanks for adding your project!');
  });
});