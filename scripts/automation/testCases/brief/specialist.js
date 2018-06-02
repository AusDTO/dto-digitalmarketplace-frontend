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
    utils.selectCheck(page, location);
  }

  await clickSaveContinue(page);
}

async function fillDescriptinoOfWork(page) {
  await utils.clickLink(page, 'Description of work');
  await utils.clickLink(page, 'Add organisation');
  await fillDescriptionOfWorkFields(page);
  await clickReturnToOverview(page);
}

async function fillDescriptionOfWorkFields(page) {
  await page.waitForNavigation();
  let inputs = await page.$x('//*[contains(@class, "text-box")]');
  if (inputs.length > 0) {
    for (let j in inputs) {
      let input = inputs[j];
      await input.type('Text');
    }
    await clickSaveContinue(page);
    await fillDescriptionOfWorkFields(page);
  }
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

  await utils.type(page, 'input-essentialRequirements-1', 'Essential skills and experience 1');
  await utils.type(page, 'input-niceToHaveRequirements-1', 'Nice to have skills and experience 1');
  await clickSaveContinue(page);

  await utils.type(page, 'input-culturalFitCriteria-1', 'Work as a team with our organisation and other suppliers');
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