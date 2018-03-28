import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BriefChoice } from './BriefChoice'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('shared/Icon/_getIcons')

test('The Continue button is disabled before a choice is made', () => {
  const component = mount(<BriefChoice />)
  expect(component.find('button').get(0).props.disabled).toBeTruthy()
})

test('Making a choice changes the link accordingly', () => {
  const component = mount(<BriefChoice />)

  component.setState({
    briefType: 'digital-professionals'
  })
  expect(component.find('a').get(0).props.href).toEqual(
    '/buyers/frameworks/digital-marketplace/requirements/digital-professionals'
  )

  component.setState({
    briefType: 'digital-outcome'
  })
  expect(component.find('a').get(0).props.href).toEqual(
    '/buyers/frameworks/digital-marketplace/requirements/digital-outcome'
  )
})
