let utils = require('../../utils');

exports.startBrief = async function (page) {
  utils.clickLink(page, 'Dashboard');
  utils.clickLink(page, 'Start a new brief');
}
