import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import OverviewHeader from './OverviewHeader'

Enzyme.configure({ adapter: new Adapter() })
jest.mock('shared/Icon/_getIcons')

describe('OverviewHeader', () => {
  test('shows the correct actions for a draft opportunity', () => {
    const brief = {
      id: 123,
      lot: 'atm',
      status: 'draft'
    }

    const component = mount(
      <OverviewHeader brief={brief} canCloseOpportunity={false} isClosed={false} isPublished={false} />
    )

    const links = component.children().find('a')
    expect(links).toHaveLength(2)
    expect(links.at(0).text()).toEqual('Preview')
    expect(links.at(1).text()).toEqual('Delete draft')
  })

  test('shows the correct actions for a published opportunity that can be closed', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'rfx',
      sellerSelector: 'oneSeller',
      sellers: {
        1: {}
      },
      status: 'live'
    }

    const component = mount(<OverviewHeader brief={brief} canCloseOpportunity isClosed={false} isPublished />)

    expect(component.children().exists('li.hideMobile a')).toEqual(true)

    expect(
      component
        .children()
        .find('li.hideMobile a')
        .first()
        .text()
    ).toEqual('Close opportunity now')

    expect(component.children().exists('li.hideDesktop a')).toEqual(true)

    expect(
      component
        .children()
        .find('li.hideDesktop a')
        .first()
        .text()
    ).toEqual('Close now')
  })

  test('shows the correct actions for a published opportunity that can not be closed', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'rfx',
      sellerSelector: 'oneSeller',
      sellers: {
        1: {}
      },
      status: 'live'
    }

    const component = mount(<OverviewHeader brief={brief} canCloseOpportunity={false} isClosed={false} isPublished />)

    const links = component.children().find('a')
    expect(links).toHaveLength(0)
  })

  test('shows the correct actions for a closed opportunity', () => {
    const brief = {
      id: 123,
      lot: 'atm',
      status: 'closed'
    }

    const component = mount(<OverviewHeader brief={brief} canCloseOpportunity={false} isClosed isPublished />)

    const links = component.children().find('a')
    expect(links).toHaveLength(1)
    expect(links.at(0).text()).toEqual('View opportunity')
  })
})
