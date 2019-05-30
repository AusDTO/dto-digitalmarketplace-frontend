import { buyerLogin, sellerLogin } from '../../flows/login/actions'
import {
  checkAppliedForSpecialist,
  navigate,
  selectBrief,
  applyForSpecialist
} from '../../flows/opportunities/actions'
import respond from '../../flows/briefResponse/specialist'
import create from '../../flows/brief/specialist'
import startBrief from '../../flows/dashboard/buyer'

describe('create and respond to new specialist brief', () => {
  // in order to get the right brief we are going for the 'today's date'.
  const today = Date.now()
  const title = `Specialist ${today.valueOf()}`
  let brief = null

  it('should be able to create new Specialist', async () => {
    await buyerLogin()
    await startBrief()
    brief = await create({
      title,
      locations: ['Australian Capital Territory', 'Tasmania'],
      categoryId: process.env.SELLER_CATEGORY
    })
  })
  it('should be able to respond to new specialist brief', async () => {
    await sellerLogin()
    for (let i = 0; i < parseInt(brief.numberOfSuppliers, 10); i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await navigate()
      // eslint-disable-next-line no-await-in-loop
      await selectBrief(title)
      // eslint-disable-next-line no-await-in-loop
      await applyForSpecialist()
      // eslint-disable-next-line no-await-in-loop
      await respond({
        specialistNumber: i,
        criterias: brief.criterias
      })
      // eslint-disable-next-line no-await-in-loop
      await checkAppliedForSpecialist(title, i, brief.numberOfSuppliers)
    }
  })
})
