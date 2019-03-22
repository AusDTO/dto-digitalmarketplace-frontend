export const respond = async (params) => {
    console.log('Starting to respond to atm brief');

    await clickStartApplication(params.specialistNumber);
    await matchText('a', 'A name is required');
    await typeInReactInput('specialistName', { numberOfCharacters: 100 });
    await clickStartApplication(params.specialistNumber);

    await clickSubmitApplication();
    await matchText('a', 'Enter a date for when you can start the project');
    await matchText('a', 'A day rate is required');
    await matchText('a', 'Choose a file for your résumés');

    await typeInReactInput('availability', { numberOfCharacters: 100 });
    await typeInReactInput('dayRate', { value: '1000' });
    await upload('file_0', 'document.pdf');
    await typeInReactInput('essentialRequirement.0', { numberOfWords: 150 });
    await typeInReactInput('niceToHaveRequirement.0', { numberOfWords: 150 });

    await clickSubmitApplication();
    await matchText('strong', `You have submitted`);
}

const clickStartApplication = async (specialistNumber) => {
    if (specialistNumber === 0) {
        await clickInputButton('Start application');
    } else {
        await clickInputButton('Continue');
    }
}

const clickSubmitApplication = async () => {
    await clickInputButton('Submit specialist');
}
