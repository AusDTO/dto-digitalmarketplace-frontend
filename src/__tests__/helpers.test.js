import helper, {replaceMarkup} from '../helpers'
import React from 'react'
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('newline', () => {
    expect(render(<p>{helper.newline('foo')}</p>).find('br').length).toBe(1);
    expect(render(<p>{helper.newline('foo \n bar')}</p>).find('br').length).toBe(2);
    expect(render(<p>{helper.newline('foo \r\n bar')}</p>).find('br').length).toBe(2);
    expect(render(<p>{helper.newline('foo \r bar')}</p>).find('br').length).toBe(2);
})

test('replaceMarkup', () => {
  expect(render(<p>{replaceMarkup('foo <b>bar</b> baz', '<b>', '<mark>')}</p>).find('mark').length).toBe(1);
  expect(render(<p>{replaceMarkup('foo <b>bar</b> baz', '<b>', '<mark>')}</p>).html()).toBe("foo <mark class=\"uikit-body\">bar</mark> baz");
  expect(render(<p>{replaceMarkup('foo <b>bar</b> baz', '<b>', '<mark>')}</p>).find('b').length).toBe(0);

  expect(render(<p>{replaceMarkup('foo <b>bar</b> <b>baz</b>', '<b>', '<mark>')}</p>).find('mark').length).toBe(2);
  expect(render(<p>{replaceMarkup('foo <b>bar</b> <b>baz</b>', '<b>', '<mark>')}</p>).html()).toBe("foo <mark class=\"uikit-body\">bar</mark> <mark class=\"uikit-body\">baz</mark>");
  expect(render(<p>{replaceMarkup('foo <b>bar</b> <b>baz</b>', '<b>', '<mark>')}</p>).find('b').length).toBe(0);

  expect(render(<p>{replaceMarkup('foo <div>bar</div> baz', '<div>', '<span>')}</p>).html()).toBe("foo <span class=\"uikit-body\">bar</span> baz");
  expect(render(<p>{replaceMarkup('foo <div>bar</div> baz', '<div>', '<span>')}</p>).find('span').length).toBe(1);

  expect(render(<p>{replaceMarkup('foo')}</p>).html()).toBe('foo');
  expect(render(<p>{replaceMarkup('')}</p>).find('p').text()).toBe('');
})
