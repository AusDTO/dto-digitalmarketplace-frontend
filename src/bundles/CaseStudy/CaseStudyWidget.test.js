// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import { CaseStudyWidget } from './CaseStudyWidget';
import renderer from 'react-test-renderer';

test('CaseStudyWidget renders without errrors', () => {
  const component = renderer.create(
    <CaseStudyWidget />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})