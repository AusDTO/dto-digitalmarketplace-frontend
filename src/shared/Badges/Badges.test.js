import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Badges from './Badges';

test('Doesn\'t display any invalid/empty/falsy badges', () => {
  
  const props = {
    badges: {
      indigenous: true,
      sme: true,
      start_up: false,
      invalid_key: true
    }
  }

  const component = shallow(
    <Badges {...props} />
  );

  expect(
    component.find('.badge--default').length
  ).toEqual(2);
});