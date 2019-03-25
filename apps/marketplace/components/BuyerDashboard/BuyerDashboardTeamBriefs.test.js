import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import addDays from 'date-fns/add_days'
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

test('My briefs shows correctly formatted closing time for a future date', () => {
  const curDate = new Date()
  const futureDate = addDays(curDate, 14)
  const offsetDiff = curDate.getTimezoneOffset() - futureDate.getTimezoneOffset()

  const props = {
    items: [
      {
        id: 1,
        name: 'Brief 1',
        status: 'live',
        closed_at: futureDate.toISOString()
      }
    ],
    loadData: () => {}
  }

  const component = mount(<BuyerDashboardTeamBriefs {...props} />)
  let expectedDate = ''
  switch (offsetDiff) {
    case -60:
      expectedDate = '2w : 0d : 0h'
      break
    case 60:
      expectedDate = '1w : 6d : 22h'
      break
    case 0:
    default:
      expectedDate = '1w : 6d : 23h'
      break
  }

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
