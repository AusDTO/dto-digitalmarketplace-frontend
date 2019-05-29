import { buyerLogin, sellerLogin } from '../../flows/login/actions'
import { checkAppliedForNewSpecialist, navigate, selectBrief, applyForNewSpecialist } from '../../flows/opportunities/actions'
import respond from '../../flows/briefResponse/new_specialist'
import create from '../../flows/brief/new_specialist'
import startBrief from '../../flows/dashboard/buyer'
import { sleep } from '../../flows/utils'

describe.only('create and respond to new specialist brief', () => {
  // in order to get the right brief we are going for the 'today's date'.
  const today = Date.now()
  const title = `New Specialist ${today.valueOf()}`
  let brief = null

  it('should be able to create new Specialist', async () => {
    await buyerLogin()
    await startBrief()
    brief = await create({
      title,
      locations: ['Australian Capital Territory', 'Tasmania']
    })
  })
  it('should be able to respond to new specialist brief', async () => {
    await sellerLogin()
    await navigate()
    await selectBrief(title)
    await sleep(1000)
    await applyForNewSpecialist()
    await respond(brief)
    await checkAppliedForNewSpecialist(title)
  })
})
