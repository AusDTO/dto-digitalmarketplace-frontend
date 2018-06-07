var randomWords = require('random-words');

exports.getElementHandle = async function (page, xpath) {
    let elements = await this.getElementHandles(page, xpath);
    if (elements.length > 1) {
        throw `"${xpath}" returned more than one element`;
    } else if (elements.length === 0) {
        throw `"${xpath}" didn't return any elements`;
    }
    return elements[0];
}
exports.getElementHandles = async function (page, xpath) {
    if (!page) {
        console.error('page is required', xpath);
    }
    await page.waitForXPath(xpath, { visible: true });
    let elements = await page.$x(xpath);
    return elements;
}

exports.selectCheck = async function (page, value) {
    console.log(`Selecting check box "${value}"`);
    let radio = await this.getElementHandle(page, `//input[@value="${value}"]`);
    await radio.press('Space');
}

exports.selectRadio = async function (page, value) {
    console.log(`Selecting radio "${value}"`);
    let radio = await this.getElementHandle(page, `//input[@value="${value}"]`);
    await radio.press('Space');
}

exports.type = async function (page, id, value) {
    console.log(`Typing in ${id}`);
    let input = await this.getElementHandle(page, `//*[@id="${id}"]`);
    if (process.env.TYPE_INPUT) {
        await input.type(value, { delay: 0 });
    } else {
        await page.evaluate((el, v) => {
            el.value = v;
            let event = new Event('change', { bubbles: true });
            event.simulated = true;
            el.dispatchEvent(event);
        }, input, value);
    }
}

exports.clickButton = async function (page, value) {
    console.log(`Clicking button ${value}`);
    let button = await this.getElementHandle(page, `//input[@value="${value}"]`);
    await button.click();
}

exports.clickLink = async function (page, linkText) {
    console.log(`Clicking link "${linkText}"`);
    let links = await this.getElementHandles(page, `//a[.="${linkText}"]`);
    console.log(`Number of links found for "${linkText}": ${links.length}`);
    await links[0].click();
}

exports.words = function (numberOfWords, numberOfCharacters) {
    let text = randomWords({ exactly: numberOfWords }).join(' ');

    if (numberOfCharacters) {
        text = text.substring(0, numberOfCharacters);
    }
    return text;
}

exports.sleep = async function (ms) {
    console.log(`Sleeping for ${ms} milliseconds`);
    return new Promise(resolve => setTimeout(resolve, ms));
}