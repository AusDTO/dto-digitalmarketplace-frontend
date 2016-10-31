// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import ReactDOM from 'react-dom';
import { CaseStudyWidget } from './CaseStudyWidget';


test('CaseStudyWidget renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CaseStudyWidget />, div);
});