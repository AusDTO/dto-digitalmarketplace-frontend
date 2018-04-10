import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { SellerNotifyIntroduction } from './SellerNotifyIntroduction'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

test('Component mounts and sets its stage to "doing"', () => {
  const mockSetStatusChange = jest.fn()
  mount(<SellerNotifyIntroduction flow="unsuccessful" setStageStatus={mockSetStatusChange} />)

  expect(mockSetStatusChange.mock.calls.length).toBe(1)
  expect(mockSetStatusChange.mock.calls[0][0]).toBe('introduction')
  expect(mockSetStatusChange.mock.calls[0][1]).toBe('doing')
})

test('Clicking the continue button changes the status to "done" and moves to the next stage', () => {
  const mockSetStatusChange = jest.fn()
  const moveToNextStage = jest.fn()
  const component = mount(
    <SellerNotifyIntroduction
      flow="unsuccessful"
      setStageStatus={mockSetStatusChange}
      moveToNextStage={moveToNextStage}
    />
  )

  component.find('button').simulate('click')

  expect(mockSetStatusChange.mock.calls[1][0]).toBe('introduction')
  expect(mockSetStatusChange.mock.calls[1][1]).toBe('done')

  expect(moveToNextStage.mock.calls.length).toBe(1)
  expect(moveToNextStage.mock.calls[0][0]).toBe('introduction')
})
