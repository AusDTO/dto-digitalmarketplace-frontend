import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Textarea from './Textarea'

Enzyme.configure({ adapter: new Adapter() })

test('onChange', () => {
  const wrapper = mount(<Textarea name="test" limit={10} />)
  let { wordsLeft } = wrapper.state()
  expect(wordsLeft).toEqual(10)

  wrapper.find('textarea').simulate('change', {
    target: {
      value: '1 2 3 4'
    }
  })

  wordsLeft = wrapper.state().wordsLeft
  expect(wordsLeft).toEqual(6)
})

test('countWords', () => {
  const txtarea = new Textarea({})
  let count

  count = txtarea.countWords('1 2 3 4 5')
  expect(count).toEqual(5)

  count = txtarea.countWords('1  2   3  4    5')
  expect(count).toEqual(5)
})

test('limitText', () => {
  const txtarea = new Textarea({})
  let text

  text = txtarea.limitText(5, 500)
  expect(text).toEqual('5 words left')

  text = txtarea.limitText(5, -5)
  expect(text).toEqual('')

  text = txtarea.limitText(1, 1)
  expect(text).toEqual('1 word left')

  text = txtarea.limitText(1, -1)
  expect(text).toEqual('')
})

test('default event handlers onChange', () => {
  const wrapper = mount(<Textarea name="test" />)
  expect(wrapper.prop('onChange')()).toBeUndefined()
  expect(wrapper.prop('onBlur')()).toBeUndefined()
  expect(wrapper.prop('onFocus')()).toBeUndefined()
})
