import puppeteer from 'puppeteer';
import { expect } from 'chai';
import * as utils from '../flows/utils';


// puppeteer options
const opts = {
    headless: process.env.HEADLESS == 'false' ? false : true,
    slowMo: process.env.SLOW_MO ? process.env.SLOW_MO : undefined,
};

// expose variables
before(async () => {
    global.expect = expect;
    
    for (let f in utils) {
        global[f] = utils[f];
    }
    global.browser = await puppeteer.launch(opts);
    global.page = await browser.newPage();
});

beforeEach(async () => {
    await page.goto(process.env.FRONTEND_ADDRESS);
    await page._client.send('Emulation.clearDeviceMetricsOverride');
});

after(async () => {
    await browser.close();
});