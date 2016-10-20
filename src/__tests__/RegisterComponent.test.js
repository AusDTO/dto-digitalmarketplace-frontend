jest.mock('react-dom')

beforeEach(() => jest.resetModules());

test('Add empty widget', () => {
	let RegisterComponent = require('../RegisterComponent').default;
	let reg = new RegisterComponent({ widget: () => {} })

	expect(reg.key).toEqual('widget')
	expect(reg.instance).toBeInstanceOf(Function)
});

test('Add empty object', () => {
	let RegisterComponent = require('../RegisterComponent').default;
	// Object will only prototype methods
	let reg = new RegisterComponent(Object.create({ foo: 'bar' }))

	expect(reg.key).toEqual('')
	expect(reg.instance).toBeNull()
})

test('env set to server', () => {
	let RegisterComponent = require('../RegisterComponent').default;
	let reg = new RegisterComponent({ widget: () => {} }, 'server')

	expect(reg).toBeInstanceOf(RegisterComponent)
	expect(reg.key).toEqual('widget')
	expect(reg.instance).toBeInstanceOf(Function)
})

test('with bad env passed', () => {
	expect(() => {
		let RegisterComponent = require('../RegisterComponent').default;
		let reg = new RegisterComponent({}, 'randomenv')
	}).toThrowError('\'randomenv\' is not a valid env.')
})