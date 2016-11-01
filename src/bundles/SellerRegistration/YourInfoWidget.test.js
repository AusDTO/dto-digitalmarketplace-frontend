// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import { YourInfoWidget } from './YourInfoWidget';
import renderer from 'react-test-renderer';

test('YourInfoWidget renders without errors', () => {
  const component = renderer.create(
    <YourInfoWidget />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})