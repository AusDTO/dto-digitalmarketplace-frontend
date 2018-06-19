import puppeteer from 'puppeteer';
import { expect } from 'chai';
import * as utils from '../flows/utils';


// puppeteer options
const opts = {
    headless: false,
    //slowMo: 100,
    //timeout: 10000
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