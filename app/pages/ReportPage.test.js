import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import { ReportPageContainer } from './ReportPage'

test('Test suite for ReportPage page', () => {
  it('CreateUserPage renders without errors', () => {
    let wrapper = shallow(<ReportPageContainer />)
    expect(wrapper).toExist()
  })

  it('Because snaphots', () => {
    let component = renderer.create(<ReportPageContainer />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
