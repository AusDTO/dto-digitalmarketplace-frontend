import { buyerLogin } from '../../flows/login/actions'
import create from '../../flows/brief/training'
import startBrief from '../../flows/dashboard/buyer'

describe.skip('should be able to create training brief', () => {
  it('should be able to create training brief', async () => {
    await buyerLogin()
    const now = Date.now()
    await startBrief()
    await create({
      title: `Digital Training ${now.valueOf()}`,
      locations: ['Australian Capital Territory', 'Tasmania'],
      evaluations: ['Interview', 'References', 'Case study', 'Presentation']
    })
  })
})
