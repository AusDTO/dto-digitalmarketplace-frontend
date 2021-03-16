import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import SellerOnboarding from './SellerOnboarding'
import BuyerOnboarding from './BuyerOnboarding'

jest.mock('shared/Icon/_getIcons')

describe('Test suite for UserOnboarding container component', () => {
  it('Because snaphots', () => {
    const component = renderer.create(<SellerOnboarding />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Because snaphots', () => {
    const component = renderer.create(<BuyerOnboarding />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
