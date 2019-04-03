import { buyerLogin } from '../../flows/login/actions'
import create from '../../flows/brief/atm'
import startBrief from '../../flows/dashboard/buyer'

describe('should be able to ask the market brief', () => {
  it('should be able to ask the market brief', async () => {
    await buyerLogin()
    const now = Date.now()
    await startBrief()
    await create({
      title: `Ask the market ${now.valueOf()}`,
      locations: ['Australian Capital Territory', 'Tasmania']
    })
  })
})
