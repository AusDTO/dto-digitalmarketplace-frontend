jest.mock('../Icon/_getIcons');

import React from 'react';
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import Body from './Body';

describe('<Body />', () => {
  it('should render address', () => {
    const wrapper = shallow(
        <Body addresses={[{
            address_line:'line', 
            suburb: 'suburb', 
            state: 'nsw', 
            postal_code:'2000'}, 
            null]
        }/>
    );

    expect(wrapper.containsMatchingElement(<span>line</span>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<span>suburb</span>)).toBeTruthy();
  });
});