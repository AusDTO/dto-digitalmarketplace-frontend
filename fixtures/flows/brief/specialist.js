import * as util from '../../flows/utils'

const clickSaveContinue = async () => {
  await util.clickInputButton('Save and continue')
}

const clickReturnToOverview = async () => {
  await util.clickLink('Return to overview')
}

const createBrief = async () => {
  //changed from specialist to specialist old 
  await util.clickLink('Specialist old')
  await util.clickInputButton('Create opportunity')
}

const fillRole = async role => {
  await util.type('input-title', { value: role })
  await clickSaveContinue()
}

const selectLocation = async locations => {
  await util.clickLink('Location')

  locations.forEach(async location => {
    await util.selectCheck(location)
  })

  await clickSaveContinue()
}

const fillDescriptionOfWork = async () => {
  await util.clickLink('Description of work')
  await util.clickLink('Add organisation')

  const fields = [
    { id: 'input-organisation', options: { numberOfCharacters: 100 } },
    { id: 'input-specialistWork', options: { numberOfWords: 100 } },
    { id: 'input-existingTeam', options: { numberOfWords: 100 } },
    { id: 'input-additionalRelevantInformation', options: { numberOfWords: 500 } },
    { id: 'input-workplaceAddress', options: { numberOfWords: 100 } },
    { id: 'input-workingArrangements', options: { numberOfWords: 500 } },
    { id: 'input-securityClearance', options: { numberOfWords: 50 } },
    { id: 'input-startDate', options: { numberOfCharacters: 100 } },
    { id: 'input-contractLength', options: { numberOfWords: 100 } },
    { id: 'input-additionalTerms', options: { numberOfWords: 500 } },
    { id: 'input-budgetRange', options: { numberOfWords: 100 } },
    { id: 'input-summary', options: { numberOfWords: 50 } }
  ]

  fields.forEach(async field => {
    await util.type(field.id, field.options)
    await clickSaveContinue()
  })

  await clickReturnToOverview()
}

const fillEvaluationProcess = async (areaOfExpertise, evaluations) => {
  await util.clickLink('Shortlist and evaluation process')
  await util.clickLink('Please choose an area of expertise')

  await util.selectRadio(areaOfExpertise)
  await clickSaveContinue()

  await util.type('input-numberOfSuppliers', { value: '3' })
  await clickSaveContinue()

  await util.type('input-technicalWeighting', { value: '25' })
  await util.type('input-culturalWeighting', { value: '25' })
  await util.type('input-priceWeighting', { value: '50' })
  await clickSaveContinue()

  await util.type('input-essentialRequirements-1', { numberOfCharacters: 300 })
  await util.type('input-niceToHaveRequirements-1', { numberOfCharacters: 300 })
  await clickSaveContinue()

  await util.type('input-culturalFitCriteria-1', { numberOfCharacters: 300 })
  await clickSaveContinue()

  evaluations.forEach(async evaluation => {
    await util.selectCheck(evaluation)
  })

  await clickSaveContinue()
  await clickReturnToOverview()
}

const fillHowLong = async () => {
  await util.clickLink('How long your brief will be open')
  await util.selectRadio('1 week')
  await clickSaveContinue()
}

const fillQuestionAnswer = async () => {
  await util.clickLink('Question and answer session details')
  await util.clickLink('Add details')
  await util.type('input-questionAndAnswerSessionDetails', { numberOfWords: 100 })
  await clickSaveContinue()
  await clickReturnToOverview()
}

const fillWhoCanRespond = async () => {
  await util.clickLink('Who can respond')
  await util.selectRadio('allSellers')
  await clickSaveContinue()
}

const publishBrief = async () => {
  await util.clickLink('Review and publish your requirements')
  await util.clickInputButton('Publish brief')
  await util.matchText('h4', 'Your opportunity has been published')
}

const create = async params => {
  console.log(`Starting to create ${params.areaOfExpertise} brief`)
  await createBrief()
  await fillRole(params.title)
  await selectLocation(params.locations)
  await fillDescriptionOfWork()
  await fillEvaluationProcess(params.areaOfExpertise, params.evaluations)
  await fillHowLong()
  await fillQuestionAnswer()
  await fillWhoCanRespond()
  await publishBrief()
}

export default create
