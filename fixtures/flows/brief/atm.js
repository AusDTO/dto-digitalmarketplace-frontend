import { sleep } from "../utils";

export const create = async (params) => {
    console.log('Starting to create outcome brief');
    await createBrief();
    await fillWhoCanRespond();
    await fillAbout(params.title, params.locations);
    await fillResponseFormats();
    await fillObjectives();
    await fillTimeframes();
    await fillResponseCriteria();
    await fillClosingDate();
    await publishBrief();
}

const createBrief = async () => {
    await clickLink('/2/outcome-choice', true);
    await clickLink('/2/buyer-atm/create', true);
    await clickLink('Create and publish request');
    await clickButton('Start now');
}

const fillWhoCanRespond = async () => {
    await selectRadio('all');
    await clickSaveContinue();
}

const fillAbout = async (role, locations) => {
    await type('title', { value: role });
    await type('organisation', { numberOfCharacters: 100 });
    await type('summary', { numberOfWords: 150 });

    for (let i in locations) {
        let location = locations[i];
        await selectCheck(location);
    }

    await clickSaveContinue();
}

const fillResponseFormats = async () => {
    await selectRadio('no');
    await clickSaveContinue();
}

const fillObjectives = async () => {
    let fields = [
        { id: 'backgroundInformation', options: { numberOfWords: 500 } },
        { id: 'outcome', options: { numberOfWords: 500 } },
        { id: 'endUsers', options: { numberOfWords: 500 } },
        { id: 'workAlreadyDone', options: { numberOfWords: 500 } },
        { id: 'industryBriefing', options: { numberOfWords: 150 } }
    ]
    for (var i in fields) {
        let field = fields[i];
        await type(field.id, field.options);
    }
    await clickSaveContinue();
}

const fillTimeframes = async () => {
    let fields = [
        { id: 'start_date', options: { numberOfWords: 10 } },
        { id: 'timeframeConstraints', options: { numberOfWords: 150 } }
    ]
    for (var i in fields) {
        let field = fields[i];
        await type(field.id, field.options);
    }
    await clickSaveContinue();
}

const fillResponseCriteria = async (evaluations) => {
    await selectCheck('yes');
    await type('criteria_0', { numberOfWords:50 });
    await type('weighting_0', { value: '100' });
    await clickSaveContinue();
}

const fillClosingDate = async () => {
    let now = new Date();
    let future = new Date(now.setDate(now.getDate() + 14));
    await type('day', { value: `${future.getDate()}` });
    await type('month', { value: `${future.getMonth() + 1}` });
    await type('year', { value: `${future.getFullYear()}` });
    await type('contactNumber', { value: '0123456789' });
    await clickSaveContinue();
}

const publishBrief = async () => {
    await clickButton('Publish');
    await matchText('h1', 'Your opportunity is now live.');
}

const clickSaveContinue = async () => {
    await clickButton('Save and continue');
}
