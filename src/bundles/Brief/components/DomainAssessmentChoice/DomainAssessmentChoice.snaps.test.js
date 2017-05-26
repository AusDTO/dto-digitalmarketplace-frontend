// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import renderer from 'react-test-renderer';

import DomainAssessmentChoice from './DomainAssessmentChoice';
import sampleState from './DomainAssessmentChoice.json';

test('DomainAssessmentChoice renders', () => {
  const component = renderer.create(
        <DomainAssessmentChoice {...sampleState} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});