let utils = require('../../utils');

exports.startBrief = async function (page) {
    await utils.clickLink(page, 'Dashboard');
    await utils.clickLink(page, 'Start a new brief');
}
