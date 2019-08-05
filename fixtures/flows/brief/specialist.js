import format from 'date-fns/format'
import * as util from '../../flows/utils'

const clickSaveContinue = async () => {
  await util.clickButton('Save and continue')
}

const createBrief = async () => {
  await util.clickLink('Specialist')
  await util.clickLink('Create and publish request')
  await util.clickButton('Start now')
}

const fillAbout = async (role, locations) => {
  await clickSaveContinue()
  await util.matchText('li', 'Enter the title for your opportunity.')
  await util.matchText('li', 'what will the specialist do')
  await util.matchText('li', 'You must select at least one location.')
  await util.typeInReactInput('title', { value: role })
  await util.typeInReactInput('summary', { numberOfWords: 1000 })

  locations.forEach(async location => {
    await util.selectCheck(location)
  })

  await clickSaveContinue()
}

const fillWhoCanRespond = async categoryId => {
  await clickSaveContinue()
  await util.matchText('li', 'You must select a category')
  await page.select(`#select-seller-category-select`, categoryId)

  await util.selectRadio('selected')
  await clickSaveContinue()
  await util.matchText('li', 'You must add at least one seller')

  await util.selectRadio('all')
  await clickSaveContinue()
}

const fillSelectionCriteria = async () => {
  await util.selectCheck('includeWeightingsEssential', 'id')
  await util.selectCheck('includeWeightingsNiceToHave', 'id')
  await clickSaveContinue()
  await util.matchText('li', 'You cannot have blank essential criteria.')
  await util.matchText('li', 'You cannot have blank essential weightings.')
  await util.matchText('li', 'Desirable weightings must add up to 100%.')

  const essCriteria = await util.typeInReactInput('essential_criteria_0', { numberOfWords: 50 })
  const essWeighting = await util.typeInReactInput('essential_weighting_0', { value: '10' })
  await clickSaveContinue()
  await util.matchText('li', 'Essential weightings must add up to 100%.')
  await util.typeInReactInput('essential_weighting_0', { value: '0' })
  const essentialCriteria = {
    criteria: essCriteria,
    weighting: essWeighting
  }

  const nthCriteria = await util.typeInReactInput('nice_to_have_criteria_0', { numberOfWords: 50 })
  const nthWeighting = await util.typeInReactInput('nice_to_have_weighting_0', { value: '100' })
  const niceToHaveCriteria = {
    criteria: nthCriteria,
    weighting: nthWeighting
  }
  await clickSaveContinue()

  return {
    essentialCriteria,
    niceToHaveCriteria
  }
}

const fillSellerResponses = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'You must define the security clearance requirements')

  const input = await util.getElementHandle(`//input[@id="numberOfSuppliers"]`)
  await input.press('Backspace')
  const numberOfSuppliers = await util.typeInReactInput('numberOfSuppliers', { value: '6' })

  await util.selectCheck('References')
  await util.selectCheck('Interviews')
  await util.selectCheck('Scenarios or tests')
  await util.selectCheck('Presentations')

  await util.selectRadio('hourlyRate')
  await util.typeInReactInput('maxRate', { value: '123' })
  await util.typeInReactInput('budgetRange', { numberOfCharacters: '100' })

  await util.selectRadio('mustHave')
  await clickSaveContinue()
  await util.matchText('li', 'You must select a type of security clearance.')
  await page.select(`#securityClearanceCurrent`, 'pv')
  await clickSaveContinue()
  return {
    numberOfSuppliers
  }
}

const fillTimeframes = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'Enter an estimated start date for the opportunity')
  await util.matchText('li', 'You must enter a valid start date')
  await util.matchText('li', 'Enter a contract length for the opportunity')
  const now = new Date()
  const future = new Date(now.setDate(now.getDate() + 14))
  await util.typeInReactInput('day', { value: `${format(future, 'DD')}` })
  await util.typeInReactInput('month', { value: `${format(future, 'MM')}` })
  await util.typeInReactInput('year', { value: `${format(future, 'YYYY')}` })
  await util.typeInReactInput('contractLength', { numberOfCharacters: 100 })
  await util.typeInReactInput('contractExtensions', { numberOfCharacters: 100 })
  await clickSaveContinue()
}

const fillAdditionalInformation = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'Contact number is required')
  await util.upload('file_0', 'document.pdf', 'Additional documents (optional)')
  await util.typeInReactInput('contactNumber', { value: '01234455667733' })
  await clickSaveContinue()
}

const publishBrief = async () => {
  await util.selectCheck('cb-declaration', 'id')
  await util.clickButton('Publish')
}

const create = async params => {
  console.log(`Starting to create ${params.areaOfExpertise} brief`)
  await createBrief()
  await fillAbout(params.title, params.locations)
  await fillWhoCanRespond(params.categoryId)
  const criteria = await fillSelectionCriteria()
  const responses = await fillSellerResponses()
  await fillTimeframes()
  await fillAdditionalInformation()
  await publishBrief()
  return {
    criteria,
    numberOfSuppliers: responses.numberOfSuppliers
  }
}

export default create
