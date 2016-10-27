import validator from '../validators'

test('required', () => {
	expect(validator.required('')).toBeFalsy()
	expect(validator.required(false)).toBeFalsy()
	expect(validator.required('   ')).toBeFalsy()

	expect(validator.required('Words')).toBeTruthy()
	expect(validator.required(true)).toBeTruthy()
})

test('minArrayLength', () => {
	const min = validator.minArrayLength(2)

	expect(min('a')).toBeFalsy()
	expect(min([])).toBeFalsy()
	expect(min(['a'])).toBeFalsy()

	expect(min(['a', 'b'])).toBeTruthy()
	expect(min(['a', 'b', 'c'])).toBeTruthy()
})

test('validLinks', () => {
	expect(validator.validLinks('www.google.com')).toBeFalsy()
	expect(validator.validLinks('somerandomtext')).toBeFalsy()
	expect(validator.validLinks('htp://badproto')).toBeFalsy()

	expect(validator.validLinks('http://www.google.com')).toBeTruthy()
	expect(validator.validLinks('http://google.com')).toBeTruthy()
	expect(validator.validLinks()).toBeTruthy()
})