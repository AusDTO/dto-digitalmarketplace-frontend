exports.startBrief = async function () {
    await utils.clickLink('Dashboard');
    await utils.clickLink('Start a new brief');
}
