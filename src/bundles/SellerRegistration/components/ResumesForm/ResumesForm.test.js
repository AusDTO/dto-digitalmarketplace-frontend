// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
import React from 'react'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import { Provider } from 'react-redux'

import ResumesForm from './ResumesForm'
import createStore from '../../redux/create-signup'

test('ResumesForm renders inputs when no documents are present', () => {
  const documents = {}

  const store = createStore({
    form_options: {
      csrf_token: 'abc',
    },
    resumesForm: { documents }
  });

  const wrapper = mount(
    <Provider store={store}>
      <ResumesForm services={{'User research':true}}/>
    </Provider>
  )

  let inputs = wrapper.find('[type="file"]');
  expect(inputs.length).toBe(1);
});

test('ResumesForm renders links when documents are present', () => {
  const documents = {
      'User research': {
        filename: 'financial_2.pdf',
        rate: '2020'
      }
    }

  const store = createStore({
    form_options: {
      csrf_token: 'abc',
    },
    resumesForm: { resumes: documents }
  });

  const wrapper = mount(
    <Provider store={store}>
      <ResumesForm services={{'User research':true}}/>
    </Provider>
  )

  let links = wrapper.find('ul.bordered-list');
  expect(links.length).toBe(1);
});
