exports.create = async function (areaOfExpertise) {
    console.log(`Starting to create ${areaOfExpertise} brief`);
    let now = Date.now();
    await selectLot('digital-professionals');
    await createBrief();
    await fillRole(`${areaOfExpertise} Role ${now.valueOf()}`);
    await selectLocation(['Australian Capital Territory', 'Tasmania']);
    await fillDescriptinoOfWork();
    await fillEvaluationProcess(areaOfExpertise);
    await fillHowLong();
    await fillQuestionAnswer();
    await fillWhoCanRespond();
    await publishBrief();
}

async function selectLot(lot) {
    await utils.selectRadio(lot);
    await utils.clickLink('Continue');
}

async function createBrief() {
    await utils.clickButton('Create brief');
}

async function fillRole(role) {
    await utils.type('input-title', { value: role });
    await clickSaveContinue();
}

async function selectLocation(locations) {
    await utils.clickLink('Location');

    for (let i in locations) {
        let location = locations[i];
        await utils.selectCheck(location);
    }

    await clickSaveContinue();
}

async function fillDescriptinoOfWork() {
    await utils.clickLink('Description of work');
    await utils.clickLink('Add organisation');

    let fields = [
        { id: 'input-organisation', options: { numberOfCharacters: 100 } },
        { id: 'input-specialistWork', options: { numberOfWords: 100 } },
        { id: 'input-existingTeam', options: { numberOfWords: 100 } },
        { id: 'input-additionalRelevantInformation', options: { numberOfWords: 500 } },
        { id: 'input-workplaceAddress', options: { numberOfWords: 100 } },
        { id: 'input-workingArrangements', options: { numberOfWords: 500 } },
        { id: 'input-securityClearance', options: { numberOfWords: 50 } },
        { id: 'input-startDate', options: { numberOfCharacters: 100 } },
        { id: 'input-contractLength', options: { numberOfWords: 100 } },
        { id: 'input-additionalTerms', options: { numberOfWords: 500 } },
        { id: 'input-budgetRange', options: { numberOfWords: 100 } },
        { id: 'input-summary', options: { numberOfWords: 50 } }
    ]
    for (var i in fields) {
        let field = fields[i];
        await utils.type(field.id, field.options);
        await clickSaveContinue();
    }

    await clickReturnToOverview();
}

async function fillEvaluationProcess(areaOfExpertise) {
    await utils.clickLink('Shortlist and evaluation process');
    await utils.clickLink('Please choose an area of expertise');

    await utils.selectRadio(areaOfExpertise);
    await clickSaveContinue();

    await utils.type('input-numberOfSuppliers', { value: '3' });
    await clickSaveContinue();

    await utils.type('input-technicalWeighting', { value: '25' });
    await utils.type('input-culturalWeighting', { value: '25' });
    await utils.type('input-priceWeighting', { value: '50' });
    await clickSaveContinue();

    await utils.type('input-essentialRequirements-1', { numberOfCharacters: 300 });
    await utils.type('input-niceToHaveRequirements-1', { numberOfCharacters: 300 });
    await clickSaveContinue();

    await utils.type('input-culturalFitCriteria-1', { numberOfCharacters: 300 });
    await clickSaveContinue();

    let chkEvaluations = await utils.getElementHandles(`//input[@type="checkbox"]`);
    for (let i in chkEvaluations) {
        let chkEvaluation = chkEvaluations[i];
        await chkEvaluation.press('Space');
    }
    await clickSaveContinue();
    await clickReturnToOverview();
}

async function fillHowLong() {
    await utils.clickLink('How long your brief will be open');
    await utils.selectRadio('1 week');
    await clickSaveContinue();
}

async function fillQuestionAnswer() {
    await utils.clickLink('Question and answer session details');
    await utils.clickLink('Add details');
    await utils.type('input-questionAndAnswerSessionDetails', { numberOfWords: 100 });
    await clickSaveContinue();
    await clickReturnToOverview();
}

async function fillWhoCanRespond() {
    await utils.clickLink('Who can respond');
    await utils.selectRadio('allSellers');
    await clickSaveContinue();
}

async function publishBrief() {
    await utils.clickLink('Review and publish your requirements');
    await utils.clickButton('Publish brief');
    await utils.matchText('h4', 'Your opportunity has been published');
}

async function clickSaveContinue() {
    await utils.clickButton('Save and continue');
}

async function clickReturnToOverview() {
    await utils.clickLink('Return to overview');
}