import { login, signOut } from '../../flows/login/buyer';

describe('should fail sign in', () => {
    let testCases = [
        { args: ['a', ''], expected: ['a', 'You must provide a valid email address'] },
        { args: ['a@b.cm', ''], expected: ['a', 'You must provide your password'] },
        { args: ['a@b.cm', 'a'], expected: ['p', "Make sure you've entered the right email address and password."] },
    ]
    testCases.forEach((test) => {
        it('sign in fails ' + test.args.length + ' args', async () => {
            await login.apply(null, test.args);
            await matchText.apply(null, test.expected);
        });
    });
})

it('should be able to login', async () => {
    await login();
    await matchText('h1', 'Dashboard');
    await signOut();
});