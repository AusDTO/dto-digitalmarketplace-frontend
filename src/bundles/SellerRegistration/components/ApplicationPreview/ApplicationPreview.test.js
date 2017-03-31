jest.mock('../../../../shared/Icon/_getIcons');

import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import ApplicationPreview from './ApplicationPreview';
import createStore from '../../redux/create'

describe('<ApplicationPreview />', () => {
  it('should render new applicant text', () => {
  const store = createStore({'application': {'services': ['service1'], 'assessed_domains': ['service2']}});
    const wrapper = mount(
    <Provider store={store}>
        <ApplicationPreview />
      </Provider>
    );

    const body = wrapper.find('ApplicationPreview').prop('body');
    expect(body['unassessed']).toContain('0');
    expect(body['assessed']).toContain('service2');
  });
});