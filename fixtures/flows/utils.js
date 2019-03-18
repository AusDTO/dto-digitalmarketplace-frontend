import randomWords from 'random-words';
import clipboardy from 'clipboardy';

export const getElementHandle = async (xpath) => {
    let elements = await getElementHandles(xpath);
    if (elements.length > 1) {
        throw `"${xpath}" returned more than one element`;
    } else if (elements.length === 0) {
        throw `"${xpath}" didn't return any elements`;
    }
    return elements[0];
}
export const getElementHandles = async (xpath) => {
    await page.waitForXPath(xpath, { visible: true });
    let elements = await page.$x(xpath);
    return elements;
}

export const selectCheck = async (value) => {
    console.log(`Selecting check box "//input[@value="${value}"]"`);
    let radio = await getElementHandle(`//input[@value="${value}"]`);
    await radio.press('Space');
}

export const selectRadio = async (value) => {
    console.log(`Selecting radio "//input[@value="${value}"]"`);
    let radio = await getElementHandle(`//input[@value="${value}"]`);
    await radio.press('Space');
}

export const typeInReactInput = async (id, options) => {
    options['reactInput'] = true;
    return await type(id, options);
}

export const type = async (id, options) => {
    console.log(`Typing in "//*[@id="${id}"]"`);
    let {
        value,
        numberOfWords,
        numberOfCharacters,
        reactInput
    } = options;
    if (value !== '' && !value) {
        if (numberOfCharacters) {
            numberOfWords = numberOfCharacters;
        }
        value = words(numberOfWords, numberOfCharacters);
    }
    reactInput = reactInput ? reactInput : false;
    let input = await getElementHandle(`//*[@id="${id}"]`);
    if (process.env.TYPE_INPUT === 'true') {
        if (process.env.SHORTEN_TYPED_INPUT === 'true') {
            if (value.length > 50) {
                value = value.substring(0, 50);
                console.log(`Shortened typed value to "${value}"`);
            }
        }
        await input.type(value, { delay: 0 });
    } else if (process.env.USE_CLIPBOARD_FOR_TYPE_INPUT === 'true') {
        await clipboardy.write(value);
        await input.focus();
        await page.keyboard.down('ControlLeft');
        await page.keyboard.press('KeyV');
        await page.keyboard.up('ControlLeft');
    } else {
        if (reactInput) {
            if (value.length > 50) {
                value = value.substring(0, 50);
                console.log(`Shortened typed value to "${value}"`);
            }
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
    return value;
}

export const upload = async (id, file) => {
    console.log(`Uploading "//input[@id="${id}" and @type="file"]"`);
    let input = await getElementHandle(`//input[@id="${id}" and @type="file"]`);
    await input.uploadFile(file);
}

export const clickButton = async (value) => {
    console.log(`Clicking button "//button[.="${value}"]"`);
    let button = await getElementHandle(`//button[.="${value}"]`);
    await button.click();
}

export const clickInputButton = async (value) => {
    console.log(`Clicking input button "//input[@value="${value}"]"`);
    let button = await getElementHandle(`//input[@value="${value}"]`);
    await button.click();
}

export const clickLink = async (linkText, isUrl) => {
    console.log(`Clicking link "${linkText}"`);
    var links;
    if (isUrl) {
        links = await getElementHandles(`//a[contains(@href, "${linkText}")]`);
    } else {
        links = await getElementHandles(`//a[.="${linkText}"]`);
    }
    if (process.env.IGNORE_MULTIPLE_LINKS != 'true') {
        expect(links.length).to.equal(1, `Number of links found for "${linkText}"=${links.length}`);
    } else if (links.length > 1) {
        console.warn(`Number of links found for "${linkText}"=${links.length}`);
    }
    await links[0].click();
}

export const words = function (numberOfWords, numberOfCharacters) {
    let text = randomWords({ exactly: numberOfWords }).join(' ');

    if (numberOfCharacters) {
        text = text.substring(0, numberOfCharacters - 1);
    }
    return text;
}

export const matchText = async (tag, text) => {
    console.log(`matching text: '//${tag}[contains(text(), "${text}")]'`);
    let elementHandles = await getElementHandles(`//${tag}[contains(text(), "${text}")]`);
    expect(elementHandles.length).to.equal(1, `No text found using '//${tag}[contains(text(), "${text}")]'`);
}

export const sleep = async (ms) => {
    console.log(`Sleeping for ${ms} milliseconds`);
    return new Promise(resolve => setTimeout(resolve, ms));
}
