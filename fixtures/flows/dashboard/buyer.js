import * as util from '../../flows/utils'

const startBrief = async () => {
  await util.clickLink('Menu')
  await util.clickLink('Dashboard')
  await util.clickLink('Create new request')
}

export default startBrief
