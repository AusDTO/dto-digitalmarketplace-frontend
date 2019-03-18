import { buyerLogin, sellerLogin } from '../../flows/login/actions';
import { navigate, selectBrief, applyForAtm } from '../../flows/opportunities/actions';
import { respond } from '../../flows/briefResponse/atm';
import { create } from '../../flows/brief/atm';
import { startBrief } from '../../flows/dashboard/buyer';

describe('should be able to create and respond to ask the market brief', () => {
    let now = Date.now();
    var title = `Ask the market ${now.valueOf()}`;
    var brief = null;
    it('should be able to create ask the market brief', async () => {
        await buyerLogin();
        await startBrief();
        brief = await create({
            title: title,
            locations: ['Australian Capital Territory', 'Tasmania']
        });
    });
    it('should be able to respond to ask the market brief', async () => {
        await sellerLogin();
        await navigate();
        await selectBrief(title);
        await applyForAtm();
        await respond(brief);
    });
});
