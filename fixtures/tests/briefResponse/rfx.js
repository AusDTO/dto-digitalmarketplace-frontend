import { buyerLogin, sellerLogin } from '../../flows/login/actions';
import { checkAppliedForAtm, navigate, selectBrief, applyForAtm } from '../../flows/opportunities/actions';
import { respond } from '../../flows/briefResponse/rfx';
import { create } from '../../flows/brief/rfx';
import { startBrief } from '../../flows/dashboard/buyer';

//


describe('create and respond to RFXs brief'), () =>{
    //in order to get the right brief we are going for the 'today's date'.
    let today = Date.now();
    let title = `RFXs ${today.valueOf()}`;
    var brief =  null;

    it('should be able to create ask the market brief', async () => {
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

        //really should be applyForRFX but ooporunities doesn't have one and is basically the same funciton as ATM
        await applyForAtm();
        await respond(brief);

        //really should be applyForRFX but ooporunities doesn't have one and is basically the same funciton as ATM
        await checkAppliedForAtm(title);
    });
}



