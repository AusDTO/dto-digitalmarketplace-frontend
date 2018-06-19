import { login, signOut } from '../../useCases/login/buyer';
import { create } from '../../useCases/brief/specialist';
import { startBrief } from '../../useCases/dashboard/buyer';

describe('should be able to create specialist brief', () => {
    let areaOfExpertises = [
        { args: ['Strategy and Policy'] },
        { args: ['User research and Design'] },
        { args: ['Agile delivery and Governance'] },
        { args: ['Software engineering and Development'] },
        { args: ['Support and Operations'] },
        { args: ['Content and Publishing'] },
        { args: ['Change, Training and Transformation'] },
        // { args: ['Change and Transformation'] },
        // { args: ['Training, Learning and Development'] },
        { args: ['Marketing, Communications and Engagement'] },
        { args: ['Cyber security'] },
        { args: ['Data science'] },
        { args: ['Emerging technologies'] }
    ];

    areaOfExpertises.forEach((areaOfExpertise) => {
        it('should create specialist brief of ' + areaOfExpertise.args, async () => {
            await login();
            await startBrief();
            await create.apply(null, areaOfExpertise.args);
            await signOut();
        });
    });
})