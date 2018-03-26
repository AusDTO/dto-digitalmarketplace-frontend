import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BuyerDashboardHeader } from './BuyerDashboardHeader'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

test('Displays the organisation', () => {
  const props = {
    items: [],
    location: '',
    organisation: 'Digital Transformation Agency'
  }

  const component = mount(<BuyerDashboardHeader {...props} />)

  expect(component.find('small').text()).toEqual('Digital Transformation Agency')
})

test('Sets My briefs tab to active when accessing /2/buyer-dashboard', () => {
  const props = {
    items: [],
    location: {
      pathname: '/2/buyer-dashboard'
    }
  }

  const component = mount(<BuyerDashboardHeader {...props} />)
  expect(component.find('#my-briefs-link').get(0).props.className).toEqual('active')
})

test('Sets Team briefs tab to active when accessing /2/buyer-dashboard/team-briefs', () => {
  const props = {
    items: [],
    location: {
      pathname: '/2/buyer-dashboard/team-briefs'
    }
  }

  const component = mount(<BuyerDashboardHeader {...props} />)
  expect(component.find('#team-briefs-link').get(0).props.className).toEqual('active')
})

test('Sets Team overview tab to active when accessing /2/buyer-dashboard/team-overview', () => {
  const props = {
    items: [],
    location: {
      pathname: '/2/buyer-dashboard/team-overview'
    }
  }

  const component = mount(<BuyerDashboardHeader {...props} />)
  expect(component.find('#team-overview-link').get(0).props.className).toEqual('active')
})
