import * as util from '../../flows/utils'

const clickSaveContinue = async () => {
  await util.clickButton('Save and continue')
}

const clickReturnToOverview = async () => {
  await util.clickLink('Return to overview')
}

const createBrief = async () => {
  await util.clickLink('Specialist')
  await util.clickLink('Create and publish request')
  await util.clickButton('Start now')
}

const fillAbout = async (role, locations) => {
    //check the errors 
    await clickSaveContinue()
    await util.matchText('li','Enter the title for your brief')
    await util.matchText('li','Enter the name of your organisation')
    await util.matchText('li','Enter what will the specialist do of your brief')
    await util.matchText('li','You must select at least one location')
    //check if with number of characters 100
    await util.typeInReactInput('title', { value: role  })
    await util.typeInReactInput('organisation', { numberOfCharacters: 100 })
    await util.typeInReactInput('summary', { numberOfWords: 1000 })
  
    locations.forEach(async location => {
      await util.selectCheck(location)
    })
    
    await clickSaveContinue()
  }

const fillWhoCanRespond = async () => {
    await clickSaveContinue()
    await util.matchText('li', 'You must select a panel category')
    await selectDropBox()
}

//fix the config file and fix the dropbox
const selectDropBox = async () => {
  const rfxPanelCategory = process.env.RFX_PANEL_CATEGORY
  await page.select(`#select-seller-category-select`, rfxPanelCategory)

  await util.selectRadio('category')
  const rfxSellerName = process.env.RFX_SELLER_NAME
  await util.typeInReactInput('seller-search', { value: rfxSellerName })
  let searchResult = await util.getElementHandles(`//input[@id="seller-search"]/../../ul/li[1]/a`)
  let sr = searchResult[0]
  sr.click()

  await util.typeInReactInput('seller-search', { value: '%%%' })
  searchResult = await util.getElementHandles('//input[@id="seller-search"]/../../ul/li')
  const resultCount = searchResult.length
  for (let i = 1; i <= resultCount; i += 1) {
    if (i > 1) {
      await util.sleep(100)
      await util.typeInReactInput('seller-search', { value: '%%%' })
    }
    searchResult = await util.getElementHandles(`//input[@id="seller-search"]/../../ul/li[${i}]/a`)
    sr = searchResult[0]
    sr.click()
  }
  await clickSaveContinue()
}

  const fillEvaluationCriteria = async () => {
      //await util.selectCheck('includeWeightingsEssential')
      await clickSaveContinue()
      //NEED TO ADD THIS
      await util.matchText('li', 'Essential criteria is required.')
      //await util.clickLink('Add another criteria')
      await util.typeInReactInput('essential_criteria_0', { numberOfWords: 50 })
     // await util.typeInReactInput('essential_weighting_0', { value: '50' })
      //await util.typeInReactInput('essential_criteria_1', { numberOfWords: 50 })
      //await util.typeInReactInput('essential_weighting_1', { value: '50' })
      await clickSaveContinue()
    }


  const fillSellerResponses = async () =>{
      await clickSaveContinue()
      await util.matchText('li', 'You must select security clearance')
      await util.selectCheck('References')
      await util.selectCheck('Interviews')
      await util.selectCheck('Scenario or tests')
      await util.selectCheck('Presentations')
      await util.selectRadio('hourlyRate')
      // security clearances
      await util.selectRadio('noneRequired')
      await util.selectRadio("abilityToObtain")
      await util.selectRadio('mustHave')
      const clearanceRequired = process.env.CLEARANCE_REQUIRED
      await page.select(`#securityClearanceCurrent`, clearanceRequired)
      await clickSaveContinue()
    }




    

      //await util.sleep(300)
      //searchResult = await util.getElementHandles(`//*[@id="securityClearanceCurrent"]/option[2]`)
      //let sr = searchResult[0]
      //searchResult.click()

     // await clickSaveContinue()
      
    

  const fillTimeframes = async () =>{
        await clickSaveContinue()
        await util.matchText('li', 'Enter an estimated start date for the brief')
        await util.matchText('li', 'Enter a contract length for the brief')
        const now = new Date()
        const future = new Date(now.setDate(now.getDate() + 14))
        await util.typeInReactInput('day', { value: `${future.getDate()}` })
        await util.typeInReactInput('month', { value: `${future.getMonth() + 1}` })
        await util.typeInReactInput('year', { value: `${future.getFullYear()}` })
        await util.typeInReactInput('contractLength', { numberOfCharacters: 100 })
        await clickSaveContinue()
      }
  
    const fillAdditionalInformation = async () =>{
      await clickSaveContinue()
      await util.matchText('li', 'Contact number is required')
      await util.upload('file_0', 'document.pdf', 'Additional documents (optional)')
      await util.typeInReactInput('contactNumber', {value: '01234455667733'})
      await clickSaveContinue()

    }

const publishBrief = async () => {await clickSaveContinue()
  await util.matchText('li', 'You must add a closing date at least 2 days from now')
  const now = new Date()
  const future = new Date(now.setDate(now.getDate() + 14))
  await util.typeInReactInput('day', { value: `${future.getDate()}` })
  await util.typeInReactInput('month', { value: `${future.getMonth() + 1}` })
  await util.typeInReactInput('year', { value: `${future.getFullYear()}` })
}


const create = async params => {
  console.log(`Starting to create ${params.areaOfExpertise} brief`)
  await createBrief()
  await fillAbout(params.title, params.locations)
  await fillWhoCanRespond()
  await fillEvaluationCriteria()
  await fillSellerResponses()
  await fillTimeframes()
  await fillAdditionalInformation()
  await publishBrief()
  return {
    criterias
  }
}

export default create
