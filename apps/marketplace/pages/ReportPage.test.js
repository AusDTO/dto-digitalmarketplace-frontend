import React from 'react'
import renderer from 'react-test-renderer'
import expect from 'expect'
import { shallow } from 'enzyme'
import { ReportPageContainer } from './ReportPage'

jest.mock('shared/Icon/_getIcons')

test('Test suite for ReportPage page', () => {
  it('CreateUserPage renders without errors', () => {
    const wrapper = shallow(<ReportPageContainer />)
    expect(wrapper).toExist()
  })

  it('Because snaphots', () => {
    const component = renderer.create(<ReportPageContainer />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
