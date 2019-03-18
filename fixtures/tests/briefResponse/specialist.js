import { buyerLogin, sellerLogin } from '../../flows/login/actions';
import { applyForSpecialist, navigate, selectBrief } from '../../flows/opportunities/actions';
import { create } from '../../flows/brief/specialist';
import { startBrief } from '../../flows/dashboard/buyer';
import { respond } from '../../flows/briefResponse/specialist';

describe.only('should be able to create and respond to specialist brief', () => {
    let now = Date.now();
    let areaOfExpertise = 'Strategy and Policy';
    var title = `${areaOfExpertise} Role ${now.valueOf()}`;
    it(`should create specialist brief of ${areaOfExpertise}`, async () => {
        await buyerLogin();
        await startBrief();
        await create({
            title: title,
            areaOfExpertise: areaOfExpertise,
            locations: ['Australian Capital Territory', 'Tasmania'],
            evaluations: [
                'References',
                'Interview',
                'Scenario or test',
                'Presentation'
            ]
        });
    });
    it(`should be able to respond to ${areaOfExpertise} brief`, async () => {
        await sellerLogin();
        for (let i = 0; i < 3; i++) {
            await navigate();
            await selectBrief(title);
            await applyForSpecialist(i);
            await respond({
                specialistNumber: i
            });
        }
    });
})
