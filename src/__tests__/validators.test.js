import validator from '../validators'

import startOfToday from 'date-fns/start_of_today';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';

test('required', () => {
	expect(validator.required('')).toBeFalsy()
	expect(validator.required(false)).toBeFalsy()
	expect(validator.required('   ')).toBeFalsy()

	expect(validator.required('Words')).toBeTruthy()
	expect(validator.required(true)).toBeTruthy()
})

test('validDate', () => {

    expect(validator.validDate('')).toBeFalsy();
    expect(validator.validDate(false)).toBeFalsy();
    expect(validator.validDate('   ')).toBeFalsy();

    expect(validator.validDate('2016-01-01')).toBeFalsy();
    expect(validator.validDate(format(startOfToday(), 'YYYY-MM-DD'))).toBeFalsy();

    expect(validator.validDate('2038-01-01')).toBeTruthy();
    expect(validator.validDate(format(addDays(startOfToday(),1), 'YYYY-MM-DD'))).toBeTruthy();
})

test('validEmail', () => {

    expect(validator.validEmail(false)).toBeTruthy();

    expect(validator.validEmail('@')).toBeFalsy();
    expect(validator.validEmail(' ')).toBeFalsy();
    expect(validator.validEmail('.')).toBeFalsy();
    expect(validator.validEmail('me.com')).toBeFalsy();
    expect(validator.validEmail('me@')).toBeFalsy();
    expect(validator.validEmail('me @me.com')).toBeFalsy();

    expect(validator.validEmail('me@me.com')).toBeTruthy();
    expect(validator.validEmail('me.name@me-too.com')).toBeTruthy();
})

test('validPhoneNumber', () => {

    expect(validator.validPhoneNumber(false)).toBeTruthy();

    expect(validator.validPhoneNumber('02 1234 567')).toBeFalsy();
    expect(validator.validPhoneNumber(' ')).toBeFalsy();

    expect(validator.validPhoneNumber('0212345678')).toBeTruthy();
    expect(validator.validPhoneNumber('(02) 1234 5678')).toBeTruthy();
    expect(validator.validPhoneNumber('+61 2 12345678')).toBeTruthy();
})

test('validABN', () => {

    expect(validator.validABN('')).toBeFalsy();
    expect(validator.validABN(false)).toBeFalsy();
    expect(validator.validABN('   ')).toBeFalsy();
    expect(validator.validABN('abn')).toBeFalsy();
    expect(validator.validABN('0212345678')).toBeFalsy();

    expect(validator.validABN('53 004 085 614')).toBeFalsy();
    expect(validator.validABN('53004085614')).toBeFalsy();

    expect(validator.validABN('53 004 085 616')).toBeTruthy();
    expect(validator.validABN('53004085616')).toBeTruthy();
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