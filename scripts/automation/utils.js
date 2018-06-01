var randomWords = require('random-words');

exports.getElementHandle = async function (page, xpath) {
    let elements = await this.getElementHandles(page, xpath);
    if (elements.length > 1) {
        throw `"${xpath}" returned more than one element`;
    }
    return elements[0];
}
exports.getElementHandles = async function (page, xpath) {
    if (!page) {
        console.error('page is required', xpath);
    }
    await page.waitForXPath(xpath);
    let elements = await page.$x(xpath);
    return elements;
}

exports.clickLink = async function (page, linkText) {
    let link = await this.getElementHandle(page, `//a[.="${linkText}"]`);
    await link.click();
}

exports.selectCheck = async function (page, value) {
    let radio = await this.getElementHandle(page, `//input[@value="${value}"]`);
    await radio.press('Space');
}

exports.selectRadio = async function (page, value) {
    let radio = await this.getElementHandle(page, `//input[@value="${value}"]`);
    await radio.press('Space');
}

exports.type = async function (page, id, value) {
    let input = await this.getElementHandle(page, `//*[@id="${id}"]`);
    await input.type(value, { delay: 0 });
}

exports.clickButton = async function (page, value) {
    let button = await this.getElementHandle(page, `//input[@value="${value}"]`);
    await button.click();
}

exports.words = function (numberOfWords, numberOfCharacters) {
    let text = randomWords({exactly:numberOfWords}).join(' ');

    if (numberOfCharacters) {
        text = text.substring(0, numberOfCharacters);
    }
    return text;
}