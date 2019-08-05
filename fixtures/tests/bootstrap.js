import puppeteer from 'puppeteer'
import { expect } from 'chai'

// puppeteer options
const opts = {
  headless: process.env.HEADLESS !== 'false',
  slowMo: process.env.SLOW_MO ? process.env.SLOW_MO : undefined,
  defaultViewport: null
}

console.log(process.env.FRONTEND_ADDRESS)
console.log(process.env.HEADLESS)

// expose variables
before(async () => {
  global.expect = expect
})

beforeEach(async () => {
  global.browser = await puppeteer.launch(opts)
  const page = await global.browser.newPage()
  global.page = page
  await page.goto(process.env.FRONTEND_ADDRESS)
})

afterEach(async () => {
  if (global.browser) {
    await global.browser.close()
  }
})
