import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BuyerDashboardTeamBriefs } from './BuyerDashboardTeamBriefs'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

test('Team briefs page shows a table of briefs', () => {
  const props = {
    items: [
      {
        id: 1,
        name: 'Brief 1',
        status: 'closed',
        closed_at: ''
      },
      {
        id: 2,
        name: 'Brief 2',
        status: 'closed',
        closed_at: ''
      }
    ],
    loadData: () => {}
  }

  const component = mount(<BuyerDashboardTeamBriefs {...props} />)

  // 3 because 1 is the header row, 2 for the items.
  expect(component.find('table tr').length).toEqual(3)
})

test('My briefs shows correctly formatted Canberra closing time for a future date', () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  date.setMonth(0)

  const props = {
    items: [
      {
        id: 1,
        name: 'Brief 1',
        status: 'live',
        closed_at: date.toISOString()
      }
    ],
    loadData: () => {}
  }

  const component = mount(<BuyerDashboardTeamBriefs {...props} />)
  const expectedDate = `6pm, ${date.getDate()} January ${date.getFullYear()}`

  expect(
    component
      .find('table td')
      .at(3)
      .text()
  ).toEqual(expectedDate)
})

test('My briefs shows "Closed" for past date', () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 1)
  const props = {
    items: [
      {
        id: 1,
        name: 'Brief 1',
        status: 'live',
        closed_at: date.toISOString()
      }
    ],
    loadData: () => {}
  }

  const component = mount(<BuyerDashboardTeamBriefs {...props} />)

  expect(
    component
      .find('table td')
      .at(3)
      .text()
  ).toEqual('Closed')
})

test('My briefs page shows appropriate actions for each brief in the table', () => {
  const props = {
    items: [
      {
        id: 1,
        name: 'Brief 1',
        status: 'live',
        closed_at: ''
      },
      {
        id: 2,
        name: 'Brief 2',
        status: 'closed',
        closed_at: ''
      },
      {
        id: 3,
        name: 'Brief 3',
        status: 'withdrawn',
        closed_at: ''
      }
    ],
    loadData: () => {}
  }

  const component = mount(<BuyerDashboardTeamBriefs {...props} />)

  // the live brief
  expect(
    component
      .find('table tr')
      .at(1)
      .find('td')
      .at(5)
      .text()
  ).toEqual('Answer a question')

  // the closed brief
  expect(
    component
      .find('table tr')
      .at(2)
      .find('td')
      .at(5)
      .text()
  ).toEqual('')

  // the withdrawn brief
  expect(
    component
      .find('table tr')
      .at(3)
      .find('td')
      .at(5)
      .text()
  ).toEqual('')
})
