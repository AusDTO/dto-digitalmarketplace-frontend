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


test('minObjectLength', () => {
	const object = {
    financial: {
      filename: 'RTA-bond-lodgement-form2.pdf'
    },
    liability: {
      expiry: '1900-02-01',
      filename: 'RTA-bond-lodgement-form2.pdf'
    },
    workers: {
      filename: 'RTA-bond-lodgement-form2.pdf'
    }
  };

  expect(validator.minObjectLength(object, 3)).toBe(true);

  expect(validator.minObjectLength({}, 3)).toBe(false);

  expect(validator.minObjectLength()).toBe(false);
});

test('limitWords', () => {
  const limitValidator = validator.limitWords(5);

  expect(limitValidator('one two three four five')).toBe(true);
  expect(limitValidator('one four five')).toBe(true);
  expect(limitValidator('one two three four five            ')).toBe(true);

  expect(limitValidator('one two three four five six')).toBe(false);
});

test('limitNumbers', () => {
    const limitValidator = validator.limitNumbers(4);

    expect(limitValidator('1234')).toBe(true);
    expect(limitValidator('0001')).toBe(true);
    expect(limitValidator('1000')).toBe(true);

    expect(limitValidator('10000')).toBe(false);
    expect(limitValidator('100')).toBe(false);
    expect(limitValidator('100a')).toBe(false);
    expect(limitValidator('onea')).toBe(false);
});