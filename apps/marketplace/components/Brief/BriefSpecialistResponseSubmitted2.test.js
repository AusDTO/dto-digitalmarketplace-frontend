import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'marketplace/store'
import BriefSpecialistResponseSubmitted2 from './BriefSpecialistResponseSubmitted2'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

const store = configureStore()

describe('BriefSpecialistResponseSubmitted', () => {
  test('shows button when 1 submitted response', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseSubmitted2
          specialistGivenNames="a"
          specialistSurname="b"
          briefResponsePreviousStatus="draft"
          briefResponse={{
            specialistGivenNames: 'aaa',
            specialistSurname: 'bbb'
          }}
          briefResponses={[{ id: 1, status: 'submitted' }]}
          brief={{ applicationsClosedAt: '3/15/2018', numberOfSuppliers: '3' }}
        />
      </Provider>
    )

    expect(tree.contains(<span>You have successfully submitted aaa bbb for this opportunity.</span>)).toBeTruthy()
    expect(
      tree
        .find('a.au-btn')
        .first()
        .text()
    ).toEqual('Edit or submit candidates')
  })

  test('does not shows button when 3 submitted responses', () => {
    const tree = mount(
      <Provider store={store}>
        <BriefSpecialistResponseSubmitted2
          specialistGivenNames="a"
          specialistSurname="b"
          briefResponsePreviousStatus="draft"
          briefResponse={{
            specialistGivenNames: 'aaa',
            specialistSurname: 'bbb'
          }}
          briefResponses={[
            { id: 1, status: 'submitted' },
            { id: 2, status: 'submitted' },
            { id: 3, status: 'submitted' }
          ]}
          brief={{ applicationsClosedAt: '3/15/2018' }}
        />
      </Provider>
    )

    expect(tree.contains(<span>You have successfully submitted aaa bbb for this opportunity.</span>)).toBeTruthy()
    expect(tree.find('a.au-btn').exists()).toBeFalsy()
  })
})
