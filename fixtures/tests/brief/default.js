import { login } from '../../flows/login/buyer';

beforeEach(async () => {
    await login();
});