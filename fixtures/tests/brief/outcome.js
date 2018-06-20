import { login, signOut } from '../../flows/login/buyer';
import { create } from '../../flows/brief/outcome';
import { startBrief } from '../../flows/dashboard/buyer';

describe('should be able to create outcome brief', () => {
    beforeEach(async () => {
        await login();
    });
    afterEach(async () => {
        await signOut();
    });
    it('should be able to create outcome brief', async () => {
        let now = Date.now();
        await startBrief();
        await create({
            title: `Digital Outcome ${now.valueOf()}`,
            locations: ['Australian Capital Territory', 'Tasmania'],
            evaluations: [
                'Work history',
                'Reference',
                'Case study',
                'Presentation'
            ]
        });
    });
});