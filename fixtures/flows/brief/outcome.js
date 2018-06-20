export const create = async (params) => {
    console.log('Starting to create outcome brief');
    await selectLot('digital-outcome');
    await createBrief();
    await fillTitle(params.title);
    await fillLocation(params.locations);
    await fillDescriptinoOfWork();
    await fillEvaluationProcess(params.evaluations);
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

const fillTitle = async (role) => {
    await type('input-title', { value: role });
    await clickSaveContinue();
}

const fillLocation = async (locations) => {
    await clickLink('Location');

    for (let i in locations) {
        let location = locations[i];
        await selectCheck(location);
    }

    await clickSaveContinue();
}

const fillDescriptinoOfWork = async () => {
    await clickLink('Description of work');
    await clickLink('Add organisation');

    let fields = [
        { id: 'input-organisation', options: { numberOfCharacters: 100 } },
        { id: 'input-backgroundInformation', options: { numberOfWords: 500 } },
        { id: 'input-outcome', options: { numberOfWords: 500 } },
        { id: 'input-endUsers', options: { numberOfWords: 500 } },
        { id: 'input-workAlreadyDone', options: { numberOfWords: 500 } }
    ]
    for (var i in fields) {
        let field = fields[i];
        await type(field.id, field.options);
        await clickSaveContinue();
    }

    await selectRadio('live');
    await clickSaveContinue();

    fields = [
        { id: 'input-existingTeam', options: { numberOfCharacters: 500 } },
        { id: 'input-additionalRelevantInformation', options: { numberOfWords: 500 } },
        { id: 'input-workplaceAddress', options: { numberOfWords: 100 } },
        { id: 'input-workingArrangements', options: { numberOfWords: 500 } },
        { id: 'input-securityClearance', options: { numberOfWords: 50 } },
        { id: 'input-startDate', options: { numberOfWords: 10 } },
        { id: 'input-contractLength', options: { numberOfWords: 100 } },
        { id: 'input-additionalTerms', options: { numberOfWords: 500 } },
        { id: 'input-budgetRange', options: { numberOfWords: 200 } },
        { id: 'input-summary', options: { numberOfWords: 50 } }
    ]
    for (var i in fields) {
        let field = fields[i];
        await type(field.id, field.options);
        await clickSaveContinue();
    }

    await clickReturnToOverview();
}

const fillEvaluationProcess = async (evaluations) => {
    await clickLink('Shortlist and evaluation process');

    await clickLink('Set maximum number of suppliers you’ll evaluate');
    await type('input-numberOfSuppliers', { value: '3' });
    await clickSaveContinue();

    await type('input-technicalWeighting', { value: '25' });
    await type('input-culturalWeighting', { value: '25' });
    await type('input-priceWeighting', { value: '50' });
    await clickSaveContinue();

    await type('input-essentialRequirements-1', { numberOfWords: 10 });
    await type('input-niceToHaveRequirements-1', { numberOfWords: 10 });
    await type('input-successCriteria-1', { numberOfWords: 10 });
    await clickSaveContinue();

    await type('input-culturalFitCriteria-1', { numberOfWords: 10 });
    await clickSaveContinue();

    await selectRadio('Fixed price');
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