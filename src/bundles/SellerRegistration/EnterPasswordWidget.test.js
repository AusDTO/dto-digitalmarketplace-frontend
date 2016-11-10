// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import {EnterPasswordWidget} from './EnterPasswordWidget';
import renderer from 'react-test-renderer';

test('EnterPasswordWidget renders correctly', () => {
  const component = renderer.create(
    <EnterPasswordWidget />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
