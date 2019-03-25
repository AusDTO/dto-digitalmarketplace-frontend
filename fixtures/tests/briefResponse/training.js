import { buyerLogin, sellerLogin } from '../../flows/login/actions';
import { applyForTraining, navigate, selectBrief, viewTrainingApplication } from '../../flows/opportunities/actions';
import { create } from '../../flows/brief/training';
import { startBrief } from '../../flows/dashboard/buyer';
import { respond } from '../../flows/briefResponse/training';

describe('should be able to create and respond to training brief', () => {
    let now = Date.now();
    var title = `Digital Training ${now.valueOf()}`;
    it(`should create digital training brief`, async () => {
        await buyerLogin();
        await startBrief();
        await create({
            title: title,
            locations: ['Australian Capital Territory', 'Tasmania'],
            evaluations: [
                'Interview',
                'References',
                'Case study',
                'Presentation'
            ]
        });
    });
    it(`should be able to respond to training brief`, async () => {
        await sellerLogin();
        await navigate();
        await selectBrief(title);
        await applyForTraining();
        await respond();
        await navigate();
        await selectBrief(title);
        await viewTrainingApplication(title);
    });
})
