jest.mock('../Icon/_getIcons');

import React from 'react';
import { MemoryRouter } from 'react-router'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
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