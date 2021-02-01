// FIXME This is a workaround.
// @see https://github.com/facebook/react/issues/7386
import React from 'react'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'

import DocumentsForm from './DocumentsForm'
import createStore from '../../redux/create-signup'

Enzyme.configure({ adapter: new Adapter() });

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
  expect(inputs.length).toBe(4);
});

test('DocumentsForm renders links when documents are present', () => {
  const documents = {
      financial: {
        filename: 'ezidox_Architecture_Diagram_-_Oct_2016.pdf'
      },
      liability: {
        filename: 'financial_2.pdf',
        expiry: '2021-02-01'
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
  expect(links.length).toBe(2);
});

describe('DocumentsForm expiry dates', () => {
  it('should be disabled when an expiry date has been provided', () => {
    let store = createStore({
      documentsForm: {
        documents: {
          liability: {
            expiry: '2021-03-01',
            filename: 'liability.pdf'
          }
        }
      }
    })

    const wrapper = mount(
      <Provider store={store}>
        <DocumentsForm/>
      </Provider>
    )

    const liabilityDay = wrapper.find('#liability_expiry-day')
    const liabilityMonth = wrapper.find('#liability_expiry-month')
    const liabilityYear = wrapper.find('#liability_expiry-year')

    expect(liabilityDay.props().disabled).toBe(true)
    expect(liabilityMonth.props().disabled).toBe(true)
    expect(liabilityYear.props().disabled).toBe(true)
  })

  it('should not be disabled when an expiry date has not been provided', () => {
    let store = createStore({
      documentsForm: {
        documents: {
          workers: {
            expiry: '',
            filename: 'workers.pdf'
          }
        }
      }
    })
    
    const wrapper = mount(
      <Provider store={store}>
        <DocumentsForm/>
      </Provider>
    )

    const workersDay = wrapper.find('#workers_expiry-day')
    const workersMonth = wrapper.find('#workers_expiry-month')
    const workersYear = wrapper.find('#workers_expiry-year')

    expect(workersDay.props().disabled).toBe(false)
    expect(workersMonth.props().disabled).toBe(false)
    expect(workersYear.props().disabled).toBe(false)
  })
})

describe('Expired documents', () => {
  it('should not be visible', () => {
    let store = createStore({
      documentsForm: {
        documents: {
          workers: {
            expiry: '2015-07-31',
            filename: 'workers.pdf'
          }
        }
      }
    })
    
    const wrapper = mount(
      <Provider store={store}>
        <DocumentsForm/>
      </Provider>
    )

    const workersLabel = wrapper.find('#label_workers')
    expect(workersLabel.text()).toEqual(' Choose file ')
  })
})
