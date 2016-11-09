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

test('min', () => {
	const min = validator.min(5)

	expect(min('a')).toBeFalsy()
	expect(min('')).toBeFalsy()
	expect(min('1234')).toBeFalsy()

	expect(min('12345')).toBeTruthy()
	expect(min('123456')).toBeTruthy()
})

test('validLinks', () => {
	expect(validator.validLinks('www.google.com')).toBeFalsy()
	expect(validator.validLinks('somerandomtext')).toBeFalsy()
	expect(validator.validLinks('htp://badproto')).toBeFalsy()

	expect(validator.validLinks(['http://badproto', 'google.com'])).toBeFalsy()

	expect(validator.validLinks(['', void 0])).toBeTruthy()
	expect(validator.validLinks(['', {}])).toBeTruthy()
	expect(validator.validLinks('http://www.google.com')).toBeTruthy()
	expect(validator.validLinks('http://google.com')).toBeTruthy()
	expect(validator.validLinks()).toBeTruthy()
})

test('dependantRequired', () => {
	const formValues = {
		title: void 0,
		role: 'CTO',
		email: 'some@mail.com',
		'null': null
	}

	// Empty check
	expect(validator.dependantRequired({}, [])()).toBe(true);

	const oneInvalidField = validator.dependantRequired(formValues, ['title', 'email']);
	const twoInvalidFields = validator.dependantRequired(formValues, ['title', 'null']);
	const validFields = validator.dependantRequired(formValues, ['role', 'email']);

	expect(oneInvalidField(false)).toBe(false);
	expect(oneInvalidField(true)).toBe(true)

	expect(twoInvalidFields(false)).toBe(true);
	expect(twoInvalidFields(true)).toBe(true);

	expect(validFields(true)).toBe(true);
	expect(validFields(false)).toBe(false)
});