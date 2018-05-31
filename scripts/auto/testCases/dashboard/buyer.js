exports.startBrief = async function(page) {
    await page.waitForSelector('a[href="/2/buyer-dashboard"]');
    await page.click('a[href="/2/buyer-dashboard"]');
  
    await page.waitForSelector('a[href="/2/create-brief"]');  
    await page.click('a[href="/2/create-brief"]');
  }
  