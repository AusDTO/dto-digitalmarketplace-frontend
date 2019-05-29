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
  console.log('Starting to respond to atm brief')

  await clickStartApplication(params.specialistNumber)
  await util.matchText('a', 'A name is required')
  await util.typeInReactInput('specialistName', { numberOfCharacters: 100 })
  await clickStartApplication(params.specialistNumber)

  await clickSubmitApplication()
  await util.matchText('a', 'Enter a date for when you can start the project')
  await util.matchText('a', 'A day rate is required')
  await util.matchText('a', 'Choose a file for your résumés')

  await util.typeInReactInput('availability', { numberOfCharacters: 100 })
  await util.typeInReactInput('dayRate', { value: '1000' })
  await util.upload('file_0', 'document.pdf')
  await util.typeInReactInput('essentialRequirement.0', { numberOfWords: 150 })
  await util.typeInReactInput('niceToHaveRequirement.0', { numberOfWords: 150 })

  await clickSubmitApplication()
  await util.matchText('strong', `You have submitted`)
}

export default respond
