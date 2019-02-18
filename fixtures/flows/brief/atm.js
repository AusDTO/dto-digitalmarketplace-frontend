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
    await typeInReactInput('title', { value: role });
    await typeInReactInput('organisation', { numberOfCharacters: 100 });
    await typeInReactInput('summary', { numberOfWords: 150 });

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
        await typeInReactInput(field.id, field.options);
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
        await typeInReactInput(field.id, field.options);
    }
    await clickSaveContinue();
}

const fillResponseCriteria = async (evaluations) => {
    await selectCheck('yes');
    await typeInReactInput('criteria_0', { numberOfWords:50 });
    await typeInReactInput('weighting_0', { value: '100' });
    await clickSaveContinue();
}

const fillClosingDate = async () => {
    let now = new Date();
    let future = new Date(now.setDate(now.getDate() + 14));
    await typeInReactInput('day', { value: `${future.getDate()}` });
    await typeInReactInput('month', { value: `${future.getMonth() + 1}` });
    await typeInReactInput('year', { value: `${future.getFullYear()}` });
    await typeInReactInput('contactNumber', { value: '0123456789' });
    await clickSaveContinue();
}

const publishBrief = async () => {
    await clickButton('Publish');
    await matchText('h1', 'Your opportunity is now live.');
}

const clickSaveContinue = async () => {
    await clickButton('Save and continue');
}
