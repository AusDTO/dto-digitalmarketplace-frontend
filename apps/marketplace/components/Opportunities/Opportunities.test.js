import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import addHours from 'date-fns/add_hours'
import addDays from 'date-fns/add_days'
import addWeeks from 'date-fns/add_weeks'
import subDays from 'date-fns/sub_days'
import Opportunities from './Opportunities'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

test('component mounts without any opportunities and shows a message', () => {
  const component = mount(<Opportunities opportunities={[]} />)

  expect(component.contains('There are no opportunities to show that match your filter.')).toBeTruthy()
})

test('component mounts with opportunities and displays the appropriate information', () => {
  const opportunities = [
    {
      openTo: 'all',
      id: 1239,
      name: 'Automation proof of concept',
      location: ['Sydney', 'Offsite'],
      closed_at: addWeeks(new Date(), 2).toISOString(),
      submissions: '2 SME',
      company: 'Australian Taxation Office (ATO)'
    },
    {
      openTo: 'all',
      id: 1238,
      name: 'Exploration of commercial datasets to answer questions about household and SME energy use and costs',
      location: ['Offsite'],
      closed_at: addDays(new Date(), 4).toISOString(),
      submissions: '16 (9 SME)',
      company: 'Department of the Environment and Energy'
    },
    {
      openTo: 'one',
      id: 1260,
      name: 'CA GEN Conversion consultancy for Proof of Concept (POC)',
      location: ['Queensland'],
      closed_at: addHours(new Date(), 3).toISOString(),
      submissions: '2',
      company: 'Australian Taxation Office (ATO)'
    },
    {
      openTo: 'selected',
      id: 1263,
      name: 'Data Analytics for Heavy Vehicle Road Reform',
      location: ['Australian Capital Territory'],
      closed_at: subDays(new Date(), 5),
      submissions: '8 (5 SME)',
      company: 'Land Transport Market Reform Branch, Department of Infrastructure, Regional Development and Cities.'
    }
  ]
  const component = mount(<Opportunities opportunities={opportunities} />)

  expect(component.contains('Automation proof of concept')).toBeTruthy()
  expect(component.contains('Australian Taxation Office (ATO)')).toBeTruthy()
  expect(
    component.contains(
      'Exploration of commercial datasets to answer questions about household and SME energy use and costs'
    )
  ).toBeTruthy()
  expect(component.contains(1260)).toBeTruthy()
  expect(component.contains('8 (5 SME)')).toBeTruthy()
  expect(component.contains('0d : 2h : 59m')).toBeTruthy()
  expect(component.contains('Closed')).toBeTruthy()
  expect(component.contains('Sydney, Offsite')).toBeTruthy()
  expect(component.contains('QLD')).toBeTruthy()
  expect(component.contains('ACT')).toBeTruthy()
})
