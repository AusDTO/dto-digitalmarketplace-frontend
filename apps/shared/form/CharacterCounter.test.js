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

  test('shows multiple number of characters remaining', () => {
    const wrapper = mount(<CharacterCounter limit={20} value={'test with spaces'} />)
    expect(wrapper.text()).toEqual('4 characters left')
  })

  test('shows single character remaining', () => {
    const wrapper = mount(<CharacterCounter limit={19} value={'close to the limit'} />)
    expect(wrapper.text()).toEqual('1 character left')
  })

  test('shows no characters remaining', () => {
    const wrapper = mount(<CharacterCounter limit={13} value={'hit the limit'} />)
    expect(wrapper.text()).toEqual('0 characters left')
  })

  test('shows no characters remaining', () => {
    const wrapper = mount(<CharacterCounter limit={5} value={'over the limit'} />)
    expect(wrapper.text()).toEqual('0 characters left')
  })
})
