import * as util from '../../flows/utils'

const clickSubmitResponse = async () => {
  await util.clickInputButton('Submit response')
}

const respond = async () => {
  console.log('Starting to respond to atm brief')

  await clickSubmitResponse()
  await util.matchText('a', 'Enter a date for when you can start the project')
  await util.matchText('a', 'Choose a file for your written proposal')
  await util.matchText('a', 'Choose a file for your project costs')
  await util.matchText('a', 'Choose a file for your trainer résumés')
  await util.matchText('a', 'A contact number is required')
  await util.typeInReactInput('availability', { numberOfCharacters: 100 })
  await util.upload('file_0', 'document.pdf')
  await util.sleep(2000)
  await util.upload('file_1', 'document.pdf')
  await util.sleep(2000)
  await util.upload('file_2', 'document.pdf')
  await util.sleep(2000)
  await util.typeInReactInput('respondToPhone', { value: '0123456789' })

  await clickSubmitResponse()
  await util.matchText('h4', 'Thanks, your response has been successfully submitted.')
}

export default respond
