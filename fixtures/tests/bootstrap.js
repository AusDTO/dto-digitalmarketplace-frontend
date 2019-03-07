import puppeteer from 'puppeteer';
import { expect } from 'chai';
import * as utils from '../flows/utils';


// puppeteer options
const opts = {
    headless: process.env.HEADLESS == 'false' ? false : true,
    slowMo: process.env.SLOW_MO ? process.env.SLOW_MO : undefined,
    defaultViewport: null,
    pipe: true
};

// expose variables
before(async () => {
    global.expect = expect;
    
    for (let f in utils) {
        global[f] = utils[f];
    }
});

beforeEach(async () => {
    global.browser = await puppeteer.launch(opts);
    let page = await browser.newPage();
    global.page = page
    await page.goto(process.env.FRONTEND_ADDRESS);
});

afterEach(async () => {
    await browser.close();
});
