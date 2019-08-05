import { getNextKey, validURL } from './helpers'

test('getNextKey', () => {
  expect(getNextKey({})).toEqual(0)
  expect(getNextKey({"0": {}})).toEqual(1)
  expect(getNextKey({"2":{}, "5":{}, "1": {}})).toEqual(6)
})

test('validURL', () => {
  expect(validURL('')).toBeFalsy()
  expect(validURL('https://www.google.com')).toBeTruthy()
  expect(validURL('http://neverssl.com/')).toBeTruthy()
  expect(validURL('ftp://abc')).toBeFalsy()
  expect(validURL('javascript:alert(1)')).toBeFalsy()
  expect(validURL('/supplier/123')).toBeTruthy()
})
