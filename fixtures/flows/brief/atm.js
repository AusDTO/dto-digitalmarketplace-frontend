
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
    await clickSaveContinue();
    await matchText('li', 'You must select who can respond');
    await selectRadio('category');
    await clickSaveContinue();
    await matchText('li', 'You must select a panel category');
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
    await clickSaveContinue();
    await matchText('li', 'You must specify if you need sellers to supply any other information');
    await selectRadio('yes');
    await clickSaveContinue();
    await matchText('li', 'You must select at least one response format');
    await selectCheck('Case study');
    await selectCheck('References');
    await selectCheck('Résumés');
    await selectCheck('Presentation');
    await selectCheck('Prototype');
    await clickSaveContinue();
}

const fillObjectives = async () => {
    await clickSaveContinue();
    await matchText('li', 'Enter the reason the work is being done');
    await matchText('li', 'Enter the key problem to be solved');
    await matchText('li', 'Enter the user needs for your opportunity');
    await matchText('li', 'Enter the work already done for your opportunity');
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
    await upload('file_0', 'document.pdf');
    await clickSaveContinue();
}

const fillTimeframes = async () => {
    await clickSaveContinue();
    await matchText('li', 'Enter an estimated start date for the brief');
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
    await clickSaveContinue();
    await matchText('li', 'You must not have any empty criteria.');
    await clickLink('Add another criteria');
    await selectCheck('yes');
    await typeInReactInput('criteria_0', { numberOfWords:50 });
    await typeInReactInput('weighting_0', { value: '50' });
    await typeInReactInput('criteria_1', { numberOfWords:50 });
    await typeInReactInput('weighting_1', { value: '50' });
    await clickSaveContinue();
}

const fillClosingDate = async () => {
    await clickSaveContinue();
    await matchText('li', 'You must add a closing date at least 2 days from now');
    await matchText('li', 'You must add a contact number');
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


