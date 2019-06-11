import * as util from '../../flows/utils'

const clickSubmitApplication = async () => {
  await util.clickInputButton('Submit application')
}

const respond = async params => {
  console.log('Starting to respond to atm brief')
  await clickSubmitApplication()
  await util.matchText('a', 'Enter a date for when you can start the project')
  if (params.criteria) {
    for (let i = 0; i < params.criteria.length; i += 1) {
      console.log(params.criteria[i])
      // eslint-disable-next-line no-await-in-loop
      await util.matchText('a', params.criteria[i].criteria)
    }
  }
  await util.matchText('a', 'You must upload your written proposal')
  await util.matchText('a', 'You must add a phone number')
  await util.typeInReactInput('availability', { numberOfCharacters: 100 })
  if (params.criteria) {
    for (let i = 0; i < params.criteria.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await util.typeInReactInput(`criteria.${i}`, { numberOfWords: 500 })
    }
  }
  await util.upload('file_0', 'document.pdf')
  await util.typeInReactInput('respondToPhone', { value: '0123456789' })
  await clickSubmitApplication()
  await util.matchText('h4', 'Thanks, your response has been successfully submitted.')
}

export default respond
