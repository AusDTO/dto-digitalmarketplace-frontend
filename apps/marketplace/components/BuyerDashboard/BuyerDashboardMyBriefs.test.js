import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import addDays from 'date-fns/add_days'
import { BuyerDashboardMyBriefs } from './BuyerDashboardMyBriefs'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

test('My briefs page shows a table of briefs', () => {
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
        status: 'live',
        closed_at: ''
      }
    ],
    loadData: () => {}
  }

  const component = mount(<BuyerDashboardMyBriefs {...props} />)

  // 3 because 1 is the header row, 2 for the items.
  expect(component.find('table tr').length).toEqual(3)
})

test('My briefs shows a message and not a table when there is no briefs to show', () => {
  const props = {
    items: [],
    loadData: () => {}
  }

  const component = mount(<BuyerDashboardMyBriefs {...props} />)

  expect(component.find('table tr').length).toEqual(0)
  expect(
    component
      .find('h2')
      .first()
      .text()
  ).toEqual('Start your first brief')
})

test('My briefs shows correctly formatted closing time for a future date', () => {
  const date = addDays(new Date(), 14)

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

  const component = mount(<BuyerDashboardMyBriefs {...props} />)
  const expectedDate = '1w : 6d : 23h'

  expect(
    component
      .find('table td')
      .at(2)
      .find('span')
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

  const component = mount(<BuyerDashboardMyBriefs {...props} />)

  expect(
    component
      .find('table td')
      .at(2)
      .find('span')
      .text()
  ).toEqual('Closed')
})
