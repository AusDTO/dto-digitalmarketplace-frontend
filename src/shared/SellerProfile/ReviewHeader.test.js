import React from 'react';
import { shallow } from 'enzyme';

import ReviewHeader from './ReviewHeader';

test('Doesn\'t display any invalid/empty/falsy badges', () => {
  
  const props = {
    seller_type: {
      indigenous: true,
      sme: true,
      start_up: false,
      invalid_key: true
    }
  }

  const component = shallow(
    <ReviewHeader {...props} />
  );

  expect(
    component.find('.badge--default').length
  ).toEqual(2);
});