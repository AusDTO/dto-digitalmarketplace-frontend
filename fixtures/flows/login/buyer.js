export const login = async (email, password) => {
    await utils.clickLink('Sign in');
    await utils.matchText('h1', 'Sign in to the Marketplace');
    if (email == undefined) {
        email = process.env.BUYER_EMAIL;
    }
    if (password == undefined) {
        password = process.env.BUYER_PASSWORD
    }
    await utils.type('input_email_address', { value: email });
    await utils.type('input_password', { value: password });
    await utils.clickButton('Sign in');
};

export const signOut = async () => {
    await utils.clickLink('Sign out');
    await utils.matchText('h1', 'Sign in to the Marketplace');
}