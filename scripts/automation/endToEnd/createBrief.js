const puppeteer = require('puppeteer');
const loginBuyer = require('../testCases/login/buyer');
const buyerDashboard = require('../testCases/dashboard/buyer');
const specialist = require('../testCases/brief/specialist');
const outcome = require('../testCases/brief/outcome');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    await page.goto(process.env.FRONTEND_ADDRESS);

    await loginBuyer.login(page);

    await buyerDashboard.startBrief(page);
    await outcome.create(page);

    let areaOfExpertises = [
        'Strategy and Policy',
        'User research and Design',
        'Agile delivery and Governance',
        'Software engineering and Development',
        'Support and Operations',
        'Content and Publishing',
        'Change, Training and Transformation',
        'Change and Transformation',
        'Training, Learning and Development',
        'Marketing, Communications and Engagement',
        'Cyber security',
        'Data science',
        'Emerging technologies'
    ];
    for (let i in areaOfExpertises) {
        await buyerDashboard.startBrief(page);
        await specialist.create(page, areaOfExpertises[i]);
    }

    await browser.close();
})();