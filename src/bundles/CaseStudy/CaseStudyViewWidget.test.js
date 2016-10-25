// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import { CaseStudyViewWidget } from './CaseStudyViewWidget';
import renderer from 'react-test-renderer';

test('CaseStudyViewWidget renders without errrors', () => {
  const state = {
    casestudy: {
      title: 'A Case Study',
      opportunity: 'A Case Study Opportunity',
      client: 'A Case study client',
      approach: 'A simple approach',
      timeframe: '2016',
      outcome: ['a', 'b'],
      projectLinks: ['http://facebook.com']
    }
  }
  const component = renderer.create(
    <CaseStudyViewWidget {...state} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})