jest.mock('react-router');
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { actions } from 'react-redux-form';

import Signup, { mapStateToProps, SignupClass } from './Signup';
import sampleState from '../../ApplicantSignup.json';

import createStore from '../../redux/create'

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
    }
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
    application: {}
  };

  expect(mapStateToProps(state)).toEqual(expectedProps);
})

test('elementProps onClick', () => {
  delete sampleState.basename;
  let store = createStore(Object.assign({}, 
    sampleState, 
    { _serverContext: {} }
  ));

  const dispatch = jest.fn();
  const transitionTo = jest.fn();
  const preventDefault = jest.fn();

  const mockEvent = {
    preventDefault
  }

  const props = {
    location: {
      pathname: '/start'
    },
    router: {
      transitionTo
    },
    dispatch,
    store
  }

  const wrapper = mount(
    <SignupClass {...props} />
  )

  const { onClick } = wrapper.instance().elementProps;

  onClick(mockEvent);

  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledTimes(1);
});


test('elementProps onSubmit', () => {
  delete sampleState.basename;
  let store = createStore(Object.assign({}, 
    sampleState, 
    { _serverContext: {} }
  ));

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
    store
  }

  const wrapper = mount(
    <SignupClass {...props} />
  )

  const { onSubmit } = wrapper.instance().elementProps;

  onSubmit(mockEvent);

  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledTimes(1);
});

test('elementProps onSubmit with no event', () => {
  delete sampleState.basename;
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = compose;
  let store = createStore(Object.assign({}, 
    sampleState, 
    { _serverContext: {} }
  ));

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
    store
  }

  const wrapper = mount(
    <SignupClass {...props} />
  )

  const { onSubmit } = wrapper.instance().elementProps;

  onSubmit();

  expect(dispatch).toHaveBeenCalledTimes(1);
});

test('elementProps onSubmit with no steps left', () => {
  delete sampleState.basename;
  let store = createStore(Object.assign({}, 
    sampleState, 
    { _serverContext: {} }
  ));

  const dispatch = jest.fn();
  const transitionTo = jest.fn();
  const preventDefault = jest.fn();

  const mockEvent = {
    preventDefault
  }

  const props = {
    location: {
      pathname: '/case-study'
    },
    router: {
      transitionTo
    },
    dispatch,
    store
  }

  const wrapper = mount(
    <SignupClass {...props} />
  )

  const { onSubmit } = wrapper.instance().elementProps;

  onSubmit(mockEvent);

  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledTimes(1);
});

test('without filterSteps', () => {

  const Start = require('../../../SellerRegistration/components/Start').default;
  const YourInfoForm = require('../../../SellerRegistration/components/YourInfoForm').default;
  const BusinessDetailsForm = require('../../../SellerRegistration/components/BusinessDetailsForm').default;
  const CaseStudyForm = require('../../../CaseStudy/components/CaseStudyForm').default;

  delete sampleState.basename;
  let store = createStore(Object.assign({},
    sampleState,
    { _serverContext: {} }
  ));

  const expectedSteps = [
    { label: 'Start', component: Start, pattern: '/start', exact: true },
    { label: 'Your Info', component: YourInfoForm, pattern: '/your-info', exact: true },
    { label: 'Business Details', component: BusinessDetailsForm, pattern: '/business-details', exact: true },
    { label: 'Case Study', component: CaseStudyForm, pattern: '/case-study', exact: true },
  ];

  const props = {
    location: {
      pathname: '/start'
    },
    router: {},
    dispatch: () => {},
    store
  }

  const wrapper = mount(
    <SignupClass {...props} />
  )

  const { steps } = wrapper.instance();

  expect(steps).toEqual(expectedSteps);
  expect(steps.length).toBe(4);
});

test('filterSteps', () => {

  const YourInfoForm = require('../../../SellerRegistration/components/YourInfoForm').default;
  const BusinessDetailsForm = require('../../../SellerRegistration/components/BusinessDetailsForm').default;

  delete sampleState.basename;
  let store = createStore(Object.assign({},
    sampleState,
    { _serverContext: {} }
  ));

  const expectedSteps = [
    { label: 'Your Info', component: YourInfoForm, pattern: '/your-info', exact: true },
    { label: 'Business Details', component: BusinessDetailsForm, pattern: '/business-details', exact: true },
  ];

  const filterSteps = (step) => {
    // Remove steps with patterns of /start and /case-study
    return !step.pattern.match(/\/start|\/case-study/);
  }

  const props = {
    location: {
      pathname: '/start'
    },
    router: {},
    filterSteps,
    dispatch: () => {},
    store
  }

  const wrapper = mount(
    <SignupClass {...props} />
  )

  const { steps } = wrapper.instance();

  expect(steps).toEqual(expectedSteps);
  expect(steps.length).toBe(2);
});



