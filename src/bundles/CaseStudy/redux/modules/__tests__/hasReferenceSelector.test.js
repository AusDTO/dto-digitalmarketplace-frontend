import { hasReference, getValues, getKeys } from '../hasReferenceSelector';

test('hasReference returns correct boolean values', () => {
  const values = {
    name: 'Spongebob',
    role: 'Chief Aquaman',
    phone: '040000000',
    email: 'spongebob@aquaman.com',
  };

  expect(hasReference(values, ['name'])).toBe(true);
  expect(hasReference(values, ['randomkey'])).toBe(false);
  expect(hasReference(values, [])).toBe(false);
});

test('getValues return values', () => {
  expect(getValues({ foo: 'bar' }, [])).toEqual({ foo: 'bar' });
  expect(getValues({})).toEqual({});
  expect(getValues()).toEqual({});
});

test('getKeys return values', () => {
  expect(getKeys({}, ['title'])).toEqual(['title']);
  expect(getKeys({}, ['title', 'name'])).toEqual(['title', 'name']);
  expect(getKeys({}, [])).toEqual([]);
  expect(getKeys({})).toEqual([]);
  expect(getKeys()).toEqual([]);
});
