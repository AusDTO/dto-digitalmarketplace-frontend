export const create = async (params) => {
    console.log('Starting to create training brief');
    await createBrief();
    await fillTitle(params.title);
    await fillOrganisation();
    await fillWhatTraining();
    await fillLds();
    await fillTrainingDetail();
    await fillWhyTraining();
    await fillAudience();
    await fillTrainingLength();
    await fillTrainingMethod();
    await fillHowLong();
    await fillWhoCanRespond();
    await fillContactNumber();
    await fillCommencementDate();
    await fillLocation(params.locations);
    await fillBudgetRange();
    await fillPaymentApproach();
    await fillSecurityClearance();
    await fillContractLength();
    await fillIntellectualProperty();
    await fillAdditionalTerms();
    await fillNumberOfSellers();
    await fillEvaluationRating();
    await fillTechnicalCompetenceCriteria();
    await fillCulturalFitCriteria();
    await fillAssessmentMethods(params.evaluations);
    await fillSummary();
    await fillQuestionAnswer();
    await publishBrief();
}

const createBrief = async () => {
    await clickLink('Training');
    await clickInputButton('Create opportunity');
}

const fillTitle = async (role) => {
    await type('input-title', { value: role });
    await clickSaveContinue();
}

const fillOrganisation = async () => {
    await type('input-organisation', { numberOfCharacters: 100 });
    await clickSaveContinue();
}

const fillWhatTraining = async () => {
    await selectCheck('Digital foundations');
    await selectCheck('Agile delivery');
    await selectCheck('User research');
    await selectCheck('Content design');
    await selectCheck('Other');
    await clickSaveContinue();
}

const fillLds = async () => {
    await clickSaveContinue();
    await matchText('a', 'What the training needs to cover:');

    await selectRadio('ldsUnits');
    await clickSaveContinue();
    await matchText('a', 'Select unit(s)');

    await selectRadio('specify');
    await clickSaveContinue();
    await matchText('a', 'Describe what the training needs to cover');

    await selectRadio('ldsUnits');
    await selectCheck('Unit 1: The Australian Government’s digital service context');
    await selectCheck('Unit 2: Agile and working in a multidisciplinary team​');
    await selectCheck('Unit 3: Working in a digital delivery team - design and delivery phases​');
    await selectCheck('Unit 4: Frameworks for digital services');
    await clickSaveContinue();

    await selectRadio('specify');
    await type('input-ldsAgileDeliveryTrainingNeeds', { numberOfWords: 500 });
    await clickSaveContinue();

    for (let i = 0; i < 2; i++) {
        await selectRadio('sellerProposal');
        await clickSaveContinue();
    }
}

const fillTrainingDetail = async () => {
    await type('input-trainingDetailType', { numberOfCharacters: 100 });
    await type('input-trainingDetailCover', { numberOfWords: 500 });
    await clickSaveContinue();
}

const fillWhyTraining = async () => {
    await type('input-whyTraining', { numberOfWords: 500 });
    await clickSaveContinue();
}

const fillAudience = async () => {
    await type('input-audience', { numberOfWords: 200 });
    await clickSaveContinue();
}

const fillTrainingLength = async () => {
    await type('input-trainingLength', { numberOfCharacters: 100 });
    await clickSaveContinue();
}

const fillTrainingMethod = async () => {
    await selectRadio('ownPreference');
    await clickSaveContinue();
    await matchText('a', 'Define preference');
    await type('input-trainingApproachOwn', { numberOfWords: 100 });
    await clickSaveContinue();
}

const fillHowLong = async () => {
    await selectRadio('2 weeks');
    await clickSaveContinue();
}

const fillWhoCanRespond = async () => {
    await selectRadio('allSellers');
    await clickSaveContinue();
}

const fillContactNumber = async () => {
    await type('input-contactNumber', { numberOfCharacters: 100 });
    await clickSaveContinue();
}

const fillCommencementDate = async () => {
    await type('input-startDate', { numberOfCharacters: 100 });
    await type('input-timeframeConstraints', { numberOfWords: 200 });
    await clickSaveContinue();
}

const fillLocation = async (locations) => {
    await type('input-locationCityOrRegion', { numberOfCharacters: 100 });

    await clickSaveContinue();

    for (let i in locations) {
        let location = locations[i];
        await selectCheck(location);
    }

    await clickSaveContinue();
}

const fillBudgetRange = async () => {
    await type('input-budgetRange', { numberOfWords: 200 });
    await clickSaveContinue();
}

const fillPaymentApproach = async () => {
    await type('input-paymentApproachAdditionalInformation', { numberOfCharacters: 200 });
    await selectRadio('fixedPrice');
    await clickSaveContinue();
}

const fillSecurityClearance = async () => {
    await type('input-securityClearance', { numberOfCharacters: 100 });
    await clickSaveContinue();
}

const fillContractLength = async () => {
    await type('input-contractLength', { numberOfWords: 200 });
    await clickSaveContinue();
}

const fillIntellectualProperty = async () => {
    await selectRadio('commonwealth');
    await clickSaveContinue();
}

const fillAdditionalTerms = async () => {
    await type('input-additionalTerms', { numberOfWords: 200 });
    await clickSaveContinue();
}

const fillNumberOfSellers = async () => {
    await type('input-numberOfSuppliers', { value: 3 });
    await clickSaveContinue();
}

const fillEvaluationRating = async () => {
    await type('input-technicalWeighting', { value: '25' });
    await type('input-culturalWeighting', { value: '25' });
    await type('input-priceWeighting', { value: '50' });
    await clickSaveContinue();
}

const fillTechnicalCompetenceCriteria = async () => {
    await type('input-essentialRequirements-1', { numberOfWords: 10 });
    await type('input-niceToHaveRequirements-1', { numberOfWords: 10 });
    await clickSaveContinue();
}

const fillCulturalFitCriteria = async () => {
    await type('input-culturalFitCriteria-1', { numberOfWords: 10 });
    await clickSaveContinue();
}

const fillAssessmentMethods = async (evaluations) => {
    for (let i in evaluations) {
        let evaluation = evaluations[i];
        await selectCheck(evaluation);
    }
    await clickSaveContinue();
}

const fillSummary = async () => {
    await type('input-summary', { numberOfWords: 200 });
    await clickSaveContinue();
}

const fillQuestionAnswer = async () => {
    await type('input-questionAndAnswerSessionDetails', { numberOfWords: 200 });
    await clickSaveContinue();
}

const publishBrief = async () => {
    await clickLink('Review and publish your requirements');
    await clickInputButton('Publish brief');
    await matchText('h4', 'Your opportunity has been published');
}

const clickSaveContinue = async () => {
    await clickInputButton('Save and continue');
}
