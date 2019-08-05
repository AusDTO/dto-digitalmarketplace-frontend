import format from 'date-fns/format'
import * as util from '../../flows/utils'

const clickSaveContinue = async () => {
  await util.clickButton('Save and continue')
}

const createBrief = async () => {
  await util.clickLink('/2/outcome-choice', true)
  await util.clickLink('/2/buyer-rfx/create', true)
  await util.clickLink('Create and publish request')
  await util.clickButton('Start now')
}

const selectDropBox = async () => {
  const sellerCategory = process.env.SELLER_CATEGORY
  await page.select(`#seller-search-category-select`, sellerCategory)

  const sellerName = process.env.SELLER_NAME
  await util.sleep(100)
  await util.typeInReactInput('seller-search', { value: sellerName })
  let searchResult = await util.getElementHandles(`//input[@id="seller-search"]/../../ul/li[1]/a`)
  let sr = searchResult[0]
  sr.click()

  await util.typeInReactInput('seller-search', { value: '%%%' })
  searchResult = await util.getElementHandles('//input[@id="seller-search"]/../../ul/li')
  const resultCount = searchResult.length
  for (let i = 1; i <= resultCount; i += 1) {
    if (i > 1) {
      // eslint-disable-next-line no-await-in-loop
      await util.sleep(100)
      // eslint-disable-next-line no-await-in-loop
      await util.typeInReactInput('seller-search', { value: '%%%' })
    }
    // eslint-disable-next-line no-await-in-loop
    searchResult = await util.getElementHandles(`//input[@id="seller-search"]/../../ul/li[${i}]/a`)
    sr = searchResult[0]
    sr.click()
  }
  await clickSaveContinue()
}

const fillWhoCanRespond = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'You must select at least one panel category')
  await selectDropBox()
}

const fillAbout = async (role, locations) => {
  await clickSaveContinue()
  await util.matchText('li', 'You must add a title')
  await util.matchText('li', 'You must add the name of your department, agency or organisation')
  await util.matchText('li', 'You must add a summary of work to be done')
  await util.matchText('li', 'You must add the working arrangements')
  await util.matchText('li', 'You must select a location of where the work can be done')
  await util.typeInReactInput('title', { value: role })
  await util.typeInReactInput('organisation', { numberOfCharacters: 100 })
  await util.typeInReactInput('summary', { numberOfWords: 150 })

  locations.forEach(async location => {
    await util.selectCheck(location)
  })

  await util.typeInReactInput('working_arrangements', { numberOfCharacters: 150 })
  await util.typeInReactInput('clearance', { numberOfCharacters: 100 })
  await clickSaveContinue()
}

const fillResponseFormats = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'You must choose what you would like sellers to provide through the Marketplace')
  await util.selectCheck('Written proposal')
  await clickSaveContinue()
  await util.matchText('li', 'You must select at least one proposal type.')
  await util.selectCheck('Breakdown of costs')
  await util.selectCheck('Case study')
  await util.selectCheck('References')
  await util.selectCheck('Résumés')
  await util.selectCheck('Response template')
  await util.selectCheck('Presentation')
  await clickSaveContinue()
}

const fillRequirements = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'You must upload a requirements document')
  await util.upload('file_0', 'document.pdf', 'Requirements document')
  await util.upload('file_0', 'document.pdf', 'Response template')
  await util.upload('file_0', 'document.pdf', 'Additional documents (optional)')
  await util.typeInReactInput('industryBriefing', { numberOfWords: 150 })
  await clickSaveContinue()
}
const fillTimeframesAndBudget = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'You must add an estimated start date')
  await util.matchText('li', 'You must add a contract length')
  await util.typeInReactInput('start_date', { numberOfCharacters: 150 })
  await util.typeInReactInput('contract_length-label', { numberOfCharacters: 50 })
  await util.typeInReactInput('contract_extensions', { numberOfCharacters: 50 })
  await util.typeInReactInput('budget_range', { numberOfWords: 150 })
  await clickSaveContinue()
}

const fillEvaluationCriteria = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'You must not have any empty criteria.')
  await util.matchText('li', 'Weightings must be greater than 0.')
  await util.matchText('li', 'You must not have any empty criteria.')
  await util.clickLink('Add another criteria')
  await util.typeInReactInput('criteria_0', { numberOfWords: 50 })
  await util.typeInReactInput('weighting_0', { value: '50' })
  await util.typeInReactInput('criteria_1', { numberOfWords: 50 })
  await util.typeInReactInput('weighting_1', { value: '50' })
  await clickSaveContinue()
}

const fillClosingDate = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'You must add a closing date at least 2 days from now')
  await util.matchText('li', 'You must add a contact number')
  const now = new Date()
  const future = new Date(now.setDate(now.getDate() + 14))
  await util.typeInReactInput('day', { value: `${format(future, 'DD')}` })
  await util.typeInReactInput('month', { value: `${format(future, 'MM')}` })
  await util.typeInReactInput('year', { value: `${format(future, 'YYYY')}` })
  await util.typeInReactInput('contact', { value: '0123456789' })
  await clickSaveContinue()
}

const fillPublishBrief = async () => {
  await util.selectCheck('cb-declaration', 'id')
  await util.clickButton('Publish')
  await util.matchText('h1', 'Your opportunity is now live, and the invited sellers have been notified.')
}

const create = async params => {
  console.log('Starting to create outcome RXF brief')
  await createBrief()
  await fillWhoCanRespond()
  await fillAbout(params.title, params.locations)
  await fillResponseFormats()
  await fillRequirements()
  await fillTimeframesAndBudget()
  await fillEvaluationCriteria()
  await fillClosingDate()
  await fillPublishBrief()
}

export default create
