import React from 'react';
import { shallow } from 'enzyme';

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