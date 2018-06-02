const utils = require('../../utils');

exports.create = async function (page) {
  console.log('Starting to create outcome brief');
  let now = Date.now();
  await selectLot(page, 'digital-outcome');
  await createBrief(page);
  await fillTitle(page, `Digital Outcome ${now.valueOf()}`);
  await fillLocation(page, ['Australian Capital Territory', 'Tasmania']);
  await fillDescriptinoOfWork(page);
  await fillEvaluationProcess(page);
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

async function fillTitle(page, role) {
  await utils.type(page, 'input-title', role);
  await clickSaveContinue(page);
}

async function fillLocation(page, locations) {
  await utils.clickLink(page, 'Location');

  for (let i in locations) {
    let location = locations[i];
    utils.selectCheck(page, location);
  }

  await clickSaveContinue(page);
}

async function fillDescriptinoOfWork(page) {
  await utils.clickLink(page, 'Description of work');
  await utils.clickLink(page, 'Add organisation');
  await utils.type(page, 'input-organisation', utils.words(5, 100));
  await clickSaveContinue(page);

  await utils.type(page, 'input-backgroundInformation', utils.words(500));
  await clickSaveContinue(page);

  await utils.type(page, 'input-outcome', utils.words(500));
  await clickSaveContinue(page);

  await utils.type(page, 'input-endUsers', utils.words(500));
  await clickSaveContinue(page);

  await utils.type(page, 'input-workAlreadyDone', utils.words(500));
  await clickSaveContinue(page);

  await utils.selectRadio(page, 'live');
  await clickSaveContinue(page);

  await utils.type(page, 'input-existingTeam', utils.words(500));
  await clickSaveContinue(page);

  await utils.type(page, 'input-additionalRelevantInformation', utils.words(500));
  await clickSaveContinue(page);

  await utils.type(page, 'input-workplaceAddress', utils.words(100));
  await clickSaveContinue(page);

  await utils.type(page, 'input-workingArrangements', utils.words(500));
  await clickSaveContinue(page);

  await utils.type(page, 'input-securityClearance', utils.words(50));
  await clickSaveContinue(page);

  await utils.type(page, 'input-startDate', utils.words(10));
  await clickSaveContinue(page);

  await utils.type(page, 'input-contractLength', utils.words(100));
  await clickSaveContinue(page);
  
  await utils.type(page, 'input-additionalTerms', utils.words(500));
  await clickSaveContinue(page);
  
  await utils.type(page, 'input-budgetRange', utils.words(200));
  await clickSaveContinue(page);

  await utils.type(page, 'input-summary', utils.words(500));
  await clickSaveContinue(page);  

  await clickReturnToOverview(page);
}

async function fillEvaluationProcess(page) {
  await utils.clickLink(page, 'Shortlist and evaluation process');

  await utils.clickLink(page, 'Set maximum number of suppliers you’ll evaluate');
  await utils.type(page, 'input-numberOfSuppliers', '3');
  await clickSaveContinue(page);

  await utils.type(page, 'input-technicalWeighting', '25');
  await utils.type(page, 'input-culturalWeighting', '25');
  await utils.type(page, 'input-priceWeighting', '50');
  await clickSaveContinue(page);

  await utils.type(page, 'input-essentialRequirements-1', utils.words(10));
  await utils.type(page, 'input-niceToHaveRequirements-1', utils.words(10));
  await utils.type(page, 'input-successCriteria-1', utils.words(10));
  await clickSaveContinue(page);

  await utils.type(page, 'input-culturalFitCriteria-1', utils.words(10));
  await clickSaveContinue(page);

  await utils.selectRadio(page, 'Fixed price');
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
  await utils.type(page, 'input-questionAndAnswerSessionDetails', 'Session details');
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
}

async function clickSaveContinue(page) {
  await utils.clickButton(page, 'Save and continue');
}

async function clickReturnToOverview(page) {
  await utils.clickLink(page, 'Return to overview');
}