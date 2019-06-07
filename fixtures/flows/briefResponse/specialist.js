import * as util from '../../flows/utils'

const clickStartApplication = async specialistNumber => {
  if (specialistNumber === 0) {
    await util.clickInputButton('Start application')
  } else {
    await util.clickInputButton('Continue')
  }
}

const clickSubmitApplication = async () => {
  await util.clickInputButton('Submit specialist')
}

const respond = async params => {
  console.log('Starting to respond to specialist brief')
  await clickStartApplication(params.specialistNumber)
  await util.matchText('a', 'Given name(s) is required')
  await util.matchText('a', 'Surname is required')
  const givenNames = await util.typeInReactInput('specialistGivenNames', { numberOfCharacters: 100 })
  const surname = await util.typeInReactInput('specialistSurname', { numberOfCharacters: 100 })
  await clickStartApplication(params.specialistNumber)

  await clickSubmitApplication()
  await util.matchText('a', 'Enter a date for when you can start the project')
  await util.matchText('a', 'Hourly rate is required')
  await util.matchText('a', 'Upload a file for your résumé')
  await util.matchText('a', `What is ${givenNames} ${surname}'s citizenship status?`)
  await util.matchText('a', `${givenNames} ${surname}'s security clearance is required`)
  await util.matchText('a', `Has ${givenNames} ${surname} previously worked for the Digital Transformation Agency?`)
  await util.matchText('a', 'Upload a file for your résumé')

  await util.typeInReactInput('availability', { numberOfCharacters: 100 })
  await util.typeInReactInput('hourRateExcludingGST', { value: '500' })
  await util.upload('file_0', 'document.pdf')
  await util.selectRadio('visaStatus-AustralianCitizen', 'id')
  await util.selectRadio('securityClearance-Yes', 'id')
  await util.selectRadio('previouslyWorked-Yes', 'id')
  await util.typeInReactInput('essentialRequirement.0', { numberOfWords: 150 })
  await util.typeInReactInput('niceToHaveRequirement.0', { numberOfWords: 150 })

  await clickSubmitApplication()
  await util.matchText('strong', `You have submitted`)
}

export default respond
