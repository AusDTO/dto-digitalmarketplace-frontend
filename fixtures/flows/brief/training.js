import * as util from '../../flows/utils'

/* eslint-disable no-await-in-loop */

const clickSaveContinue = async () => {
  await util.clickInputButton('Save and continue')
}

const createBrief = async () => {
  await util.clickLink('Training')
  await util.clickInputButton('Create opportunity')
}

const fillTitle = async role => {
  await util.type('input-title', { value: role })
  await clickSaveContinue()
}

const fillOrganisation = async () => {
  await util.type('input-organisation', { numberOfCharacters: 100 })
  await clickSaveContinue()
}

const fillWhatTraining = async () => {
  await util.selectCheck('Digital foundations')
  await util.selectCheck('Agile delivery')
  await util.selectCheck('User research')
  await util.selectCheck('Content design')
  await util.selectCheck('Other')
  await clickSaveContinue()
}

const fillLds = async () => {
  await clickSaveContinue()
  await util.matchText('a', 'What the training needs to cover:')

  await util.selectRadio('ldsUnits')
  await clickSaveContinue()
  await util.matchText('a', 'Select unit(s)')

  await util.selectRadio('specify')
  await clickSaveContinue()
  await util.matchText('a', 'Describe what the training needs to cover')

  await util.selectRadio('ldsUnits')
  await util.selectCheck('Unit 1: The Australian Government’s digital service context')
  await util.selectCheck('Unit 2: Agile and working in a multidisciplinary team​')
  await util.selectCheck('Unit 3: Working in a digital delivery team - design and delivery phases​')
  await util.selectCheck('Unit 4: Frameworks for digital services')
  await clickSaveContinue()

  await util.selectRadio('specify')
  await util.type('input-ldsAgileDeliveryTrainingNeeds', { numberOfWords: 500 })
  await clickSaveContinue()

  for (let i = 0; i < 2; i += 1) {
    await util.selectRadio('sellerProposal')
    await clickSaveContinue()
  }
}

const fillTrainingDetail = async () => {
  await util.type('input-trainingDetailType', { numberOfCharacters: 100 })
  await util.type('input-trainingDetailCover', { numberOfWords: 500 })
  await clickSaveContinue()
}

const fillWhyTraining = async () => {
  await util.type('input-whyTraining', { numberOfWords: 500 })
  await clickSaveContinue()
}

const fillAudience = async () => {
  await util.type('input-audience', { numberOfWords: 200 })
  await clickSaveContinue()
}

const fillTrainingLength = async () => {
  await util.type('input-trainingLength', { numberOfCharacters: 100 })
  await clickSaveContinue()
}

const fillTrainingMethod = async () => {
  await util.selectRadio('ownPreference')
  await clickSaveContinue()
  await util.matchText('a', 'Define preference')
  await util.type('input-trainingApproachOwn', { numberOfWords: 100 })
  await clickSaveContinue()
}

const fillHowLong = async () => {
  await util.selectRadio('2 weeks')
  await clickSaveContinue()
}

const fillWhoCanRespond = async () => {
  await util.selectRadio('allSellers')
  await clickSaveContinue()
}

const fillContactNumber = async () => {
  await util.type('input-contactNumber', { numberOfCharacters: 100 })
  await clickSaveContinue()
}

const fillCommencementDate = async () => {
  await util.type('input-startDate', { numberOfCharacters: 100 })
  await util.type('input-timeframeConstraints', { numberOfWords: 200 })
  await clickSaveContinue()
}

const fillLocation = async locations => {
  await util.type('input-locationCityOrRegion', { numberOfCharacters: 100 })

  await clickSaveContinue()

  locations.forEach(async location => {
    await util.selectCheck(location)
  })

  await clickSaveContinue()
}

const fillBudgetRange = async () => {
  await util.type('input-budgetRange', { numberOfWords: 200 })
  await clickSaveContinue()
}

const fillPaymentApproach = async () => {
  await util.type('input-paymentApproachAdditionalInformation', { numberOfCharacters: 200 })
  await util.selectRadio('fixedPrice')
  await clickSaveContinue()
}

const fillSecurityClearance = async () => {
  await util.type('input-securityClearance', { numberOfCharacters: 100 })
  await clickSaveContinue()
}

const fillContractLength = async () => {
  await util.type('input-contractLength', { numberOfWords: 200 })
  await clickSaveContinue()
}

const fillIntellectualProperty = async () => {
  await util.selectRadio('commonwealth')
  await clickSaveContinue()
}

const fillAdditionalTerms = async () => {
  await util.type('input-additionalTerms', { numberOfWords: 200 })
  await clickSaveContinue()
}

const fillNumberOfSellers = async () => {
  await util.type('input-numberOfSuppliers', { value: '3' })
  await clickSaveContinue()
}

const fillEvaluationRating = async () => {
  await util.type('input-technicalWeighting', { value: '25' })
  await util.type('input-culturalWeighting', { value: '25' })
  await util.type('input-priceWeighting', { value: '50' })
  await clickSaveContinue()
}

const fillTechnicalCompetenceCriteria = async () => {
  await util.type('input-essentialRequirements-1', { numberOfWords: 10 })
  await util.type('input-niceToHaveRequirements-1', { numberOfWords: 10 })
  await clickSaveContinue()
}

const fillCulturalFitCriteria = async () => {
  await util.type('input-culturalFitCriteria-1', { numberOfWords: 10 })
  await clickSaveContinue()
}

const fillAssessmentMethods = async evaluations => {
  evaluations.forEach(async evaluation => {
    await util.selectCheck(evaluation)
  })

  await clickSaveContinue()
}

const fillSummary = async () => {
  await util.type('input-summary', { numberOfWords: 200 })
  await clickSaveContinue()
}

const fillQuestionAnswer = async () => {
  await util.type('input-questionAndAnswerSessionDetails', { numberOfWords: 200 })
  await clickSaveContinue()
}

const publishBrief = async () => {
  await util.clickLink('Review and publish your requirements')
  await util.clickInputButton('Publish brief')
  await util.matchText('h4', 'Your opportunity has been published')
}

const create = async params => {
  console.log('Starting to create training brief')
  await createBrief()
  await fillTitle(params.title)
  await fillOrganisation()
  await fillWhatTraining()
  await fillLds()
  await fillTrainingDetail()
  await fillWhyTraining()
  await fillAudience()
  await fillTrainingLength()
  await fillTrainingMethod()
  await fillHowLong()
  await fillWhoCanRespond()
  await fillContactNumber()
  await fillCommencementDate()
  await fillLocation(params.locations)
  await fillBudgetRange()
  await fillPaymentApproach()
  await fillSecurityClearance()
  await fillContractLength()
  await fillIntellectualProperty()
  await fillAdditionalTerms()
  await fillNumberOfSellers()
  await fillEvaluationRating()
  await fillTechnicalCompetenceCriteria()
  await fillCulturalFitCriteria()
  await fillAssessmentMethods(params.evaluations)
  await fillSummary()
  await fillQuestionAnswer()
  await publishBrief()
}

export default create
