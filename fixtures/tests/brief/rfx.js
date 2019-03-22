import { login, signOut } from '../../flows/login/buyer';
import { create } from '../../flows/brief/rfx.js';
import { startBrief } from '../../flows/dashboard/buyer';

describe('should be able to RFXs brief', () => {
    it.only('should be able to RFXs brief', async () => {
        let now = Date.now();
        await startBrief();
        await create({
            title: `RFXs ${now.valueOf()}`,
            locations: ['Australian Capital Territory', 'Tasmania']
        });
    });
});
