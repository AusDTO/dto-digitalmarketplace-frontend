jest.mock('../../../../shared/Icon/_getIcons');

import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import SubmitConfirmation from './SubmitConfirmation';
import createStore from '../../redux/create'

describe('<SubmitConfirmation />', () => {
  it('should render confirmation screen', () => {
    const store = createStore({form_options: {
            domain: 'my domain',
            opportunityUrl: '/opportunities',
            closingDate: '2017-01-01',
            assessedDomains: {6:"Software engineering and Development"}
        }});
    const wrapper = mount(
    <Provider store={store}>
        <SubmitConfirmation />
      </Provider>
    );

    expect(wrapper.find('h1').first().text()).toBe('You have been prioritised for assessment');
  });
});

describe('<SubmitConfirmation />', () => {
  it('should render confirmation screen', () => {
    const store = createStore({form_options: {
            opportunityUrl: '/opportunities',
            closingDate: '2017-01-01',
            assessedDomains: {},
            unassessedDomains: {}
        }});
    const wrapper = mount(
    <Provider store={store}>
        <SubmitConfirmation />
      </Provider>
    );

    expect(wrapper.find('h1').first().text()).toBe('Have you got experience in ?');
  });
});
