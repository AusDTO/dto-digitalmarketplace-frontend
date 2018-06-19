import { login, signOut } from '../../useCases/login/buyer';
import { create } from '../../useCases/brief/outcome';
import { startBrief } from '../../useCases/dashboard/buyer';

it('should be able to create outcome brief', async () => {
    await login();
    await startBrief();
    await create();
    await signOut();
});