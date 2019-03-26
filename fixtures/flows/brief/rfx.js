import { sleep } from "../utils";

export const create = async (params) => {
    console.log('Starting to create outcome RXF brief');
    await createBrief();
    await fillWhoCanRespond();
    await fillAbout(params.title, params.locations);
    await fillResponseFormats();
    await fillRequirements();
    await fillTimeframesAndBudget();
    await fillEvaluationCriteria();
    await fillClosingDate();
    await fillPublishBrief();
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
    await selectDropBox();
}

const selectDropBox = async() => {
    const rfxPanelCategory = process.env.RFX_PANEL_CATEGORY;
    await page.select(`#seller-search-category-select`, rfxPanelCategory);

    const rfxSellerName = process.env.RFX_SELLER_NAME;
    await sleep(100);
    await typeInReactInput('seller-search', { value: rfxSellerName });
    let searchResult = await getElementHandles(`//input[@id="seller-search"]/../../ul/li[1]/a`);
    let sr = searchResult[0];
    sr.click();

    await typeInReactInput('seller-search', { value: '%%%' });
    searchResult = await getElementHandles('//input[@id="seller-search"]/../../ul/li');
    let resultCount = searchResult.length;
    for (let i=1; i<=resultCount; i++) {
        if (i>1) {
            await sleep(100);
            await typeInReactInput('seller-search', { value: '%%%' });
        }
        searchResult = await getElementHandles(`//input[@id="seller-search"]/../../ul/li[${i}]/a`);
        sr = searchResult[0];
        sr.click();
    }
    await clickSaveContinue();
}


const fillAbout = async (role, locations) => {

    await clickSaveContinue();
    await matchText('li', 'You must add a title');
    await matchText('li', 'You must add the name of your department, agency or organisation');
    await matchText('li', 'You must add a summary of work to be done');
    await matchText('li', 'You must add the working arrangements');
    await matchText('li', 'You must select a location of where the work can be done');
    await typeInReactInput('title', { value: role });
    await typeInReactInput('organisation', { numberOfCharacters: 100 });
    await typeInReactInput('summary', { numberOfWords: 150 });

    for (let i in locations) {
        let location = locations[i];
        await selectCheck(location);
    }
    await typeInReactInput('working_arrangements', {numberOfCharacters: 150});
    await typeInReactInput('clearance', {numberOfCharacters: 100});
    await clickSaveContinue();
}

const fillResponseFormats = async () => {
    await clickSaveContinue();
    await matchText('li', 'You must choose what you would like sellers to provide through the Marketplace');
    await selectCheck('Written proposal');
    await clickSaveContinue();
    await matchText('li', 'You must select at least one proposal type.');
    await selectCheck('Breakdown of costs');
    await selectCheck('Case study');
    await selectCheck('References');
    await selectCheck('Résumés');
    await selectCheck('Response template');
    await selectCheck('Presentation');
    await clickSaveContinue();
}

const fillRequirements = async () =>{
    await clickSaveContinue();
    await matchText('li', 'You must upload a requirements document');
    await upload('file_0', 'document.pdf', 'Requirements document');
    await upload('file_0', 'document.pdf', 'Response template');
    await upload('file_0', 'document.pdf', 'Additional documents (optional)');
    await typeInReactInput('industryBriefing', { numberOfWords: 150 });
    await clickSaveContinue();

}
const fillTimeframesAndBudget = async () =>{
    await clickSaveContinue();
    await matchText('li', 'You must add an estimated start date');
    await matchText('li', 'You must add a contract length');
    await typeInReactInput('start_date', {numberOfCharacters: 150});
    await typeInReactInput('contract_length-label', {numberOfCharacters: 50});
    await typeInReactInput('contract_extensions', {numberOfCharacters: 50});
    await typeInReactInput('budget_range', {numberOfWords: 150});
    await clickSaveContinue();
}


const fillEvaluationCriteria = async () =>{

    await clickSaveContinue();
    await matchText('li', 'You must not have any empty criteria.');
    await matchText('li', 'Weightings must be greater than 0.');
    await matchText('li', 'You must not have any empty criteria.');
    await clickLink('Add another criteria');
    await typeInReactInput('criteria_0', { numberOfWords:50 });
    await typeInReactInput('weighting_0', { value: '50' });
    await typeInReactInput('criteria_1', { numberOfWords:50 });
    await typeInReactInput('weighting_1', { value: '50' });
    await clickSaveContinue();
}


const fillClosingDate = async() =>{
    await clickSaveContinue();
    await matchText('li', 'You must add a closing date at least 2 days from now');
    await matchText('li', 'You must add a contact number');
    let now = new Date();
    let future = new Date(now.setDate(now.getDate() + 14));
    await typeInReactInput('day', { value: `${future.getDate()}` });
    await typeInReactInput('month', { value: `${future.getMonth() + 1}` });
    await typeInReactInput('year', { value: `${future.getFullYear()}` });
    await typeInReactInput('contact', { value: '0123456789' });
    await clickSaveContinue();
}



const fillPublishBrief = async () => {
    await clickButton('Publish');
    await matchText('h1', 'Your opportunity is now live, and the invited sellers have been notified.');
}





const clickSaveContinue = async () => {
    console.log("here");
    await clickButton('Save and continue');
}


   


  










   
    



    
