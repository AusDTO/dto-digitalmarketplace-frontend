import helper, {replaceMarkup} from '../helpers'
import React from 'react'
import { render } from 'enzyme';

test('newline', () => {
    expect(render(<p>{helper.newline('foo')}</p>).find('br').length).toBe(1);
    expect(render(<p>{helper.newline('foo \n bar')}</p>).find('br').length).toBe(2);
    expect(render(<p>{helper.newline('foo \r\n bar')}</p>).find('br').length).toBe(2);
    expect(render(<p>{helper.newline('foo \r bar')}</p>).find('br').length).toBe(2);
})

test('replaceMarkup', () => {
  expect(render(<p>{replaceMarkup('foo <b>bar</b>', '<b>', '<mark>')}</p>).find('mark').length).toBe(1);
  expect(render(<p>{replaceMarkup('foo <b>bar</b>', '<b>', '<mark>')}</p>).find('b').length).toBe(0);
  expect(render(<p>{replaceMarkup('foo')}</p>).find('p').text()).toBe('foo');
  expect(render(<p>{replaceMarkup('foo <div>bar</div>', '<div>', '<h1>')}</p>).find('h1').length).toBe(1);
  expect(render(<p>{replaceMarkup('foo <b>bar</b>', '<div>', '<h1>')}</p>).find('h1').length).toBe(0);
  expect(render(<p>{replaceMarkup('')}</p>).find('p').text()).toBe('');
})
