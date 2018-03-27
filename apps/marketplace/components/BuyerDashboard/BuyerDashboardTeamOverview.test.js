import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BuyerDashboardTeamOverview } from './BuyerDashboardTeamOverview'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

test('Team overview page shows a table of team members', () => {
  const props = {
    items: [
      {
        name: 'Team member 1',
        email: 'teammember1@test.com'
      },
      {
        name: 'Team member 2',
        email: 'teammember2@test.com'
      }
    ],
    loadData: () => {}
  }

  const component = mount(<BuyerDashboardTeamOverview {...props} />)

  // 3 because 1 is the header row, 2 for the items.
  expect(component.find('table tr').length).toEqual(3)
})
