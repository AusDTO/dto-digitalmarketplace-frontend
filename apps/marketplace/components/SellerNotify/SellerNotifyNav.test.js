import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { rootPath } from 'marketplace/routes'
import { SellerNotifyNav } from './SellerNotifyNav'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

const stages = {
  introduction: 'todo',
  select: 'todo',
  review: 'todo'
}

test('Nav links are based on the flow property', () => {
  const component = mount(<SellerNotifyNav flow="testflow" briefId="1" stages={stages} />)
  const links = component.find('a')
  expect(links.length).toEqual(3)
  expect(links.get(0).props.href).toEqual(`${rootPath}/brief/1/seller-testflow`)
  expect(links.get(1).props.href).toEqual(`${rootPath}/brief/1/seller-testflow/select`)
  expect(links.get(2).props.href).toEqual(`${rootPath}/brief/1/seller-testflow/review`)
})

test('Nav link clicks changes the status of the stage to "doing"', () => {
  const mockSetStatusChange = jest.fn()
  const mockHistoryAPI = jest.fn()
  const component = mount(
    <SellerNotifyNav
      flow="testflow"
      stages={stages}
      match={{ params: { briefId: 1 } }}
      history={{ push: mockHistoryAPI }}
      setStageStatus={mockSetStatusChange}
    />
  )

  component.find('a').at(0).simulate('click')
  expect(mockHistoryAPI.mock.calls.length).toBe(1)
  expect(mockSetStatusChange.mock.calls[0][0]).toBe('introduction')
  expect(mockSetStatusChange.mock.calls[0][1]).toBe('doing')

  component.find('a').at(1).simulate('click')
  expect(mockHistoryAPI.mock.calls.length).toBe(2)
  expect(mockSetStatusChange.mock.calls[1][0]).toBe('select')
  expect(mockSetStatusChange.mock.calls[1][1]).toBe('doing')
})
