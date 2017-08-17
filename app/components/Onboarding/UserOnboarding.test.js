import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import SellerOnboarding from './SellerOnboarding'
import BuyerOnboarding from './BuyerOnboarding'

test('Test suite for UserOnboarding container component', () => {
  it('Because snaphots', () => {
    let component = renderer.create(<SellerOnboarding />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Because snaphots', () => {
    let component = renderer.create(<BuyerOnboarding />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
