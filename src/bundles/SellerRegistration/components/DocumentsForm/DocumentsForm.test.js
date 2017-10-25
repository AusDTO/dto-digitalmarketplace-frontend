// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
import React from 'react'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import { Provider } from 'react-redux'

import DocumentsForm from './DocumentsForm'
import createStore from '../../redux/create-signup'

test('DocumentsForm renders inputs when no documents are present', () => {
  const documents = {}

  const store = createStore({
    form_options: {
      csrf_token: 'abc',
    },
    documentsForm: { documents }
  });

  const wrapper = mount(
    <Provider store={store}>
      <DocumentsForm/>
    </Provider>
  )

  let inputs = wrapper.find('[type="file"]');
  expect(inputs.length).toBe(3);
});

test('DocumentsForm renders links when documents are present', () => {
  const documents = {
      financial: {
        filename: 'ezidox_Architecture_Diagram_-_Oct_2016.pdf'
      },
      liability: {
        filename: 'financial_2.pdf',
        expiry: '2020-02-01'
      },
      workers: {
        filename: 'financial1.pdf'
      }
    }

  const store = createStore({
    form_options: {
      csrf_token: 'abc',
    },
    documentsForm: { documents }
  });

  const wrapper = mount(
    <Provider store={store}>
      <DocumentsForm/>
    </Provider>
  )

  let links = wrapper.find('ul.bordered-list');
  expect(links.length).toBe(3);
});
