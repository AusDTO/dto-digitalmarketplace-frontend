// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import { ApplicantSignup } from './ApplicantSignupWidget';


test('ApplicantSignupWidget renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <ApplicantSignup />
    </MemoryRouter>, div);
});

test('ApplicantSignup returns a valid function and element', () => {
  const applicantWidget = ApplicantSignup({ options: 'bar' });
  const routerProps = {
    router: {},
    location: {}
  }
  expect(typeof applicantWidget).toBe('function')
  expect(React.isValidElement(applicantWidget(routerProps))).toBe(true)
})