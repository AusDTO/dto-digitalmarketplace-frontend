exports.login = async function(page) {
  await page.waitForSelector('#main-navigation > li:nth-child(2) > a');
  await page.click('#main-navigation > li:nth-child(2) > a');

  await page.waitForSelector('#input_email_address');
  await page.type('#input_email_address', process.env.BUYER_EMAIL);
  await page.type('#input_password', process.env.BUYER_PASSWORD);

  await page.click('#content > form > p:nth-child(7) > input');
}
