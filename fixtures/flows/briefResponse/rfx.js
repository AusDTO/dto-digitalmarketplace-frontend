import { clickLink, clickButton, matchText, typeInReactInput } from "../utils";


export const respond = async (params) => {
    console.log('respond to RFxs')

    // apply for opporunity 
    await clickSubmitApplication();

    await matchText('a','You must upload your written proposal');
    await matchText('a', 'You must upload your completed response template');
    await matchText('a', 'You must add a valid phone number');


    await upload('file_0', 'document.pdf');                               
    await clickSubmitApplication();
    await matchText('a', 'You must upload your completed response template');
    await matchText('a', 'You must add a valid phone number');

    await upload('file_1', 'document.pdf');
    await clickSubmitApplication();

    await matchText('a', 'You must add a valid phone number');
    await typeInReactInput('respondToPhone', { value: '0123456789' });
    await clickSubmitApplication();

    await matchText('h4', 'Your response has been successfully submitted.')
}

    const clickSubmitApplication = async () => {
        await clickInputButton('Submit application');
    }
