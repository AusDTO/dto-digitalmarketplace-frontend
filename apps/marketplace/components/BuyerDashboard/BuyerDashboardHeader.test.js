import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import BuyerDashboardHeader from './BuyerDashboardHeader'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

test('Displays the organisation', () => {
  const props = {
    organisation: 'Digital Transformation Agency'
  }

  const component = mount(
    <MemoryRouter>
      <BuyerDashboardHeader {...props} />
    </MemoryRouter>
  )

  expect(component.find('small').text()).toEqual('Digital Transformation Agency')
})

test('Sets My briefs tab to active when accessing the default/root route', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/']}>
      <BuyerDashboardHeader />
    </MemoryRouter>
  )
  expect(component.find('#my-briefs-link').get(1).props.className).toEqual('active')
})

test('Sets Team briefs tab to active when accessing the team briefs route', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/team-briefs']}>
      <BuyerDashboardHeader />
    </MemoryRouter>
  )
  expect(component.find('#team-briefs-link').get(1).props.className).toEqual('active')
})

test('Sets Team overview tab to active when accessing the team overview route', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/team-overview']}>
      <BuyerDashboardHeader />
    </MemoryRouter>
  )
  expect(component.find('#team-overview-link').get(1).props.className).toEqual('active')
})
