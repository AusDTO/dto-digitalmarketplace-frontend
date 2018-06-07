let utils = require('../../utils');

exports.login = async function (page) {
    await utils.clickLink(page, 'Sign in');
    await utils.type(page, 'input_email_address', process.env.BUYER_EMAIL);
    await utils.type(page, 'input_password', process.env.BUYER_PASSWORD);
    await utils.clickButton(page, 'Sign in');
}
