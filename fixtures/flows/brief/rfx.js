export const create = async (params) => {
    console.log('Starting to create outcome brief');
    await createBrief();
    await fillWhoCanRespond();
}

const createBrief = async () => {
    await clickLink('/2/outcome-choice', true);
    await clickLink('/2/buyer-rfx/create', true);
    await clickLink('Create and publish request');
    await clickButton('Start now');
}

const fillWhoCanRespond = async () => {
    await clickSaveContinue();
    await matchText('li', 'You must select at least one panel category');
    //await selectRadio('category');
}