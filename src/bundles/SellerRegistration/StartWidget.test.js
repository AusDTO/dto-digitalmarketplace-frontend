// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import {StartWidget} from './StartWidget';
import renderer from 'react-test-renderer';

test('StartWidget renders correctly', () => {
  const component = renderer.create(
    <StartWidget deed="/buyers-guide" signup="/signup" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
