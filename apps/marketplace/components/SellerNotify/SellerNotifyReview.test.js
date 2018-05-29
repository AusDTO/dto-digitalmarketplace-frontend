import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { SellerNotifyReview } from './SellerNotifyReview'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

const sellers = [
  {
    supplier_code: 1,
    supplier_name: 'Supplier 1'
  },
  {
    supplier_code: 2,
    supplier_name: 'Supplier 2'
  }
]

const brief = {
  id: 1,
  title: 'Test brief',
  organisation: 'Some org'
}

test('Component mounts and sets its stage to "doing"', () => {
  const mockSetStatusChange = jest.fn()
  const mockHasSelectedASeller = jest.fn()
  const moveToStage = jest.fn()
  const handleSubmit = jest.fn()
  const setStageDoneStatus = jest.fn()
  const handleReturnToOverviewClick = jest.fn()
  mount(
    <SellerNotifyReview
      flow="unsuccessful"
      brief={brief}
      setStageStatus={mockSetStatusChange}
      hasSelectedASeller={mockHasSelectedASeller}
      selectedSellers={sellers}
      handleSubmit={handleSubmit}
      setStageDoneStatus={setStageDoneStatus}
      handleReturnToOverviewClick={handleReturnToOverviewClick}
      moveToStage={moveToStage}
    />
  )

  expect(mockSetStatusChange.mock.calls.length).toBe(1)
  expect(mockSetStatusChange.mock.calls[0][0]).toBe('review')
  expect(mockSetStatusChange.mock.calls[0][1]).toBe('doing')
})

test('Having no selected sellers shows an error alert', () => {
  const mockSetStatusChange = jest.fn()
  const mockHasSelectedASeller = jest.fn()
  const moveToStage = jest.fn()
  const handleSubmit = jest.fn()
  const setStageDoneStatus = jest.fn()
  const handleReturnToOverviewClick = jest.fn()
  const component = mount(
    <SellerNotifyReview
      flow="unsuccessful"
      brief={brief}
      setStageStatus={mockSetStatusChange}
      hasSelectedASeller={mockHasSelectedASeller}
      selectedSellers={[]}
      handleSubmit={handleSubmit}
      setStageDoneStatus={setStageDoneStatus}
      handleReturnToOverviewClick={handleReturnToOverviewClick}
      moveToStage={moveToStage}
    />
  )

  expect(component.find('div[role="alert"]').length).toBe(1)
})

test('Form submit sends type, subject, email content, and the selected sellers list to the API', () => {
  const mockSetStatusChange = jest.fn()
  const mockSetStageDoneStatus = jest.fn()
  const mockHasSelectedASeller = jest.fn()
  const mockHandleSubmit = jest.fn()
  mockHasSelectedASeller.mockReturnValue(true)
  const moveToStage = jest.fn()
  const handleReturnToOverviewClick = jest.fn()
  const component = mount(
    <SellerNotifyReview
      flow="unsuccessful"
      brief={brief}
      setStageStatus={mockSetStatusChange}
      hasSelectedASeller={mockHasSelectedASeller}
      selectedSellers={[{ supplier_code: 2, supplier_name: 'Supplier 2' }]}
      handleSubmit={mockHandleSubmit}
      setStageDoneStatus={mockSetStageDoneStatus}
      handleReturnToOverviewClick={handleReturnToOverviewClick}
      moveToStage={moveToStage}
    />
  )

  component.find('form').simulate('submit')

  expect(mockHandleSubmit.mock.calls.length).toBe(1)
  expect(mockHandleSubmit.mock.calls[0][0]).toEqual(1)
  const model = mockHandleSubmit.mock.calls[0][1]
  expect(Object.keys(model)).toEqual(['flow', 'subject', 'content', 'selectedSellers'])
})
