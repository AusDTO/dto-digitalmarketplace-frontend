export const respond = async (params) => {
    console.log('Starting to respond to atm brief');

    await clickSubmitResponse();
    await matchText('a', 'Enter a date for when you can start the project');
    await matchText('a', 'Choose a file for your written proposal');
    await matchText('a', 'Choose a file for your project costs');
    await matchText('a', 'Choose a file for your trainer résumés');
    await matchText('a', 'A contact number is required');

    await typeInReactInput('availability', { numberOfCharacters: 100 });
    await upload('file_0', 'document.pdf');
    await upload('file_1', 'document.pdf');
    await upload('file_2', 'document.pdf');
    await typeInReactInput('respondToPhone', { value: '0123456789' });

    await clickSubmitResponse();
}

const clickSubmitResponse = async () => {
    await clickInputButton('Submit response');
}
