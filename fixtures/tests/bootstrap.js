
const puppeteer = require('puppeteer');
const { expect } = require('chai');
const utils = require('../utils');

// puppeteer options
const opts = {
    headless: false,
    //slowMo: 100,
    //timeout: 10000
};

// expose variables
before(async function () {
    global.expect = expect;
    global.utils = utils;
    global.browser = await puppeteer.launch(opts);
    global.page = await browser.newPage();
});

beforeEach(async function () {
    await page.goto(process.env.FRONTEND_ADDRESS);
    await page._client.send('Emulation.clearDeviceMetricsOverride');
});

after(async function () {
    await browser.close();
});