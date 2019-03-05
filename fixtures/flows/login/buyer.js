export const login = async (email, password) => {
    await clickLink('Log in');
    await matchText('h1', 'Sign in to the Marketplace');
    if (email == undefined) {
        email = process.env.BUYER_EMAIL;
    }
    if (password == undefined) {
        password = process.env.BUYER_PASSWORD
    }
    await type('input_email_address', { value: email });
    await type('input_password', { value: password });
    await clickInputButton('Sign in');
};

export const signOut = async () => {
    await clickLink('Sign out');
    await matchText('h1', 'Sign in to the Marketplace');
}