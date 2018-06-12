const buyerLogin = require('../../useCases/login/buyer');

describe('should fail sign in', function () {
    let testCases = [
        { args: ['a', ''], expected: ['a', 'You must provide a valid email address'] },
        { args: ['a@b.cm', ''], expected: ['a', 'You must provide your password'] },
        { args: ['a@b.cm', 'a'], expected: ['p', "Make sure you've entered the right email address and password."] },
    ]
    testCases.forEach(function (test) {
        it('sign in fails ' + test.args.length + ' args', async () => {
            await buyerLogin.login.apply(null, test.args);
            await utils.matchText.apply(null, test.expected);
        });
    });
})

it('should be able to login', async () => {
    await buyerLogin.login();
    await utils.matchText('h1', 'Dashboard');
    await buyerLogin.signOut();
});