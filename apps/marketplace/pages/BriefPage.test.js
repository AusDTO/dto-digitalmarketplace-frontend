import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import { BriefPage } from './BriefPage'

test('Test suite for BriefPage page', () => {
  const state = {
    userRegistrationDetails: {
      name: 'Jeff Labowski',
      email_address: 'e@mail.com'
    },
    loadBriefSuccess: true
  }

  test('BriefPage renders without errors', () => {
    const wrapper = shallow(<BriefPage {...state} />)
    expect(wrapper).toExist()
  })

  test('Because snaphots', () => {
    const component = renderer.create(<BriefPage {...state} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
