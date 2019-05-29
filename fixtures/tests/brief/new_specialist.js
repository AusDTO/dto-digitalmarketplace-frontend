import { buyerLogin } from '../../flows/login/actions'
import create from '../../flows/brief/new_specialist'
import startBrief from '../../flows/dashboard/buyer'

describe.only('should be able to create new specialist flow brief', () => {
  it('should be able to create new specalist flow brief', async () => {
    const now = Date.now()
    await buyerLogin()
    await startBrief()
    await create({
      title: `new Specialist ${now.valueOf()}`,
      locations: ['Tasmania']
    })
  })
})
