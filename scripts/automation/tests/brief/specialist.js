const buyerLogin = require('../../useCases/login/buyer');
const specialistBrief = require('../../useCases/brief/specialist');
const buyerDashboard = require('../../useCases/dashboard/buyer');

describe('should be able to create specialist brief', function () {
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

    await buyerLogin.login();
    areaOfExpertises.forEach(function (areaOfExpertise) {
        it('should create specialist brief of ' + areaOfExpertise.args, async () => {
            await buyerDashboard.startBrief();
            await specialistBrief.create.apply(null, areaOfExpertise.args);
        });
    });
    await buyerLogin.signOut();
})