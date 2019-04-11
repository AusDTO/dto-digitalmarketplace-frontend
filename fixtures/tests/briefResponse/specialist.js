import { buyerLogin, sellerLogin } from '../../flows/login/actions'
import { applyForSpecialist, navigate, selectBrief, viewSpecialistApplication } from '../../flows/opportunities/actions'
import create from '../../flows/brief/specialist'
import startBrief from '../../flows/dashboard/buyer'
import respond from '../../flows/briefResponse/specialist'

/* eslint-disable no-await-in-loop */

describe('should be able to create and respond to specialist brief', () => {
  const now = Date.now()
  const areaOfExpertise = 'Strategy and Policy'
  const title = `${areaOfExpertise} Role ${now.valueOf()}`
  it(`should create specialist brief of ${areaOfExpertise}`, async () => {
    await buyerLogin()
    await startBrief()
    await create({
      title,
      areaOfExpertise,
      locations: ['Australian Capital Territory', 'Tasmania'],
      evaluations: ['References', 'Interview', 'Scenario or test', 'Presentation']
    })
  })
  it(`should be able to respond to ${areaOfExpertise} brief`, async () => {
    await sellerLogin()
    for (let i = 0; i < 3; i = +1) {
      await navigate()
      await selectBrief(title)
      await applyForSpecialist(i)
      await respond({
        specialistNumber: i
      })
    }
    await navigate()
    await selectBrief(title)
    await viewSpecialistApplication(title)
  })
})
