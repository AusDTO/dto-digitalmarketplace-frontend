export const respond = async (params) => {
    console.log('Starting to respond to atm brief');

    await clickSubmitApplication();
    await matchText('a', 'Enter a date for when you can start the project');
    if (params.criterias) {
        for (let i = 0; i < params.criterias.length; i++) {
            console.log(params.criterias[i])
            await matchText('a', params.criterias[i].criteria);
        }
    }
    await matchText('a', 'You must upload your written proposal');
    await matchText('a', 'You must add a phone number');

    await typeInReactInput('availability', { numberOfCharacters: 100 });
    if (params.criterias) {
        for (let i = 0; i < params.criterias.length; i++) {
            await typeInReactInput(`criteria.${i}`, { numberOfWords: 500 });
        }
    }
    await upload('file_0', 'document.pdf');
    await typeInReactInput('respondToPhone', { value: '0123456789' });

    await clickSubmitApplication();
    await matchText('h4', 'Thanks, your response has been successfully submitted.');
}

const clickSubmitApplication = async () => {
    await clickInputButton('Submit application');
}
