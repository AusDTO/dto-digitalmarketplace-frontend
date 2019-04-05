import { buyerLogin, sellerLogin, signOut } from '../../flows/login/actions'
import * as util from '../../flows/utils'

describe('should fail sign in', () => {
  const testCases = [
    { args: ['a', ''], expected: ['a', 'You must provide a valid email address'] },
    { args: ['a@b.cm', ''], expected: ['a', 'You must provide your password'] },
    { args: ['a@b.cm', 'a'], expected: ['p', "Make sure you've entered the right email address and password."] }
  ]
  testCases.forEach(test => {
    it(`sign in fails ${test.args.length} args`, async () => {
      await buyerLogin(...test.args)
      await util.matchText(...test.expected)
    })
  })
})

describe('should sign in', () => {
  it('buyer should be able to login', async () => {
    await buyerLogin(process.env.BUYER_EMAIL, process.env.BUYER_PASSWORD)
    await util.matchText('h1', 'Dashboard')
    await signOut()
  })
  it('seller should be able to login', async () => {
    await sellerLogin(process.env.SELLER_EMAIL, process.env.SELLER_PASSWORD)
    await util.matchText('h1', 'Opportunities')
    await signOut()
  })
})
