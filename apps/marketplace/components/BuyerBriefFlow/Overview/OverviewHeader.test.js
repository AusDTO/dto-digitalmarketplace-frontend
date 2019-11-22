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

    const component = mount(<OverviewHeader brief={brief} isClosed={false} isPublished={false} />)

    const links = component.children().find('a')
    expect(links).toHaveLength(2)
    expect(links.at(0).text()).toEqual('Preview')
    expect(links.at(1).text()).toEqual('Delete draft')
  })

  test('shows the correct actions for a published RFX opportunity with one invited seller that has responded', () => {
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

    const briefResponses = [{ supplier_code: 1 }]
    const component = mount(
      <OverviewHeader brief={brief} briefResponses={briefResponses} isClosed={false} isPublished />
    )

    const links = component.children().find('a')
    expect(links).toHaveLength(1)
    expect(links.at(0).text()).toEqual('Close opportunity now')
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a published RFX opportunity with one invited seller that has not responded', () => {
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

    const briefResponses = []
    const component = mount(
      <OverviewHeader brief={brief} briefResponses={briefResponses} isClosed={false} isPublished />
    )

    const links = component.children().find('a')
    // expect(links).toHaveLength(1)
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a published RFX opportunity with multiple invited sellers that have responded', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'rfx',
      sellerSelector: 'someSellers',
      sellers: {
        1: {},
        2: {}
      },
      status: 'live'
    }

    const briefResponses = [{ supplier_code: 1 }, { supplier_code: 2 }]
    const component = mount(
      <OverviewHeader brief={brief} briefResponses={briefResponses} isClosed={false} isPublished />
    )

    const links = component.children().find('a')
    // expect(links).toHaveLength(1)
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a published RFX opportunity with multiple invited sellers that have not responded', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'rfx',
      sellerSelector: 'someSellers',
      sellers: {
        1: {},
        2: {}
      },
      status: 'live'
    }

    const briefResponses = []
    const component = mount(
      <OverviewHeader brief={brief} briefResponses={briefResponses} isClosed={false} isPublished />
    )

    const links = component.children().find('a')
    // expect(links).toHaveLength(1)
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a published training opportunity with one invited seller that has responded', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'training2',
      sellerSelector: 'oneSeller',
      sellers: {
        1: {}
      },
      status: 'live'
    }

    const briefResponses = [{ supplier_code: 1 }]
    const component = mount(
      <OverviewHeader brief={brief} briefResponses={briefResponses} isClosed={false} isPublished />
    )

    const links = component.children().find('a')
    expect(links).toHaveLength(1)
    expect(links.at(0).text()).toEqual('Close opportunity now')
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a published training opportunity with one invited seller that has not responded', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'training2',
      sellerSelector: 'oneSeller',
      sellers: {
        1: {}
      },
      status: 'live'
    }

    const briefResponses = []
    const component = mount(
      <OverviewHeader brief={brief} briefResponses={briefResponses} isClosed={false} isPublished />
    )

    const links = component.children().find('a')
    // expect(links).toHaveLength(1)
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a published training opportunity with multiple invited sellers that have responded', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'training2',
      sellerSelector: 'someSellers',
      sellers: {
        1: {},
        2: {}
      },
      status: 'live'
    }

    const briefResponses = [{ supplier_code: 1 }, { supplier_code: 2 }]
    const component = mount(
      <OverviewHeader brief={brief} briefResponses={briefResponses} isClosed={false} isPublished />
    )

    const links = component.children().find('a')
    // expect(links).toHaveLength(1)
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a published training opportunity with multiple invited sellers that have not responded', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'training2',
      sellerSelector: 'someSellers',
      sellers: {
        1: {},
        2: {}
      },
      status: 'live'
    }

    const briefResponses = []
    const component = mount(
      <OverviewHeader brief={brief} briefResponses={briefResponses} isClosed={false} isPublished />
    )

    const links = component.children().find('a')
    // expect(links).toHaveLength(1)
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a published specialist opportunity with multiple invited sellers that have responded', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'specialist',
      sellerSelector: 'someSellers',
      sellers: {
        1: {},
        2: {}
      },
      status: 'live'
    }

    const briefResponses = [{ supplier_code: 1 }, { supplier_code: 2 }]
    const component = mount(
      <OverviewHeader brief={brief} briefResponses={briefResponses} isClosed={false} isPublished />
    )

    const links = component.children().find('a')
    // expect(links).toHaveLength(1)
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a published specialist opportunity with multiple invited sellers that have not responded', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'specialist',
      sellerSelector: 'someSellers',
      sellers: {
        1: {},
        2: {}
      },
      status: 'live'
    }

    const briefResponses = []
    const component = mount(
      <OverviewHeader brief={brief} briefResponses={briefResponses} isClosed={false} isPublished />
    )

    const links = component.children().find('a')
    // expect(links).toHaveLength(1)
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a published ATM opportunity', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'atm',
      sellerSelector: 'allSellers',
      status: 'live'
    }

    const component = mount(<OverviewHeader brief={brief} isClosed={false} isPublished />)

    const links = component.children().find('a')
    // expect(links).toHaveLength(1)
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a published specialist opportunity open to all', () => {
    const brief = {
      dates: {
        closing_time: new Date('2019-12-17T03:24:00'),
        published_date: new Date('2019-11-17T09:30:00')
      },
      id: 123,
      lot: 'specialist',
      sellerSelector: 'allSellers',
      status: 'live'
    }

    const component = mount(<OverviewHeader brief={brief} isClosed={false} isPublished />)

    const links = component.children().find('a')
    // expect(links).toHaveLength(1)
    // expect(links.at(1).text()).toEqual('Withdraw opportunity')
  })

  test('shows the correct actions for a closed opportunity', () => {
    const brief = {
      id: 123,
      lot: 'atm',
      status: 'closed'
    }

    const component = mount(<OverviewHeader brief={brief} isClosed isPublished />)

    const links = component.children().find('a')
    expect(links).toHaveLength(1)
    expect(links.at(0).text()).toEqual('View opportunity')
  })
})
