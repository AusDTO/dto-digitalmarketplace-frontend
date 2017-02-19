import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { actions } from 'react-redux-form';
import { Router as MemoryRouter } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';

import CaseStudyForm, { mapStateToProps } from './CaseStudyForm';
import sampleState from './CaseStudyForm.json';

import createStore from '../../redux/create'


const generateFormValidilityState = (valid) => {
  return {
    forms: {
      caseStudyForm: {
        $form: { valid }
      }
    },
    form_options: {
      mode: 'add',
      errors: []
    },
    casestudy: {},
    router: {}
  }
}

test('mapStateToProps', () => {
  const baseProps = {
    formErrors: [], 
    model: 'caseStudyForm', 
    mode: 'add', 
    errors: [], 
    returnLink: void 0,
    caseStudyForm: void 0,
    router: {},
    service: undefined,
    service_slug: ""
  };

  let state = generateFormValidilityState(true);
  let props = mapStateToProps(state, { router: {} });
  expect(props).toEqual(Object.assign({}, baseProps, { form: { valid: true } }));

  state = generateFormValidilityState(false);
  props = mapStateToProps(state, { router: {} });
  expect(props).toEqual(Object.assign({}, baseProps, { form: { valid: false }}));
});

test('form renders server side with errors', () => {
  const form_options = {
    csrf_token: 'sometoken',
    action: '/foo/bar',
    errors: {
      title: {
        required: true
      }
    }
  }

  let store = createStore(Object.assign({}, sampleState, { _serverContext: {}, form_options, options: { serverRender: false } }))
  const history = createMemoryHistory();
  const wrapper = mount(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <CaseStudyForm router={history} />
      </Provider>
    </MemoryRouter>
  )

  let errors = wrapper.find('.validation-message');
  expect(errors.length).toBe(6);
})

test('handleClick with formValid=false', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const history = createMemoryHistory();
  const wrapper = mount(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <CaseStudyForm router={history} />
      </Provider>
    </MemoryRouter>
  )

  wrapper.find('input[type="submit"]').simulate('click')
  expect(store.getState().forms.caseStudyForm.$form.valid).toBeFalsy()
});


test.skip('handleClick with formValid=true', () => {
  let state = Object.assign({}, sampleState);
  state.caseStudyForm.title = 'FooBar';

  let store = createStore(Object.assign({}, { _serverContext: {} }, state))
  const history = createMemoryHistory();
  const wrapper = mount(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <CaseStudyForm router={history} />
      </Provider>
    </MemoryRouter>
  )

  wrapper.find('input[type="submit"]').simulate('click');
  expect(wrapper.find('h1').text()).toBe('Reference for FooBar');
});

test.skip('handleClick when on last step', () => {
  let state = Object.assign({}, sampleState);
  state.caseStudyForm = Object.assign({}, state.caseStudyForm, {
    title: 'FooBar',
    acknowledge: true,
    permission: true,
    name: 'Full Name',
    role: 'Some Role',
    phone: '0000',
    email: 'MAIL'
  });

  let store = createStore(Object.assign({}, { _serverContext: {} }, state))
  const history = createMemoryHistory();
  const wrapper = mount(
    <MemoryRouter history={history}>
      <Provider store={store}>
        <CaseStudyForm router={history} />
      </Provider>
    </MemoryRouter>
  )

  wrapper.find('input[type="submit"]').simulate('click');
  expect(wrapper.find('h1').text()).toBe('Reference for FooBar');
  // Submit the form!
  wrapper.find('input[type="submit"]').simulate('click');
});


