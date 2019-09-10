import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CharacterCounter from './CharacterCounter'

Enzyme.configure({ adapter: new Adapter() })

describe('CharacterCounter', () => {
  test('shows the limit when value is null', () => {
    const wrapper = mount(<CharacterCounter limit={10} value={null} />)
    expect(wrapper.text()).toEqual('10 characters left')
  })

  test('shows the limit when value is undefined', () => {
    const wrapper = mount(<CharacterCounter limit={10} value={undefined} />)
    expect(wrapper.text()).toEqual('10 characters left')
  })

  test('shows the limit when value is empty', () => {
    const wrapper = mount(<CharacterCounter limit={10} value={''} />)
    expect(wrapper.text()).toEqual('10 characters left')
  })
})
