jest.mock('react-dom')

beforeEach(() => jest.resetModules());

test('Add empty widget', () => {
	let Registry = require('../registry').default;
	Registry.add({ widget: () => {} });

	expect(Registry.key).toEqual('widget')
	expect(typeof Registry.instance).toEqual('function')
});

test('Add empty object', () => {
	let Registry = require('../registry').default;
	// Object will only prototype methods
	let obj = Object.create({ foo: 'bar' })
	Registry.add(obj);

	expect(Registry.key).toEqual('')
	expect(Registry.instance).toBeNull()
})
