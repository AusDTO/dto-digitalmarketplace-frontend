jest.mock('react-router');
jest.mock('../../../../shared/Icon/_getIcons');

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { actions } from 'react-redux-form';

import Signup, { mapStateToProps, SignupClass } from './Signup';
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

test('elementProps onClick', () => {
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
      pathname: '/start'
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
    <SignupClass {...props} />
  )

  const { onClick } = wrapper.instance().elementProps;

  onClick(mockEvent);

  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledTimes(2);
});


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
    <SignupClass {...props} />
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
    <SignupClass {...props} />
  )

  const { onSubmit } = wrapper.instance().elementProps;

  onSubmit(mockEvent);

  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledTimes(2);
});

test('without filterSteps', () => {

  const Start = require('../../../SellerRegistration/components/Start').default;
  const YourInfoForm = require('../../../SellerRegistration/components/YourInfoForm').default;
  const BusinessDetailsForm = require('../../../SellerRegistration/components/BusinessDetailsForm').default;
  const BusinessInfoForm = require('../../../SellerRegistration/components/BusinessInfoForm').default;
  const DomainSelector = require('../../../SellerRegistration/components/DomainSelector').default;
  const DomainList = require('../../../CaseStudy/components/DomainList').default;
  const DocumentsForm = require('../../../SellerRegistration/components/DocumentsForm').default;
  const AwardsForm = require('../../../SellerRegistration/components/AwardsForm').default;
  const ToolsForm = require('../../../SellerRegistration/components/ToolsForm').default;
  const DisclosuresForm = require('../../../SellerRegistration/components/DisclosuresForm').default;
  const Review = require('../../../SellerRegistration/components/Review').default;
  const Submit = require('../../../SellerRegistration/components/Submit').default;
  const Finish = require('../../../SellerRegistration/components/Finish').default;
  const FinishProfile = require('../../../SellerRegistration/components/FinishProfile').default;
  const ProductsForm = require('../../../SellerRegistration/components/ProductsForm').default;

  delete sampleState.basename;
  let store = createStore(Object.assign({}, sampleState));

  const expectedSteps = [
      { id: 'start', label: 'Introduction', component: Start, pattern: '/start' },
      { id: 'info', label: 'Contact details', component: YourInfoForm, pattern: '/your-info', formKey: 'yourInfoForm' },
      { id: 'profile', label: 'Business basics', component: BusinessDetailsForm, pattern: '/business-details', formKey: 'businessDetailsForm' },
      { id: 'business', label: 'Business details', component: BusinessInfoForm, pattern: '/business-info', formKey: 'businessInfoForm' },
      { id: 'disclosures', label: 'Disclosures', component: DisclosuresForm, pattern: '/disclosures' },
      { id: 'documents', label: 'Documents', component: DocumentsForm, pattern: '/documents', formKey: 'documentsForm' },
      { id: 'tools', label: 'Methods', component: ToolsForm, pattern: '/tools', formKey: 'toolsForm' },
      { id: 'awards', label: 'Recognition', component: AwardsForm, pattern: '/awards', formKey: 'awardsForm' },
      { id: 'products', label: 'Products', component: ProductsForm, pattern: '/products', formKey: 'productForm' },
      { id: 'digital', label: 'Services', component: DomainSelector, pattern: '/domains', formKey: 'domainSelectorForm' },
      { id: 'casestudy', label: 'Case studies', component: DomainList, pattern: '/case-study', formKey: 'caseStudyForm' },
      { id: 'review', label: 'Review', component: Review, pattern: '/review' },
      { id: 'finish-profile', label: 'Finish', component: FinishProfile, pattern: '/profile-finish' },
      { id: 'submit', label: 'Declaration', component: Submit, pattern: '/submit' },
  ];

  const props = {
    location: {
      pathname: '/start'
    },
    router: {},
    dispatch: () => {},
    store,
    forms: {
      domainSelectorForm: {},
      businessDetailsForm: {},
      yourInfoForm: {}
    },
    options: {
      submit_registration: true
    }
  }

  const wrapper = mount(
    <SignupClass {...props} />
  )

  const { steps } = wrapper.instance();

  expect(steps).toEqual(expectedSteps);
  expect(steps.length).toBe(14);
});

test('filterSteps', () => {

  const YourInfoForm = require('../../../SellerRegistration/components/YourInfoForm').default;
  const BusinessDetailsForm = require('../../../SellerRegistration/components/BusinessDetailsForm').default;
  const BusinessInfoForm = require('../../../SellerRegistration/components/BusinessInfoForm').default;
  const DomainSelector = require('../../../SellerRegistration/components/DomainSelector').default;
  const DocumentsForm = require('../../../SellerRegistration/components/DocumentsForm').default;
  const AwardsForm = require('../../../SellerRegistration/components/AwardsForm').default;
  const ToolsForm = require('../../../SellerRegistration/components/ToolsForm').default;
  const DisclosuresForm = require('../../../SellerRegistration/components/DisclosuresForm').default;
  const ProductsForm = require('../../../SellerRegistration/components/ProductsForm').default;

  delete sampleState.basename;
  let store = createStore(Object.assign({}, sampleState));

  const expectedSteps = [
      { id: 'info', label: 'Contact details', component: YourInfoForm, pattern: '/your-info', formKey: 'yourInfoForm' },
      { id: 'profile', label: 'Business basics', component: BusinessDetailsForm, pattern: '/business-details', formKey: 'businessDetailsForm' },
      { id: 'business', label: 'Business details', component: BusinessInfoForm, pattern: '/business-info', formKey: 'businessInfoForm' },
      { id: 'disclosures', label: 'Disclosures', component: DisclosuresForm, pattern: '/disclosures' },
      { id: 'documents', label: 'Documents', component: DocumentsForm, pattern: '/documents', formKey: 'documentsForm' },
      { id: 'tools', label: 'Methods', component: ToolsForm, pattern: '/tools', formKey: 'toolsForm' },
      { id: 'awards', label: 'Recognition', component: AwardsForm, pattern: '/awards', formKey: 'awardsForm' },
      { id: 'products', label: 'Products', component: ProductsForm, pattern: '/products', formKey: 'productForm' },
      { id: 'digital', label: 'Services', component: DomainSelector, pattern: '/domains', formKey: 'domainSelectorForm' }
  ];

  const filterSteps = (step) => {
    // Remove steps with patterns of /start and /case-study and /review and /submit
    return !step.pattern.match(/\/start|\/case-study|\/review|\/submit|\/profile-finish/);
  }

  const props = {
    location: {
      pathname: '/start'
    },
    router: {},
    filterSteps,
    dispatch: () => {},
    store,
    forms: {
      domainSelectorForm: {},
      businessDetailsForm: {},
      yourInfoForm: {}
    }
  }

  const wrapper = mount(
    <SignupClass {...props} />
  )

  const { steps } = wrapper.instance();

  expect(steps).toEqual(expectedSteps);
  expect(steps.length).toBe(9);
});



