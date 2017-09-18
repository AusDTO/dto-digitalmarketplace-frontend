// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
jest.mock('react-dom');

import React from 'react';
import {ConnectedRejectedForm} from './RejectNotification';
import renderer from 'react-test-renderer';

import createStore from '../../redux/create';
const sampleState = './RejectNotification.json'

test('RejectedNotificationForm with required attributes', () => {
  const store = createStore(Object.assign({},  sampleState));
  const component = renderer.create(
    <ConnectedRejectedForm
      store={store}
      message="email template default text"
      onClose={() => {return null}}
      appID={17}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

