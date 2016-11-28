import React from 'react';
import renderer from 'react-test-renderer';

import ProgressBar from './ProgressBar';

test('Maxed out progressbar', () => {
  const component = renderer.create(
    <ProgressBar value={5} max={5} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Incomplete progress', () => {
  const component = renderer.create(
    <ProgressBar value={3} max={5} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('value greater than max', () => {
  const component = renderer.create(
    <ProgressBar value={8} max={5} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});