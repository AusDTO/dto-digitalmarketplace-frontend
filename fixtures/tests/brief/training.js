import { login, signOut } from '../../flows/login/buyer';
import { create } from '../../flows/brief/training';
import { startBrief } from '../../flows/dashboard/buyer';

describe('should be able to create training brief', () => {
    it('should be able to create training brief', async () => {
        let now = Date.now();
        await startBrief();
        await create({
            title: `Digital Training ${now.valueOf()}`,
            locations: ['Australian Capital Territory', 'Tasmania'],
            evaluations: [
                'Interview',
                'References',
                'Case study',
                'Presentation'
            ]
        });
    });
});