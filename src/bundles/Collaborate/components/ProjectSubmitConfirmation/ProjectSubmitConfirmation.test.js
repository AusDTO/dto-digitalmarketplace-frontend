jest.mock('../../../../shared/Icon/_getIcons');

import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import ProjectSubmitConfirmation from './ProjectSubmitConfirmation';
import createStore from '../../redux/create'

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