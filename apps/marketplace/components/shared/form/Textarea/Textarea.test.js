import React from 'react'
import { mount } from 'enzyme'

import Textarea from './Textarea'

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
  expect(text).toEqual('5 words remaining')

  text = txtarea.limitText(5, -5)
  expect(text).toEqual('5 words too many')

  text = txtarea.limitText(1, 1)
  expect(text).toEqual('1 word remaining')

  text = txtarea.limitText(1, -1)
  expect(text).toEqual('1 word too many')
})

test('default event handlers onChange', () => {
  const wrapper = mount(<Textarea name="test" />)
  expect(wrapper.prop('onChange')()).toBeUndefined()
  expect(wrapper.prop('onBlur')()).toBeUndefined()
  expect(wrapper.prop('onFocus')()).toBeUndefined()
})
