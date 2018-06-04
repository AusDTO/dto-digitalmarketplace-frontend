import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { SellerNotifyIntroduction } from './SellerNotifyIntroduction'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

test('Component mounts and sets its stage to "doing" and the "done" status as true', () => {
  const mockSetStatusChange = jest.fn()
  const mockSetStageDoneStatus = jest.fn()
  const moveToNextStage = jest.fn()
  const handleReturnToOverviewClick = jest.fn()
  mount(
    <SellerNotifyIntroduction
      flow="unsuccessful"
      setStageStatus={mockSetStatusChange}
      setStageDoneStatus={mockSetStageDoneStatus}
      moveToNextStage={moveToNextStage}
      handleReturnToOverviewClick={handleReturnToOverviewClick}
    />
  )

  expect(mockSetStatusChange.mock.calls.length).toBe(1)
  expect(mockSetStatusChange.mock.calls[0][0]).toBe('introduction')
  expect(mockSetStatusChange.mock.calls[0][1]).toBe('doing')

  expect(mockSetStageDoneStatus.mock.calls.length).toBe(1)
  expect(mockSetStageDoneStatus.mock.calls[0][0]).toBe('introduction')
  expect(mockSetStageDoneStatus.mock.calls[0][1]).toBe(true)
})

test('Clicking the continue button changes the status to "done" and moves to the next stage', () => {
  const mockSetStatusChange = jest.fn()
  const mockSetStageDoneStatus = jest.fn()
  const moveToNextStage = jest.fn()
  const handleReturnToOverviewClick = jest.fn()
  const component = mount(
    <SellerNotifyIntroduction
      flow="unsuccessful"
      setStageStatus={mockSetStatusChange}
      moveToNextStage={moveToNextStage}
      setStageDoneStatus={mockSetStageDoneStatus}
      handleReturnToOverviewClick={handleReturnToOverviewClick}
    />
  )

  component.find('button').at(0).simulate('click')
  expect(mockSetStatusChange.mock.calls[1][0]).toBe('introduction')
  expect(mockSetStatusChange.mock.calls[1][1]).toBe('done')

  expect(mockSetStageDoneStatus.mock.calls[1][0]).toBe('introduction')
  expect(mockSetStageDoneStatus.mock.calls[1][1]).toBe(true)

  expect(moveToNextStage.mock.calls.length).toBe(1)
  expect(moveToNextStage.mock.calls[0][0]).toBe('introduction')
})
