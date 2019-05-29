import { buyerLogin } from '../../flows/login/actions'
import create from '../../flows/brief/specialist'
import startBrief from '../../flows/dashboard/buyer'

describe.skip('should be able to create specialist brief', () => {
  const areaOfExpertises = [
    'Strategy and Policy',
    'User research and Design',
    'Agile delivery and Governance',
    'Software engineering and Development',
    'Support and Operations',
    'Content and Publishing',
    'Change and Transformation',
    'Training, Learning and Development',
    'Marketing, Communications and Engagement',
    'Cyber security',
    'Data science',
    'Emerging technologies'
  ]
  areaOfExpertises.forEach(areaOfExpertise => {
    it(`should create specialist brief of  ${areaOfExpertise}`, async () => {
      await buyerLogin()
      const now = Date.now()
      await startBrief()
      await create({
        title: `${areaOfExpertise} Role ${now.valueOf()}`,
        areaOfExpertise,
        locations: ['Australian Capital Territory', 'Tasmania'],
        evaluations: ['References', 'Interview', 'Scenario or test', 'Presentation']
      })
    })
  })
})
