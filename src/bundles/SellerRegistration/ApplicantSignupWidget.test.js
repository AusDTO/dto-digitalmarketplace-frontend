// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');
jest.mock('../../shared/Icon/_getIcons');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router as MemoryRouter } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import { ApplicantSignup } from './ApplicantSignupWidget';


test('ApplicantSignupWidget renders without crashing', () => {
  const div = document.createElement('div');
  const history = createMemoryHistory();
  ReactDOM.render(
    <MemoryRouter history={history}>
      <ApplicantSignup />
    </MemoryRouter>, div);
});