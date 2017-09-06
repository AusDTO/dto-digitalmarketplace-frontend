import { getNextKey } from './helpers'

test('getNextKey', () => {
  expect(getNextKey({})).toEqual(0)
  expect(getNextKey({"0": {}})).toEqual(1)
  expect(getNextKey({"2":{}, "5":{}, "1": {}})).toEqual(6)
})
