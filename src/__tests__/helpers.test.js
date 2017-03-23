import helper from '../helpers'

test('newline', () => {
    expect(helper.newline('')).toBe('');
    expect(helper.newline('foo \n')).toBe('foo \r\n');
    expect(helper.newline('bar \r')).toBe('bar \r\n');
    expect(helper.newline('foobar \r\n')).toBe('foobar \r\n');
    expect(helper.newline('foo bar \r \n')).toBe('foo bar \r\n \r\n');
})
