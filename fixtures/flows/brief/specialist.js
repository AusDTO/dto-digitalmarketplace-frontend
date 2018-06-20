export const create = async (params) => {
    console.log(`Starting to create ${params.areaOfExpertise} brief`);
    await selectLot('digital-professionals');
    await createBrief();
    await fillRole(params.title);
    await selectLocation(params.locations);
    await fillDescriptionOfWork();
    await fillEvaluationProcess(params.areaOfExpertise, params.evaluations);
    await fillHowLong();
    await fillQuestionAnswer();
    await fillWhoCanRespond();
    await publishBrief();
}

const selectLot = async (lot) => {
    await selectRadio(lot);
    await clickLink('Continue');
}

const createBrief = async () => {
    await clickButton('Create brief');
}

const fillRole = async (role) => {
    await type('input-title', { value: role });
    await clickSaveContinue();
}

const selectLocation = async (locations) => {
    await clickLink('Location');

    for (let i in locations) {
        let location = locations[i];
        await selectCheck(location);
    }

    await clickSaveContinue();
}

const fillDescriptionOfWork = async () => {
    await clickLink('Description of work');
    await clickLink('Add organisation');

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
        await type(field.id, field.options);
        await clickSaveContinue();
    }

    await clickReturnToOverview();
}

const fillEvaluationProcess = async (areaOfExpertise, evaluations) => {
    await clickLink('Shortlist and evaluation process');
    await clickLink('Please choose an area of expertise');

    await selectRadio(areaOfExpertise);
    await clickSaveContinue();

    await type('input-numberOfSuppliers', { value: '3' });
    await clickSaveContinue();

    await type('input-technicalWeighting', { value: '25' });
    await type('input-culturalWeighting', { value: '25' });
    await type('input-priceWeighting', { value: '50' });
    await clickSaveContinue();

    await type('input-essentialRequirements-1', { numberOfCharacters: 300 });
    await type('input-niceToHaveRequirements-1', { numberOfCharacters: 300 });
    await clickSaveContinue();

    await type('input-culturalFitCriteria-1', { numberOfCharacters: 300 });
    await clickSaveContinue();

    for (let i in evaluations) {
        let evaluation = evaluations[i];
        await selectCheck(evaluation);
    }
    await clickSaveContinue();
    await clickReturnToOverview();
}

const fillHowLong = async () => {
    await clickLink('How long your brief will be open');
    await selectRadio('1 week');
    await clickSaveContinue();
}

const fillQuestionAnswer = async () => {
    await clickLink('Question and answer session details');
    await clickLink('Add details');
    await type('input-questionAndAnswerSessionDetails', { numberOfWords: 100 });
    await clickSaveContinue();
    await clickReturnToOverview();
}

const fillWhoCanRespond = async () => {
    await clickLink('Who can respond');
    await selectRadio('allSellers');
    await clickSaveContinue();
}

const publishBrief = async () => {
    await clickLink('Review and publish your requirements');
    await clickButton('Publish brief');
    await matchText('h4', 'Your opportunity has been published');
}

const clickSaveContinue = async () => {
    await clickButton('Save and continue');
}

const clickReturnToOverview = async () => {
    await clickLink('Return to overview');
}