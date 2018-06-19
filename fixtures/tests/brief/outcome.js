import { login, signOut } from '../../flows/login/buyer';
import { create } from '../../flows/brief/outcome';
import { startBrief } from '../../flows/dashboard/buyer';

it('should be able to create outcome brief', async () => {
    await login();
    await startBrief();
    await create();
    await signOut();
});