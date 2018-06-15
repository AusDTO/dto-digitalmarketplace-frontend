const randomWords = require('random-words');

exports.getElementHandle = async (xpath) => {
    let elements = await utils.getElementHandles(xpath);
    if (elements.length > 1) {
        throw `"${xpath}" returned more than one element`;
    } else if (elements.length === 0) {
        throw `"${xpath}" didn't return any elements`;
    }
    return elements[0];
}
exports.getElementHandles = async (xpath) => {
    await page.waitForXPath(xpath, { visible: true });
    let elements = await page.$x(xpath);
    return elements;
}

exports.selectCheck = async (value) => {
    console.log(`Selecting check box "${value}"`);
    let radio = await this.getElementHandle(`//input[@value="${value}"]`);
    await radio.press('Space');
}

exports.selectRadio = async (value) => {
    console.log(`Selecting radio "${value}"`);
    let radio = await this.getElementHandle(`//input[@value="${value}"]`);
    await radio.press('Space');
}

exports.type = async (id, options) => {
    console.log(`Typing in ${id}`);
    let { value, numberOfWords, numberOfCharacters } = options;
    if (value !== '' && !value) {
        if (numberOfCharacters) {
            numberOfWords = numberOfCharacters;
        }
        value = utils.words(numberOfWords, numberOfCharacters);
    }
    let input = await utils.getElementHandle(`//*[@id="${id}"]`);
    if (process.env.TYPE_INPUT === 'true') {
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

exports.clickButton = async (value) => {
    console.log(`Clicking button ${value}`);
    let button = await utils.getElementHandle(`//input[@value="${value}"]`);
    await button.click();
}

exports.clickLink = async (linkText) => {
    console.log(`Clicking link "${linkText}"`);
    let links = await utils.getElementHandles(`//a[.="${linkText}"]`);
    expect(links.length).to.equal(1, `Number of links found for "${linkText}"=${links.length}`);
    await links[0].click();
}

exports.words = function (numberOfWords, numberOfCharacters) {
    let text = randomWords({ exactly: numberOfWords }).join(' ');

    if (numberOfCharacters) {
        text = text.substring(0, numberOfCharacters);
    }
    return text;
}

exports.matchText = async (tag, text) => {
    console.log(`matching text: '//${tag}["${text}"]'`);
    let elementHandles = await utils.getElementHandles(`//${tag}[contains(text(), "${text}")]`);
    expect(elementHandles.length).to.equal(1, `No text found using '//${tag}["${text}"]'`);
}

exports.sleep = async (ms) => {
    console.log(`Sleeping for ${ms} milliseconds`);
    return new Promise(resolve => setTimeout(resolve, ms));
}