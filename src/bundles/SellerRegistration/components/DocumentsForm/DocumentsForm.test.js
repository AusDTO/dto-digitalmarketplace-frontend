// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
import React from 'react'
import { mount } from 'enzyme';
import { Provider } from 'react-redux'

import DocumentsForm from './DocumentsForm'
import createStore from '../../redux/create-signup'

test('DocumentsForm renders inputs when no documents are present', () => {
  const documents = {}  
  const store = createStore({
    form_options: {
      csrf_token: 'abc',
    },
    documentsForm: {documents}
  });

  const wrapper = mount(
    <Provider store={store}>
      <DocumentsForm/>
    </Provider>
  )

  let inputs = wrapper.find('[type="file"]');
  expect(inputs.length).toBe(4);
});

test('DocumentsForm renders links when documents are present', () => {
  const documents = {
      "deed": "workers.png",
      "financial": "ezidox_Architecture_Diagram_-_Oct_2016.pdf",
      "liability": "financial_2.pdf",
      "workers": "financial1.pdf"
    }  
  const store = createStore({
    form_options: {
      csrf_token: 'abc',
    },
    documentsForm: {documents}
  });

  const wrapper = mount(
    <Provider store={store}>
      <DocumentsForm/>
    </Provider>
  )

  let links = wrapper.find('a');
  expect(links.length).toBe(4);
});
