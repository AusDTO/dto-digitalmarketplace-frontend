import { buyerLogin, sellerLogin } from '../../flows/login/actions';
import { checkAppliedForRfx, navigate, selectBrief, applyForRfx } from '../../flows/opportunities/actions';
import { respond } from '../../flows/briefResponse/rfx';
import { create } from '../../flows/brief/rfx';
import { startBrief } from '../../flows/dashboard/buyer';
import { sleep } from '../../flows/utils';

//

describe('create and respond to RFXs brief', () =>{
    //in order to get the right brief we are going for the 'today's date'.
    let today = Date.now();
    let title = `RFXs ${today.valueOf()}`;
    var brief =  null;

    it('should be able to create RFXs', async () => {
        await buyerLogin();
        await startBrief();
        brief = await create({
            title: title,
            locations: ['Australian Capital Territory', 'Tasmania']
        });
    });

    it('should be able to respond RFXs brief', async () => {
        await sellerLogin();
        await navigate();
        await selectBrief(title);
        await sleep(1000);
        await applyForRfx();
        await respond(brief);

        //really should be applyForRFX but opportunities doesn't have one and is basically the same function as ATM
        await checkAppliedForRfx(title);
    });
});
