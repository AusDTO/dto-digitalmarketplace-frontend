const buyerLogin = require('../../useCases/login/buyer');
const outcomeBrief = require('../../useCases/brief/outcome');
const buyerDashboard = require('../../useCases/dashboard/buyer');

it('should be able to create outcome brief', async () => {
    await buyerLogin.login();
    await buyerDashboard.startBrief();
    await outcomeBrief.create();
    await buyerLogin.signOut();
});