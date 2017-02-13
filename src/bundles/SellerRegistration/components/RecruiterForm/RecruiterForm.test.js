// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
import React from 'react'
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom';

import RecruiterForm from './RecruiterForm'
import createStore from '../../redux/create-signup'

test('Recruiter form hides inputs when recruiter = false', () => {
  const store = createStore({
    form_options: {
      csrf_token: 'abc',
    },
    recruiterForm: { recruiter: false }
  });

  const wrapper = mount(
    <StaticRouter context={{}}>
       <Provider store={store}>
        <RecruiterForm/>
      </Provider>
    </StaticRouter>
  )
  let inputs = wrapper.find('div.field');
  expect(inputs.length).toBe(0);
});

test('Recruiter form shows inputs when recruiter = true', () => {
  const store = createStore({
    form_options: {
      csrf_token: 'abc',
    },
    recruiterForm: { recruiter: true }
  });

  const wrapper = mount(
    <StaticRouter context={{}}>
       <Provider store={store}>
        <RecruiterForm/>
      </Provider>
    </StaticRouter>
  )

  let inputs = wrapper.find('div.field');
  expect(inputs.length).toBeGreaterThan(0);
});
