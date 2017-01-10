jest.mock('react-router');
jest.mock('../../../../shared/Icon/_getIcons');

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { actions } from 'react-redux-form';

import ProfileEdit, { mapStateToProps, ProfileEditClass } from './ProfileEdit';
import sampleState from '../../ApplicantSignup.json';

import createStore from '../../redux/create-signup'

test('mapStateToProps with application', () => {
  const state = {
    someForm: {
      foo: 'bar'
    },
    randomKey: 'baz',
    application: {
      bar: 'baz'
    }
  };

  const expectedProps = {
    forms: {
      someForm: {
        foo: 'bar'
      }
    },
    application: {
      bar: 'baz'
    },
    steps: void 0
  };

  expect(mapStateToProps(state)).toEqual(expectedProps);
});

test('mapStateToProps without application', () => {
  const state = {
    someForm: {
      foo: 'bar'
    },
    randomKey: 'baz'
  };

  const expectedProps = {
    forms: {
      someForm: {
        foo: 'bar'
      }
    },
    application: {},
    steps: void 0
  };

  expect(mapStateToProps(state)).toEqual(expectedProps);
})

test('elementProps onSubmit', () => {
  delete sampleState.basename;
  let store = createStore(Object.assign({}, sampleState));

  const dispatch = jest.fn();
  const transitionTo = jest.fn();
  const preventDefault = jest.fn();

  const mockEvent = {
    preventDefault
  }

  const props = {
    location: {
      pathname: '/'
    },
    router: {
      transitionTo
    },
    dispatch,
    store,
    forms: {
      domainSelectorForm: {},
      businessDetailsForm: {},
      yourInfoForm: {}
    }
  }

  const wrapper = mount(
    <ProfileEditClass {...props} />
  )

  const { onSubmit } = wrapper.instance().elementProps;

  onSubmit(mockEvent);

  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledTimes(1);
});

test('elementProps onSubmit with no event', () => {
  delete sampleState.basename;
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = compose;
  let store = createStore(Object.assign({}, sampleState));

  const dispatch = jest.fn();
  const transitionTo = jest.fn();

  const props = {
    location: {
      pathname: '/'
    },
    router: {
      transitionTo
    },
    dispatch,
    store,
    forms: {
      domainSelectorForm: {},
      businessDetailsForm: {},
      yourInfoForm: {}
    }
  }

  const wrapper = mount(
    <ProfileEditClass {...props} />
  )

  const { onSubmit } = wrapper.instance().elementProps;

  onSubmit();

  expect(dispatch).toHaveBeenCalledTimes(1);
});

test.skip('elementProps onSubmit with no steps left', () => {
  delete sampleState.basename;
  let store = createStore(Object.assign({}, sampleState));

  const dispatch = jest.fn();
  const transitionTo = jest.fn();
  const preventDefault = jest.fn();

  const mockEvent = {
    preventDefault
  }

  const props = {
    location: {
      pathname: '/submit'
    },
    router: {
      transitionTo
    },
    dispatch,
    store,
    forms: {
      domainSelectorForm: {},
      businessDetailsForm: {},
      yourInfoForm: {}
    }
  }

  const wrapper = mount(
    <ProfileEditClass {...props} />
  )

  const { onSubmit } = wrapper.instance().elementProps;

  onSubmit(mockEvent);

  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledTimes(2);
});

