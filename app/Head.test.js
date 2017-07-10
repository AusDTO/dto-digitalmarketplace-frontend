import React from 'react';
import { shallow } from 'enzyme';
import Head from './Head';

test('it should render', () => {  

  const wrapper = shallow(<Head />);
  expect(wrapper.find('link').length).toBeGreaterThan(0);
  expect(wrapper.find('meta').length).toBeGreaterThan(0);
});