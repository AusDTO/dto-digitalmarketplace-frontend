jest.mock('../../../../shared/Icon/_getIcons');

import React from 'react';
import { Provider } from 'react-redux';
import SubmitConfirmation from './SubmitConfirmation';
import createStore from '../../redux/create'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<SubmitConfirmation />', () => {
  it('should render confirmation screen', () => {
    const store = createStore({form_options: {
            domain: 'my domain',
            opportunityUrl: '/opportunities',
            closingDate: '2017-01-01'
        }});
    const wrapper = mount(
    <Provider store={store}>
        <SubmitConfirmation />
      </Provider>
    );

    expect(wrapper.find('h1').first().text()).toBe('You have been prioritised for assessment');
  });
});