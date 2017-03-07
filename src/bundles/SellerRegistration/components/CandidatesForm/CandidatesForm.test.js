// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
import React from 'react'
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom';

import CandidatesForm from './CandidatesForm'
import createStore from '../../redux/create-signup'

test('Candidates form displays list of domains', () => {
  const store = createStore({
    form_options: {
      csrf_token: 'abc',
    },
    recruiterForm: { recruiter: false }
  });

  const wrapper = mount(
    <StaticRouter context={{}}>
       <Provider store={store}>
        <CandidatesForm services={{'Support and Operations': '1', 'Content and Publishing': '1'}}/>
      </Provider>
    </StaticRouter>
  )
  let inputs = wrapper.find('h2');
  expect(inputs.length).toBe(2);
});
