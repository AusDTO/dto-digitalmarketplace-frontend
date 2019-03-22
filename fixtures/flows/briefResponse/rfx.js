import { clickLink, clickButton, matchText, typeInReactInput } from "../utils";


export const respondRFXs = async (params) => {
    console.log('respond to RFxs')

    // apply for opporunity 
    //await clickButton('//*[@id="briefResponse"]/p/input');
    await clickSubmitApplication();

    await matchText('li','You must upload your written proposal');
    await matchText('li', 'You must upload your completed response template');
    await matchText('li', 'You must add a valid phone number');


    await upload('file_0', 'document.pdf','Wriiten proposal');
    await matchText('li', 'You must upload your completed response template');
    await matchText('li', 'You must add a valid phone number');

    await upload('file_0', 'document.pdf','Completed response template');
    await matchText('li', 'You must add a valid phone number');

    await typeInReactInput('respondToPhone', { value: '0123456789' });

    await clickSubmitApplication();

    await matchText('h4', 'Your response has been successfully submitted.')
}

    const clickSubmitApplication = async () => {
        await clickInputButton('Submit application');
    }
