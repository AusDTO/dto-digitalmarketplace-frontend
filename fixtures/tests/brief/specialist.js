import { buyerLogin } from '../../flows/login/actions'
import create from '../../flows/brief/specialist'
import startBrief from '../../flows/dashboard/buyer'

describe('should be able to create specialist opportunity', () => {
  const categories = {
    '1': 'Strategy and Policy',
    '3': 'User research and Design',
    '4': 'Agile delivery and Governance',
    '6': 'Software engineering and Development',
    '10': 'Support and Operations',
    '7': 'Content and Publishing',
    '14': 'Change and Transformation',
    '15': 'Training, Learning and Development',
    '9': 'Marketing, Communications and Engagement',
    '8': 'Cyber security',
    '11': 'Data science',
    '13': 'Emerging technologies'
  }
  Object.keys(categories).forEach(id => {
    it(`should be able to create ${categories[id]} specalist opportunity`, async () => {
      const now = Date.now()
      await buyerLogin()
      await startBrief()
      await create({
        title: `${categories[id]} Specialist ${now.valueOf()}`,
        locations: ['Tasmania'],
        categoryId: id
      })
    })
  })
})
