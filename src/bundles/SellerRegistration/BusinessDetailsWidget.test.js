// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import {BusinessDetailsWidget} from './BusinessDetailsWidget';
import renderer from 'react-test-renderer';

test('BusinessDetailsWidget renders correctly', () => {
  const component = renderer.create(
    <BusinessDetailsWidget />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
