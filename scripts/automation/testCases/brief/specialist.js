const utils = require('../../utils');

exports.create = async function (page, areaOfExpertise) {
    console.log(`Starting to create ${areaOfExpertise} brief`);
    let now = Date.now();
    await selectLot(page, 'digital-professionals');
    await createBrief(page);
    await fillRole(page, `${areaOfExpertise} Role ${now.valueOf()}`);
    await selectLocation(page, ['Australian Capital Territory', 'Tasmania']);
    await fillDescriptinoOfWork(page);
    await fillEvaluationProcess(page, areaOfExpertise);
    await fillHowLong(page);
    await fillQuestionAnswer(page);
    await fillWhoCanRespond(page);
    await publishBrief(page);
}

async function selectLot(page, lot) {
    await utils.selectRadio(page, lot);
    await utils.clickLink(page, 'Continue');
}

async function createBrief(page) {
    await utils.clickButton(page, 'Create brief');
}

async function fillRole(page, role) {
    await utils.type(page, 'input-title', role);
    await clickSaveContinue(page);
}

async function selectLocation(page, locations) {
    await utils.clickLink(page, 'Location');

    for (let i in locations) {
        let location = locations[i];
        await utils.selectCheck(page, location);
    }

    await clickSaveContinue(page);
}

async function fillDescriptinoOfWork(page) {
    await utils.clickLink(page, 'Description of work');
    await utils.clickLink(page, 'Add organisation');

    await utils.type(page, 'input-organisation', utils.words(20, 100));
    await clickSaveContinue(page);

    await utils.type(page, 'input-specialistWork', utils.words(100));
    await clickSaveContinue(page);

    await utils.type(page, 'input-existingTeam', utils.words(100));
    await clickSaveContinue(page);

    await utils.type(page, 'input-additionalRelevantInformation', utils.words(500));
    await clickSaveContinue(page);

    await utils.type(page, 'input-workplaceAddress', utils.words(100));
    await clickSaveContinue(page);

    await utils.type(page, 'input-workingArrangements', utils.words(500));
    await clickSaveContinue(page);

    await utils.type(page, 'input-securityClearance', utils.words(50));
    await clickSaveContinue(page);

    await utils.type(page, 'input-startDate', utils.words(20, 100));
    await clickSaveContinue(page);

    await utils.type(page, 'input-contractLength', utils.words(100));
    await clickSaveContinue(page);

    await utils.type(page, 'input-additionalTerms', utils.words(500));
    await clickSaveContinue(page);

    await utils.type(page, 'input-budgetRange', utils.words(100));
    await clickSaveContinue(page);

    await utils.type(page, 'input-summary', utils.words(50));
    await clickSaveContinue(page);

    await clickReturnToOverview(page);
}

async function fillEvaluationProcess(page, areaOfExpertise) {
    await utils.clickLink(page, 'Shortlist and evaluation process');
    await utils.clickLink(page, 'Please choose an area of expertise');

    await utils.selectRadio(page, areaOfExpertise);
    await clickSaveContinue(page);

    await utils.type(page, 'input-numberOfSuppliers', '3');
    await clickSaveContinue(page);

    await utils.type(page, 'input-technicalWeighting', '25');
    await utils.type(page, 'input-culturalWeighting', '25');
    await utils.type(page, 'input-priceWeighting', '50');
    await clickSaveContinue(page);

    await utils.type(page, 'input-essentialRequirements-1', utils.words(100, 300));
    await utils.type(page, 'input-niceToHaveRequirements-1', utils.words(100, 300));
    await clickSaveContinue(page);

    await utils.type(page, 'input-culturalFitCriteria-1', utils.words(100, 300));
    await clickSaveContinue(page);

    let chkEvaluations = await utils.getElementHandles(page, `//input[@type="checkbox"]`);
    for (let i in chkEvaluations) {
        let chkEvaluation = chkEvaluations[i];
        await chkEvaluation.press('Space');
    }
    await clickSaveContinue(page);
    await clickReturnToOverview(page);
}

async function fillHowLong(page) {
    await utils.clickLink(page, 'How long your brief will be open');
    await utils.selectRadio(page, '1 week');
    await clickSaveContinue(page);
}

async function fillQuestionAnswer(page) {
    await utils.clickLink(page, 'Question and answer session details');
    await utils.clickLink(page, 'Add details');
    await utils.type(page, 'input-questionAndAnswerSessionDetails', utils.words(100));
    await clickSaveContinue(page);
    await clickReturnToOverview(page);
}

async function fillWhoCanRespond(page) {
    await utils.clickLink(page, 'Who can respond');
    await utils.selectRadio(page, 'allSellers');
    await clickSaveContinue(page);
}

async function publishBrief(page) {
    await utils.clickLink(page, 'Review and publish your requirements');
    await utils.clickButton(page, 'Publish brief');
    let confirmations = await utils.getElementHandles(page, '//h4[text()="Your opportunity has been published"]');
}

async function clickSaveContinue(page) {
    await utils.clickButton(page, 'Save and continue');
}

async function clickReturnToOverview(page) {
    await utils.clickLink(page, 'Return to overview');
}