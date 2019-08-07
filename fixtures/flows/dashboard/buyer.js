import * as util from '../../flows/utils'

const startBrief = async () => {
  await util.clickLink('Menu')
  await util.clickLink('Dashboard')
  await util.clickButton('Create new request')
}

export default startBrief
