exports.create = async function () {
    console.log('Starting to create outcome brief');
    let now = Date.now();
    await selectLot('digital-outcome');
    await createBrief();
    await fillTitle(`Digital Outcome ${now.valueOf()}`);
    await fillLocation(['Australian Capital Territory', 'Tasmania']);
    await fillDescriptinoOfWork();
    await fillEvaluationProcess();
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

async function fillTitle(role) {
    await utils.type('input-title', role);
    await clickSaveContinue();
}

async function fillLocation(locations) {
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
    await utils.type('input-organisation', utils.words(5, 100));
    await clickSaveContinue();

    await utils.type('input-backgroundInformation', utils.words(500));
    await clickSaveContinue();

    await utils.type('input-outcome', utils.words(500));
    await clickSaveContinue();

    await utils.type('input-endUsers', utils.words(500));
    await clickSaveContinue();

    await utils.type('input-workAlreadyDone', utils.words(500));
    await clickSaveContinue();

    await utils.selectRadio('live');
    await clickSaveContinue();

    await utils.type('input-existingTeam', utils.words(500));
    await clickSaveContinue();

    await utils.type('input-additionalRelevantInformation', utils.words(500));
    await clickSaveContinue();

    await utils.type('input-workplaceAddress', utils.words(100));
    await clickSaveContinue();

    await utils.type('input-workingArrangements', utils.words(500));
    await clickSaveContinue();

    await utils.type('input-securityClearance', utils.words(50));
    await clickSaveContinue();

    await utils.type('input-startDate', utils.words(10));
    await clickSaveContinue();

    await utils.type('input-contractLength', utils.words(100));
    await clickSaveContinue();

    await utils.type('input-additionalTerms', utils.words(500));
    await clickSaveContinue();

    await utils.type('input-budgetRange', utils.words(200));
    await clickSaveContinue();

    await utils.type('input-summary', utils.words(50));
    await clickSaveContinue();

    await clickReturnToOverview();
}

async function fillEvaluationProcess() {
    await utils.clickLink('Shortlist and evaluation process');

    await utils.clickLink('Set maximum number of suppliers you’ll evaluate');
    await utils.type('input-numberOfSuppliers', '3');
    await clickSaveContinue();

    await utils.type('input-technicalWeighting', '25');
    await utils.type('input-culturalWeighting', '25');
    await utils.type('input-priceWeighting', '50');
    await clickSaveContinue();

    await utils.type('input-essentialRequirements-1', utils.words(10));
    await utils.type('input-niceToHaveRequirements-1', utils.words(10));
    await utils.type('input-successCriteria-1', utils.words(10));
    await clickSaveContinue();

    await utils.type('input-culturalFitCriteria-1', utils.words(10));
    await clickSaveContinue();

    await utils.selectRadio('Fixed price');
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
    await utils.type('input-questionAndAnswerSessionDetails', utils.words(100));
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