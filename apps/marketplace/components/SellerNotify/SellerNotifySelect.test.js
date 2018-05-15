import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { SellerNotifySelect } from './SellerNotifySelect'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

const sellers = [
  {
    supplier_code: 1,
    supplier_name: 'Supplier 1',
    successful: null
  },
  {
    supplier_code: 2,
    supplier_name: 'Supplier 2',
    successful: null
  }
]

test('Component mounts and sets its stage to "doing"', () => {
  const mockSetStatusChange = jest.fn()
  const mockHasSelectedASeller = jest.fn()
  mount(
    <SellerNotifySelect
      setStageStatus={mockSetStatusChange}
      hasSelectedASeller={mockHasSelectedASeller}
      selectedSellers={[]}
      sellers={sellers}
    />
  )

  expect(mockSetStatusChange.mock.calls.length).toBe(1)
  expect(mockSetStatusChange.mock.calls[0][0]).toBe('select')
  expect(mockSetStatusChange.mock.calls[0][1]).toBe('doing')
})

test('The continue button is disabled by default with no selected sellers', () => {
  const mockSetStatusChange = jest.fn()
  const mockHasSelectedASeller = jest.fn()
  const component = mount(
    <SellerNotifySelect
      setStageStatus={mockSetStatusChange}
      hasSelectedASeller={mockHasSelectedASeller}
      selectedSellers={[]}
      sellers={sellers}
    />
  )

  expect(component.find('button').get(0).props.disabled).toBeTruthy()
})

test('Clicking the continue button changes the status to "done" and moves to the next stage', () => {
  const mockSetStatusChange = jest.fn()
  const mockSetStageDoneStatus = jest.fn()
  const moveToNextStage = jest.fn()
  const mockHasSelectedASeller = jest.fn()
  mockHasSelectedASeller.mockReturnValue(true)
  const component = mount(
    <SellerNotifySelect
      setStageStatus={mockSetStatusChange}
      moveToNextStage={moveToNextStage}
      hasSelectedASeller={mockHasSelectedASeller}
      selectedSellers={sellers}
      sellers={sellers}
      setStageDoneStatus={mockSetStageDoneStatus}
    />
  )

  component.find('button').simulate('click')

  expect(mockSetStatusChange.mock.calls[1][0]).toBe('select')
  expect(mockSetStatusChange.mock.calls[1][1]).toBe('done')

  expect(mockSetStageDoneStatus.mock.calls[0][0]).toBe('select')
  expect(mockSetStageDoneStatus.mock.calls[0][1]).toBe(true)

  expect(moveToNextStage.mock.calls.length).toBe(1)
  expect(moveToNextStage.mock.calls[0][0]).toBe('select')
})

test('The checkbox for a selected seller is checked', () => {
  const mockSetStatusChange = jest.fn()
  const moveToNextStage = jest.fn()
  const mockHasSelectedASeller = jest.fn()
  mockHasSelectedASeller.mockReturnValue(true)
  const component = mount(
    <SellerNotifySelect
      setStageStatus={mockSetStatusChange}
      moveToNextStage={moveToNextStage}
      hasSelectedASeller={mockHasSelectedASeller}
      selectedSellers={[{ supplier_code: 1, supplier_name: 'Supplier 1' }]}
      sellers={sellers}
    />
  )

  expect(component.find('span').at(0).text()).toEqual('Supplier 1')
  expect(component.find('input').at(0).get(0).props.checked).toBeTruthy()

  expect(component.find('span').at(1).text()).toEqual('Supplier 2')
  expect(component.find('input').at(1).get(0).props.checked).toBeFalsy()
})

test('Clicking an unchecked checkbox executes the selectSeller property', () => {
  const mockSetStatusChange = jest.fn()
  const moveToNextStage = jest.fn()
  const mockHasSelectedASeller = jest.fn()
  const mockSelectSeller = jest.fn()
  const mockDeselectSeller = jest.fn()
  mockHasSelectedASeller.mockReturnValue(true)
  const component = mount(
    <SellerNotifySelect
      setStageStatus={mockSetStatusChange}
      moveToNextStage={moveToNextStage}
      hasSelectedASeller={mockHasSelectedASeller}
      selectedSellers={[]}
      sellers={sellers}
      selectSeller={mockSelectSeller}
      deselectSeller={mockDeselectSeller}
    />
  )

  component.find('input').at(0).simulate('change', { target: { checked: true } })
  expect(mockSelectSeller.mock.calls.length).toBe(1)
  expect(mockDeselectSeller.mock.calls.length).toBe(0)
})

test('Clicking a checked checkbox executes the deselectSeller property', () => {
  const mockSetStatusChange = jest.fn()
  const moveToNextStage = jest.fn()
  const mockHasSelectedASeller = jest.fn()
  const mockSelectSeller = jest.fn()
  const mockDeselectSeller = jest.fn()
  mockHasSelectedASeller.mockReturnValue(true)
  const component = mount(
    <SellerNotifySelect
      setStageStatus={mockSetStatusChange}
      moveToNextStage={moveToNextStage}
      hasSelectedASeller={mockHasSelectedASeller}
      selectedSellers={[{ supplier_code: 1, supplier_name: 'Supplier 1' }]}
      sellers={sellers}
      selectSeller={mockSelectSeller}
      deselectSeller={mockDeselectSeller}
    />
  )

  component.find('input').at(0).simulate('change', { target: { checked: false } })
  expect(mockSelectSeller.mock.calls.length).toBe(0)
  expect(mockDeselectSeller.mock.calls.length).toBe(1)
})

test('Deselecting all sellers sets the done status to false', () => {
  const mockSetStatusChange = jest.fn()
  const mockSetStageDoneStatus = jest.fn()
  const moveToNextStage = jest.fn()
  const mockHasSelectedASeller = jest.fn()
  const mockDeselectSeller = (name, callback) => {
    callback()
  }
  const mockSelectSeller = jest.fn()
  mockHasSelectedASeller.mockReturnValue(false)
  const component = mount(
    <SellerNotifySelect
      setStageStatus={mockSetStatusChange}
      moveToNextStage={moveToNextStage}
      hasSelectedASeller={mockHasSelectedASeller}
      selectedSellers={[{ supplier_code: 1, supplier_name: 'Supplier 1' }]}
      sellers={sellers}
      selectSeller={mockSelectSeller}
      deselectSeller={mockDeselectSeller}
      setStageDoneStatus={mockSetStageDoneStatus}
    />
  )

  component.find('input').at(0).simulate('change', { target: { checked: false } })
  expect(mockSetStageDoneStatus.mock.calls[0][0]).toBe('select')
  expect(mockSetStageDoneStatus.mock.calls[0][1]).toBe(false)
})
