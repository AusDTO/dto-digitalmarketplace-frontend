import helper from '../helpers'
import React from 'react'
import { render } from 'enzyme';

test('newline', () => {
    expect(render(<p>{helper.newline('foo')}</p>).find('br').length).toBe(1);
    expect(render(<p>{helper.newline('foo \n bar')}</p>).find('br').length).toBe(2);
    expect(render(<p>{helper.newline('foo \r\n bar')}</p>).find('br').length).toBe(2);
    expect(render(<p>{helper.newline('foo \r bar')}</p>).find('br').length).toBe(2);
})
