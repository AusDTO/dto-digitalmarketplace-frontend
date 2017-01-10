// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');
jest.mock('../../../../shared/Icon/_getIcons');

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { actions } from 'react-redux-form';
import renderer from 'react-test-renderer';

import ProfileEdit from './ProfileEdit';
import sampleState from '../../ApplicantSignup.json';
import createStore from '../../redux/create-signup';

test('ProfileEdit renders empty Your Info form', () => {
  let store = createStore({})
  const component = renderer.create(
    <MemoryRouter initialEntries={['/your-info']} initialIndex={0}>
      {({ action, location, router }) => (
        <Provider store={store}>
          <ProfileEdit router={router} location={location} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ProfileEdit renders populated Your Info form', () => {
  delete sampleState.basename;
  let store = createStore(Object.assign({}, sampleState))
  const component = renderer.create(
    <MemoryRouter initialEntries={['/your-info']} initialIndex={0}>
      {({ action, location, router }) => (
        <Provider store={store}>
          <ProfileEdit router={router} location={location} />
        </Provider>
      )}
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});