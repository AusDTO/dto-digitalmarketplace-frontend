import format from 'date-fns/format'
import * as util from '../utils'

const clickSaveContinue = async () => {
  await util.clickButton('Save and continue')
}

const createBrief = async () => {
  await util.clickLink('/2/outcome-choice', true)
  await util.clickLink('/2/buyer-atm/create', true)
  await util.clickLink('Create and publish request')
  await util.clickButton('Start now')
}

const fillWhoCanRespond = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'You must select who can respond')
  await util.selectRadio('category')
  await clickSaveContinue()
  await util.matchText('li', 'You must select a panel category')
  await util.selectRadio('all')
  await clickSaveContinue()
}

const fillAbout = async (title, locations) => {
  await util.typeInReactInput('title', { value: title })
  await util.typeInReactInput('organisation', { numberOfCharacters: 100 })
  await util.typeInReactInput('summary', { numberOfWords: 150 })

  locations.forEach(async location => {
    await util.selectCheck(location)
  })

  await clickSaveContinue()
}

const fillResponseFormats = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'You must specify if you need sellers to supply any other information')
  await util.selectRadio('yes')
  await clickSaveContinue()
  await util.matchText('li', 'You must select at least one response format')
  await util.selectCheck('Case study')
  await util.selectCheck('References')
  await util.selectCheck('Résumés')
  await util.selectCheck('Presentation')
  await util.selectCheck('Prototype')
  await clickSaveContinue()
}

const fillObjectives = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'Enter the reason the work is being done')
  await util.matchText('li', 'Enter the key problem to be solved')
  await util.matchText('li', 'Enter the user needs for your opportunity')
  await util.matchText('li', 'Enter the work already done for your opportunity')

  await util.typeInReactInput('backgroundInformation', { numberOfWords: 500 })
  await util.typeInReactInput('outcome', { numberOfWords: 500 })
  await util.typeInReactInput('endUsers', { numberOfWords: 500 })
  await util.typeInReactInput('workAlreadyDone', { numberOfWords: 500 })
  await util.typeInReactInput('industryBriefing', { numberOfWords: 500 })
  await util.upload('file_0', 'document.pdf')
  await clickSaveContinue()
}

const fillTimeframes = async () => {
  await clickSaveContinue()
  await util.matchText('li', 'Enter an estimated start date for the brief')

  await util.typeInReactInput('start_date', { numberOfWords: 10 })
  await util.typeInReactInput('timeframeConstraints', { numberOfWords: 150 })
  await clickSaveContinue()
}

const fillResponseCriteria = async numberOfCriteria => {
  await clickSaveContinue()
  await util.matchText('li', 'You must not have any empty criteria.')
  await util.selectCheck('yes')
  const criteria = []
  for (let i = 0; i < numberOfCriteria; i += 1) {
    if (i > 0) {
      // eslint-disable-next-line no-await-in-loop
      await util.clickLink('Add another criteria')
    }
    // eslint-disable-next-line no-await-in-loop
    const criterion = await util.typeInReactInput(`criteria_${i}`, { numberOfWords: 50 })
    // eslint-disable-next-line no-await-in-loop
    const weighting = await util.typeInReactInput(`weighting_${i}`, { value: '50' })
    criteria.push({
      criterion,
      weighting
    })
  }
  await clickSaveContinue()
  return criteria
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
  await util.typeInReactInput('contactNumber', { value: '0123456789' })
  await clickSaveContinue()
}

const publishBrief = async () => {
  await util.selectCheck('cb-declaration', 'id')
  await util.clickButton('Publish')
  await util.matchText('h1', 'Your opportunity is now live.')
}

const create = async params => {
  console.log('Starting to create atm brief')
  await createBrief()
  await fillWhoCanRespond()
  await fillAbout(params.title, params.locations)
  await fillResponseFormats()
  await fillObjectives()
  await fillTimeframes()
  const criteria = await fillResponseCriteria(params.numberOfCriteria ? params.numberOfCriteria : 2)
  await fillClosingDate()
  await publishBrief()
  return {
    criteria
  }
}

export default create
